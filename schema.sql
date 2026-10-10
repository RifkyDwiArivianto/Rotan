-- Jalankan di Supabase → SQL Editor
create table if not exists rooms (
  code text primary key,
  state jsonb not null,
  version int not null default 0,
  updated_at timestamptz not null default now()
);
-- token rahasia tiap pemain (tidak bisa dibaca client)
create table if not exists room_players (
  code text references rooms(code) on delete cascade,
  pid int, token text,
  primary key (code, pid)
);

alter table rooms enable row level security;
alter table room_players enable row level security;
-- client hanya boleh MEMBACA rooms. Semua tulis lewat fungsi RPC di bawah.
drop policy if exists "read rooms" on rooms;
create policy "read rooms" on rooms for select using (true);
-- room_players: tanpa policy = tidak bisa diakses langsung.

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'rooms'
  ) then
    alter publication supabase_realtime add table public.rooms;
  end if;
end $$;

create or replace function create_room(p_code text, p_state jsonb, p_token text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_code !~ '^[A-HJ-KMNP-Z2-9]{6}$' then raise exception 'Kode room tidak valid'; end if;
  if p_token is null or length(p_token) < 20 then raise exception 'Token tidak valid'; end if;
  if jsonb_typeof(p_state) is distinct from 'object'
    or jsonb_typeof(p_state->'players') is distinct from 'array'
    then raise exception 'State awal room tidak valid'; end if;
  if p_state->>'phase' is distinct from 'lobby'
    or p_state->>'host' is distinct from '0'
    or jsonb_array_length(p_state->'players') <> 1
    or p_state->'players'->0->>'id' is distinct from '0'
    then raise exception 'State awal room tidak valid'; end if;
  insert into rooms(code, state) values (upper(p_code), p_state);
  insert into room_players values (upper(p_code), 0, p_token);
end $$;

create or replace function join_room(p_code text, p_name text, p_token text)
returns int language plpgsql security definer set search_path = public as $$
declare r rooms; n int;
begin
  if p_token is null or length(p_token) < 20 then raise exception 'Token tidak valid'; end if;
  if p_name is null or length(btrim(p_name)) = 0 then raise exception 'Nama pemain wajib diisi'; end if;
  select * into r from rooms where code = upper(p_code) for update;
  if not found then raise exception 'Room tidak ditemukan'; end if;
  if r.state->>'phase' <> 'lobby' then raise exception 'Game sudah dimulai'; end if;
  n := jsonb_array_length(r.state->'players');
  if n >= 4 then raise exception 'Room penuh'; end if;
  update rooms set version = version + 1, updated_at = now(),
    state = jsonb_set(state, '{players}', (state->'players') ||
      jsonb_build_array(jsonb_build_object('id', n, 'name', left(p_name, 14), 'ready', false)))
  where code = r.code;
  insert into room_players values (r.code, n, p_token);
  return n;
end $$;

create or replace function get_player_id(p_code text, p_token text)
returns int language plpgsql security definer set search_path = public as $$
declare n int;
begin
  select pid into n from room_players
  where code = upper(p_code) and token = p_token;
  if not found then raise exception 'Token tidak valid'; end if;
  return n;
end $$;

create or replace function leave_room(p_code text, p_token text)
returns boolean language plpgsql security definer set search_path = public as $$
declare r rooms; remaining jsonb; actual_pid int;
begin
  select * into r from rooms where code = upper(p_code) for update;
  if not found then return false; end if;
  select pid into actual_pid from room_players where code = r.code and token = p_token;
  if not found then raise exception 'Token tidak valid'; end if;
  if r.state->>'phase' <> 'lobby' then return false; end if;

  select coalesce(jsonb_agg(jsonb_set(player, '{id}', to_jsonb((ord - 1)::int), true) order by ord), '[]'::jsonb)
  into remaining
  from jsonb_array_elements(r.state->'players') with ordinality as p(player, ord)
  where (player->>'id')::int <> actual_pid;
  delete from room_players where code = r.code and pid = actual_pid;
  if jsonb_array_length(remaining) = 0 then
    delete from rooms where code = r.code;
    return true;
  end if;

  update room_players set pid = pid + 10 where code = r.code;
  update room_players
  set pid = case when pid - 10 > actual_pid then pid - 11 else pid - 10 end
  where code = r.code;
  update rooms set state = jsonb_set(jsonb_set(r.state, '{players}', remaining), '{host}', '0'::jsonb),
    version = version + 1, updated_at = now()
  where code = r.code;
  return true;
end $$;

-- Validasi server: token valid, versi cocok (anti double-action), hanya pemain giliran
-- yang boleh menulis saat 'play', hanya host (pid 0) saat 'over'.
create or replace function push_state(p_code text, p_pid int, p_token text, p_ver int, p_state jsonb)
returns boolean language plpgsql security definer set search_path = public as $$
declare r rooms; i int; old_player jsonb; new_player jsonb; ready_changed boolean := false; timed_out boolean := false;
begin
  select * into r from rooms where code = upper(p_code) for update;
  if not found then raise exception 'Room tidak ditemukan'; end if;
  if not exists (select 1 from room_players where code = r.code and pid = p_pid and token = p_token)
    then raise exception 'Token tidak valid'; end if;
  if r.version <> p_ver then return false; end if;
  timed_out := r.state->>'phase' = 'play' and r.updated_at <= now() - interval '60 seconds';
  if jsonb_typeof(p_state) is distinct from 'object'
    or jsonb_typeof(p_state->'players') is distinct from 'array'
    then raise exception 'State room tidak valid'; end if;
  if jsonb_array_length(p_state->'players') <> jsonb_array_length(r.state->'players')
    or p_state->>'host' is distinct from r.state->>'host'
    then raise exception 'Daftar pemain atau host room tidak valid'; end if;
  if p_state->>'phase' is null or p_state->>'phase' not in ('lobby', 'play', 'over')
    then raise exception 'Fase room tidak valid'; end if;
  if r.state->>'phase' = 'lobby' and p_state->>'phase' not in ('lobby', 'play')
    or r.state->>'phase' = 'play' and p_state->>'phase' not in ('play', 'over')
    or r.state->>'phase' = 'over' and (p_state->>'phase' <> 'lobby' or p_pid <> 0)
    then raise exception 'Perubahan fase tidak diizinkan'; end if;
  for i in 0..jsonb_array_length(r.state->'players') - 1 loop
    old_player := r.state->'players'->i;
    new_player := p_state->'players'->i;
    if new_player->>'id' is distinct from old_player->>'id'
      or new_player->>'name' is distinct from old_player->>'name'
      then raise exception 'Identitas pemain tidak boleh diubah'; end if;
  end loop;
  if r.state->>'phase' = 'lobby' and p_state->>'phase' = 'lobby' then
    if p_state->'rounds' is distinct from r.state->'rounds' then
      if p_pid <> 0 or p_state->'rounds' is null
        or p_state->'rounds' not in ('0'::jsonb, '12'::jsonb, '18'::jsonb, '24'::jsonb)
        or p_state - 'rounds' - 'fxs' is distinct from r.state - 'rounds' - 'fxs'
        then raise exception 'Hanya host yang boleh mengubah batas ronde'; end if;
    else
      for i in 0..jsonb_array_length(r.state->'players') - 1 loop
        old_player := r.state->'players'->i;
        new_player := p_state->'players'->i;
        if i = p_pid then
          if jsonb_typeof(new_player->'ready') is distinct from 'boolean'
            or new_player->'ready' is not distinct from old_player->'ready'
            or (new_player - 'ready') is distinct from (old_player - 'ready')
            then raise exception 'Perubahan lobby tidak valid'; end if;
          ready_changed := true;
        elsif new_player is distinct from old_player then
          raise exception 'Pemain lain tidak boleh diubah'; 
        end if;
      end loop;
      if not ready_changed or p_state - 'players' - 'fxs' is distinct from r.state - 'players' - 'fxs'
        then raise exception 'Perubahan lobby tidak valid'; end if;
    end if;
  elsif r.state->>'phase' = 'lobby' and p_state->>'phase' = 'play' then
    if p_pid <> 0 or jsonb_array_length(r.state->'players') not between 2 and 4 or exists (
      select 1 from jsonb_array_elements(r.state->'players') as players(player)
      where coalesce(player->>'ready', 'false') <> 'true'
    ) then raise exception 'Host dan semua pemain harus siap untuk memulai'; end if;
  end if;
  if p_state->>'phase' = 'play' then
    if coalesce(p_state->>'turn' !~ '^[0-3]$', true)
      or coalesce(p_state->>'penguasa' !~ '^[0-3]$', true)
      or coalesce(p_state->>'round' !~ '^[0-9]{1,6}$', true)
      or coalesce(p_state->>'harga' !~ '^[0-9]$', true)
      then raise exception 'Nilai giliran atau state game tidak valid'; end if;
    if (p_state->>'turn')::int >= jsonb_array_length(p_state->'players')
      or (p_state->>'penguasa')::int >= jsonb_array_length(p_state->'players')
      or (p_state->>'round')::int < 1
      or (p_state->>'harga')::int not between 1 and 4
      then raise exception 'Nilai ronde atau harga tidak valid'; end if;
    for i in 0..jsonb_array_length(p_state->'players') - 1 loop
      new_player := p_state->'players'->i;
      if coalesce(new_player->>'coin' !~ '^[0-9]{1,6}$', true)
        or coalesce(new_player->>'sab' !~ '^[0-3]$', true)
        or coalesce(new_player->>'pos' !~ '^[0-9]{1,2}$', true)
        or coalesce(new_player->>'skip' !~ '^[0-9]{1,3}$', true)
        or new_player->>'job' is null
        or new_player->>'job' not in ('honorer', 'ojol', 'pkl', 'serabutan', 'tetap', 'titipan')
        or jsonb_typeof(new_player->'gone') is distinct from 'boolean'
        then raise exception 'Status pemain tidak valid'; end if;
      if (new_player->>'pos')::int > 27 then raise exception 'Posisi pemain tidak valid'; end if;
    end loop;
  end if;
  -- boleh menulis: pemain yang sedang giliran, Penguasa saat memilih kartu Kabar Negara (pend.by), atau pemilih yang belum memberi suara saat pemilu
  if r.state->>'phase' = 'play' and (r.state->>'turn')::int <> p_pid
    and coalesce((r.state->'pend'->>'by')::int, -1) <> p_pid
    and not (r.state->>'stage' = 'vote' and not coalesce((r.state->'votes') ? p_pid::text, false))
    and not timed_out
    then raise exception 'Bukan giliranmu'; end if;
  if r.state->>'phase' = 'over' and p_pid <> 0 then raise exception 'Hanya host'; end if;
  update rooms set state = p_state, version = version + 1, updated_at = now() where code = r.code;
  return true;
end $$;

revoke all on function create_room(text, jsonb, text) from public;
revoke all on function join_room(text, text, text) from public;
revoke all on function get_player_id(text, text) from public;
revoke all on function leave_room(text, text) from public;
revoke all on function push_state(text, int, text, int, jsonb) from public;
grant execute on function create_room(text, jsonb, text) to anon;
grant execute on function join_room(text, text, text) to anon;
grant execute on function get_player_id(text, text) to anon;
grant execute on function leave_room(text, text) to anon;
grant execute on function push_state(text, int, text, int, jsonb) to anon;
