(() => {
const C = CFG, E = Engine, T = E.T, side = E.side, J = E.J, act = E.act;
const R = n => Math.floor(Math.random() * n), q = s => document.querySelector(s);
const M = n => '🪙' + Math.round(n);
const COL = ['#ff4f8b', '#3fa7ff', '#8be04e', '#ffd23f'];
const ICON = {A: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M19 8h10l-1.5 12h-7z" fill="#f3e3c3"/><path d="M21 11.5h6M21.6 14.5h4.8" stroke="#8a7a60" stroke-width="1.6" stroke-linecap="round"/><rect x="9" y="19" width="30" height="21" rx="3" fill="#c8553d"/><rect x="9" y="19" width="30" height="6" rx="2" fill="#a8402c"/><rect x="17" y="21" width="14" height="2.4" rx="1.2" fill="#2a1a17"/><circle cx="24" cy="32" r="5" fill="#f3e3c3"/><path d="M24 29v3.4" stroke="#c8553d" stroke-width="2.2" stroke-linecap="round"/><circle cx="24" cy="35" r="1.2" fill="#c8553d"/></svg>', J: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="8" width="34" height="32" rx="3" fill="#6b7a8f"/><path d="M15 12v24M21.5 12v24M28 12v24M34.5 12v24" stroke="#2a1a17" stroke-width="3"/><rect x="5" y="37" width="38" height="5" rx="2" fill="#4a5568"/><circle cx="38" cy="30" r="4" fill="#e8b04a" stroke="#8a5a14" stroke-width="1.4"/></svg>', G: '<svg class="" viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="12" width="36" height="25" rx="3" fill="#f3e3c3"/><path d="M6 15l18 13 18-13" fill="none" stroke="#c8a56a" stroke-width="2.4"/><circle cx="35" cy="34" r="8.5" fill="#e8b04a" stroke="#8a5a14" stroke-width="2"/><path d="M35 29.5v9M32 31.5h5a1.8 1.8 0 010 3.4h-4a1.8 1.8 0 000 3.4h5" fill="none" stroke="#8a5a14" stroke-width="1.6" stroke-linecap="round"/></svg>', L: '<svg class="" viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="16" width="36" height="24" rx="3.5" fill="#a8603a"/><path d="M17 16v-3.5a3 3 0 013-3h8a3 3 0 013 3V16" fill="none" stroke="#6b3a20" stroke-width="3"/><rect x="6" y="25" width="36" height="3" fill="#7a4326"/><rect x="21" y="23" width="6" height="8" rx="1.5" fill="#e8b04a" stroke="#8a5a14" stroke-width="1.5"/></svg>', P: '<svg class="" viewBox="0 0 48 48" aria-hidden="true"><rect x="4" y="12" width="8" height="12" fill="#c8553d"/><rect x="12" y="12" width="8" height="12" fill="#f3e3c3"/><rect x="20" y="12" width="8" height="12" fill="#c8553d"/><rect x="28" y="12" width="8" height="12" fill="#f3e3c3"/><rect x="36" y="12" width="8" height="12" fill="#c8553d"/><circle cx="8" cy="24" r="4" fill="#c8553d"/><circle cx="16" cy="24" r="4" fill="#f3e3c3"/><circle cx="24" cy="24" r="4" fill="#c8553d"/><circle cx="32" cy="24" r="4" fill="#f3e3c3"/><circle cx="40" cy="24" r="4" fill="#c8553d"/><rect x="5" y="26" width="2.4" height="14" fill="#7a4326"/><rect x="40.6" y="26" width="2.4" height="14" fill="#7a4326"/><rect x="6" y="34" width="36" height="8" rx="1.5" fill="#7a4326"/><circle cx="14" cy="32" r="3.2" fill="#d9503a"/><circle cx="24" cy="32" r="3.2" fill="#e8b04a"/><circle cx="34" cy="32" r="3.2" fill="#7ccf7a"/></svg>', B: '<svg class="" viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="37" width="32" height="5" rx="1.5" fill="#7a4326"/><rect x="11" y="29" width="26" height="7" rx="2" fill="#c8553d"/><path d="M20 29v-9h8v9z" fill="#a8603a"/><circle cx="24" cy="14" r="8" fill="#c8553d"/><circle cx="21" cy="11" r="2.4" fill="#fff" opacity=".35"/></svg>', K: '<svg class="" viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="9" width="34" height="31" rx="2.5" fill="#f3e3c3"/><rect x="11" y="13" width="26" height="7" fill="#2a1a17"/><rect x="11" y="23" width="12" height="10" fill="#9aa3b8"/><path d="M26 24h11M26 28h11M26 32h8M11 37h26" stroke="#8a7a60" stroke-width="2" stroke-linecap="round"/></svg>', X: '<svg class="" viewBox="0 0 48 48" aria-hidden="true"><path d="M14 31a7.5 7.5 0 01.6-15A10 10 0 0134 17a7 7 0 01-1 14z" fill="#8f98ad"/><path d="M26 26l-8 12h5l-2 8 10-14h-5l3-6z" fill="#ffd23f" stroke="#a8741a" stroke-width="1.2" stroke-linejoin="round"/></svg>', R: '<svg class="" viewBox="0 0 48 48" aria-hidden="true"><circle cx="15" cy="15" r="5.5" fill="#f0c8a0"/><circle cx="33" cy="15" r="5.5" fill="#d9a678"/><path d="M7 40v-9a8 8 0 0116 0v9z" fill="#3fb7a8"/><path d="M25 40v-9a8 8 0 0116 0v9z" fill="#c8553d"/><path d="M24 36c-5-3.5-6-6.5-4-8 1.6-1.1 3 0 4 1.6 1-1.6 2.4-2.7 4-1.6 2 1.5 1 4.5-4 8z" fill="#ff5d7a"/></svg>', M: '<svg class="" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 6l11 29H13z" fill="#e8742a"/><path d="M20.4 16h7.2l1.9 5h-11z" fill="#f3e3c3"/><path d="M17 27h14l1.6 4H15.4z" fill="#f3e3c3"/><rect x="8" y="35" width="32" height="6" rx="2" fill="#2a1a17"/></svg>' };
const NAME = { A: 'Pengaduan', J: 'Penjara', G: 'Gajian', L: 'Lowongan', P: 'Pasar', B: 'Birokrasi', K: 'Kabar', X: 'Bencana', R: 'Gotong', M: 'Macet' };
// ================= NETWORK =================
// Logika sinkronisasi sama seperti sebelumnya. Perubahan hanya: hasil state diteruskan ke lapisan UI
// (UI.onState) supaya animasi bisa berjalan berurutan, plus mode ?demo untuk melihat tampilan tanpa server.
let sb, S = null, V = -1, me = null, room = null, busy = false, poll, channel, timeoutTimer, stateUpdatedAt = '', realtimeReady = false, onlineIssue = '', lastNetworkError = '';
const DEMO = /[?&]demo/.test(location.search);
function apply(r) {
  if (r.version < V) return;
  if (r.version === V) {
    if (r.updated_at && r.updated_at !== stateUpdatedAt) { stateUpdatedAt = r.updated_at; scheduleTimeout(stateUpdatedAt); }
    return;
  }
  const first = !S; S = r.state; V = r.version;
  if (r.updated_at) stateUpdatedAt = r.updated_at;
  scheduleTimeout(stateUpdatedAt);
  if (!DEMO && S.phase === 'lobby') {
    syncPlayerId().then(() => { if (V === r.version) onState(first); });
    return;
  }
  onState(first);
}
function syncPlayerId() {
  if (!sb || !room || !me) return Promise.resolve();
  const code = room, token = me.token;
  return sb.rpc('get_player_id', { p_code: code, p_token: token }).then(({ data, error }) => {
    if (error) throw error;
    if (room !== code || !me || me.token !== token || !Number.isInteger(data) || data === me.pid) return;
    me.pid = data;
    localStorage.setItem('sc', JSON.stringify({ code, pid: data, token }));
  }).catch(reportNetworkError);
}
function stopRoomListeners() {
  clearInterval(poll); clearTimeout(timeoutTimer);
  document.removeEventListener('visibilitychange', onVisibility);
  if (channel) sb.removeChannel(channel);
  channel = null; realtimeReady = false;
}
function scheduleTimeout(updatedAt) {
  clearTimeout(timeoutTimer);
  if (DEMO || !S || S.phase !== 'play' || !updatedAt) return;
  const due = Date.parse(updatedAt) + 60000;
  timeoutTimer = setTimeout(advanceTimedOut, Math.max(0, due - Date.now()) + 1000);
}
function timedAction(s, pid) {
  const p = s.players[pid], active = s.players.filter(x => !x.gone);
  if (s.stage === 'vote') {
    const target = active.find(x => x.id === s.penguasa && x.id !== pid) || active.find(x => x.id !== pid);
    return target ? { t: 'vote', for: target.id } : null;
  }
  if (s.pend && s.pend.t === 'kabar') {
    const weights = s.pend.c.map(id => C.cards.kabar.find(c => c.id === id).w);
    return { t: 'kabar', i: weights[1] > weights[0] ? 1 : 0 };
  }
  if (s.stage === 'roll') return { t: 'timeout' };
  if (s.pend.t === 'job') {
    const salaries = s.pend.c.map(id => J(id).sal), best = Math.max(...salaries);
    return { t: 'job', i: best > J(p.job).sal ? salaries.indexOf(best) : -1 };
  }
  if (s.pend.t === 'gr') return { t: 'gr', to: -1 };
  if (s.pend.t === 'lapor') return { t: 'lapor', go: 0 };
  if (s.pend.t === 'jail') return { t: 'jail', pay: 0 };
  if (s.pend.t === 'macet') return { t: 'macet', pay: p.coin >= 3 ? 1 : 0 };
  if (s.pend.t === 'biro') return { t: 'biro', pay: 0 };
  return null;
}
async function advanceTimedOut() {
  if (busy || animating || !S || S.phase !== 'play' || !me) { scheduleTimeout(stateUpdatedAt); return; }
  let pid;
  if (S.stage === 'vote') pid = S.players.find(p => !p.gone && S.votes[p.id] === undefined)?.id;
  else if (S.pend && S.pend.t === 'kabar') pid = S.pend.by;
  else pid = S.turn;
  const action = pid == null ? null : timedAction(S, pid);
  const next = action && act(JSON.parse(JSON.stringify(S)), action, pid);
  if (!next) { toast('Giliran otomatis gagal: state room tidak dapat diproses.'); return; }
  const version = V;
  toast('Aksi tidak diterima selama 60 detik; giliran diproses otomatis.');
  busy = true; render();
  try {
    const { data, error } = await sb.rpc('push_state', { p_code: room, p_pid: me.pid, p_token: me.token, p_ver: version, p_state: next });
    if (error) throw error;
    if (data) {
      if (V < version + 1) apply({ version: version + 1, state: next, updated_at: new Date().toISOString() });
      lastNetworkError = '';
    } else await load();
  } catch (e) {
    if (e.message === 'Bukan giliranmu') {
      try { await load(); } catch (reloadError) { reportNetworkError(reloadError); }
    } else reportNetworkError(e);
    if (V === version) timeoutTimer = setTimeout(advanceTimedOut, e.message === 'Bukan giliranmu' ? 5000 : 15000);
  } finally { busy = false; render(); }
}
async function load() {
  const { data, error } = await sb.from('rooms').select('*').eq('code', room).maybeSingle();
  if (error) throw error;
  lastNetworkError = '';
  if (data) apply(data);
  else {
    stopRoomListeners(); localStorage.removeItem('sc'); saved = false;
    S = null; V = -1; me = null; room = null; stateUpdatedAt = ''; render();
    toast('Room sudah tidak tersedia. Kembali ke halaman awal.');
  }
}
function reportNetworkError(e) {
  const message = e && e.message ? e.message : String(e);
  if (message === lastNetworkError) return;
  lastNetworkError = message; toast(`Koneksi room bermasalah: ${message}`);
}
function refreshRoom() { load().catch(reportNetworkError); }
function updatePolling() {
  clearInterval(poll);
  if (!realtimeReady && room) poll = setInterval(refreshRoom, 15000);
}
function enter(code, pid, token) {
  room = code; me = { pid, token }; localStorage.setItem('sc', JSON.stringify({ code, pid, token }));
  if (channel) sb.removeChannel(channel);
  realtimeReady = false;
  const currentChannel = sb.channel('r' + code);
  channel = currentChannel
    .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms', filter: 'code=eq.' + code }, p => p.new ? apply(p.new) : refreshRoom())
    .subscribe(status => {
      if (channel !== currentChannel) return;
      realtimeReady = status === 'SUBSCRIBED';
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') reportNetworkError(new Error(`Realtime ${status.toLowerCase()}; mencoba polling.`));
      updatePolling();
    });
  refreshRoom(); updatePolling();
  document.addEventListener('visibilitychange', onVisibility);
}
function onVisibility() {
  document.body.classList.toggle('is-hidden', document.hidden);
  if (!document.hidden && room) refreshRoom();
}
async function go(a) {
  if (busy || !S || animating) return;
  const n = act(JSON.parse(JSON.stringify(S)), a, me.pid); if (!n) return toast('Aksi tidak valid');
  if (DEMO) { apply({ version: V + 1, state: n }); return; }
  busy = true; render();
  if (a.t === 'roll') preRoll(); // dadu langsung berputar saat ditekan, tanpa menunggu respons server
  try {
    for (let k = 0; k < 3; k++) {
      const m = k ? act(JSON.parse(JSON.stringify(S)), a, me.pid) : n;
      if (!m) { if (k) toast('Giliran atau keputusan sudah berubah. Periksa state terbaru lalu coba lagi.'); break; }
      const version = V;
      const { data, error } = await sb.rpc('push_state', { p_code: room, p_pid: me.pid, p_token: me.token, p_ver: version, p_state: m });
      if (error) throw error;
      if (data) { if (V < version + 1) apply({ version: version + 1, state: m, updated_at: new Date().toISOString() }); lastNetworkError = ''; break; }
      await load();
      if (k === 2) toast('Aksi belum tersimpan karena room terus berubah. Coba lagi.');
    }
  } catch (e) { toast(e.message); }
  busy = false; render();
  if (!animating) undoPreRoll(); // aksi gagal / tidak ada animasi: kembalikan dadu
}
let preAt = 0;
function preRoll() {
  if (!el.dice || !el.ctl) return;
  preAt = performance.now();
  el.dice.querySelectorAll('.die').forEach((d, k) => { d.classList.remove('ghost', 'land'); d.classList.add('rolling'); d.style.animationDelay = (k * -.14) + 's'; });
  H(el.ctl, '<div class="hint busy">Mengocok dadu…</div>');
}
function undoPreRoll() {
  if (!el.dice || !el.ctl || (D && dv.rolling)) return;
  preAt = 0; el.dice.querySelectorAll('.die').forEach(d => { d.classList.remove('rolling'); d.style.animationDelay = ''; });
  updDice(); H(el.ctl, ctlHTML());
}
const nm = () => (q('#nm').value.trim() || 'Pemain').slice(0, 14);
window.G = {
  async create() {
    if (!sb) return toast(onlineIssue || 'Mode online belum siap. Periksa konfigurasi Supabase.');
    try {
      const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
      const code = Array.from({ length: 6 }, () => alphabet[R(alphabet.length)]).join(''), token = crypto.randomUUID();
      const st = { phase: 'lobby', host: 0, players: [{ id: 0, name: nm(), ready: false }], log: [], fxs: [] };
      const { error } = await sb.rpc('create_room', { p_code: code, p_state: st, p_token: token });
      if (error) throw error;
      enter(code, 0, token);
    } catch (e) { toast(`Gagal membuat room: ${e.message || e}`); }
  },
  async join() {
    if (!sb) return toast(onlineIssue || 'Mode online belum siap. Periksa konfigurasi Supabase.');
    const code = q('#cd').value.trim().toUpperCase();
    if (!code) return toast('Masukkan kode room dulu');
    try {
      const token = crypto.randomUUID();
      const { data, error } = await sb.rpc('join_room', { p_code: code, p_name: nm(), p_token: token });
      if (error) throw error;
      enter(code, data, token);
    } catch (e) { toast(`Gagal bergabung: ${e.message || e}`); }
  },
  go, async leave() {
    if (sb && room && me && !DEMO) {
      try {
        const { error } = await sb.rpc('leave_room', { p_code: room, p_token: me.token });
        if (error) throw error;
      } catch (e) {
        toast(`Gagal keluar dari room: ${e.message || e}`);
        return;
      }
    }
    stopRoomListeners();
    localStorage.removeItem('sc'); stateUpdatedAt = ''; location.href = location.pathname;
  },
  copy() { try { navigator.clipboard.writeText(room); toast('Kode room disalin'); } catch (e) { toast('Kode room: ' + room); } }
};

// ================= UI =================
// Prinsip: DOM papan dibuat sekali lalu dipatch (bukan dibangun ulang), sehingga transisi & animasi tidak terputus.
// Urutan saat dadu dilempar: dadu bergulir → pion melompat tile demi tile → baru bencana/kartu/uang muncul.
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const LOW_POWER = matchMedia('(max-width:700px), (pointer:coarse)').matches;
const STEP_MS = LOW_POWER ? 105 : 170;
const DICE_MS = LOW_POWER ? 480 : 900;
const DICE_FRAME_MS = LOW_POWER ? 120 : 75;
const SEQUENCE_PAUSE_MS = LOW_POWER ? 120 : 280;
const avs = b => `<svg class="ava" viewBox="0 0 48 48" aria-hidden="true">${b}</svg>`;
const avFace = () => `<path d="M16.4 27.4q2.4-1.5 4.8 0M26.8 27.4q2.4-1.5 4.8 0" stroke="#1b1210" stroke-width="1.5" fill="none" stroke-linecap="round"/><ellipse cx="18.8" cy="28.3" rx="1.25" ry=".85" fill="#1b1210"/><ellipse cx="29.2" cy="28.3" rx="1.25" ry=".85" fill="#1b1210"/><path d="M16.2 24.4l5.4.9M31.8 24.4l-5.4.9" stroke="#1b1210" stroke-width="1.4" stroke-linecap="round"/><path d="M17 30.2q1.8.9 3.6 0M27.4 30.2q1.8.9 3.6 0" stroke="#000" stroke-opacity=".22" stroke-width=".9" fill="none" stroke-linecap="round"/><path d="M24.4 28.6v4q-1.4 1-2.3.3" stroke="#000" stroke-opacity=".3" stroke-width="1" fill="none" stroke-linecap="round"/><path d="M20.6 35.6q3.4-.7 6.8 0" stroke="#2a1410" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M19.4 34.2q-.7 1.6-.3 3M28.6 34.2q.7 1.6.3 3" stroke="#000" stroke-opacity=".18" stroke-width=".8" fill="none" stroke-linecap="round"/>`;
const avShade = '<path d="M24 16c6 0 9.8 5 9.8 11.5 0 6.5-4 10.5-9.8 10.5 4-2 6-5.5 6-10.5S28 18 24 16z" fill="#000" opacity=".13"/>';
const AV = [
  // 1 petani bercaping: kulit terbakar matahari, baju lusuh
  avs('<path d="M4 48c1-9 8-12.5 20-12.5S43 39 44 48z" fill="#6f6250"/><path d="M14 44l5-2M30 43l6 2" stroke="#4d4336" stroke-width="1" stroke-linecap="round"/><path d="M16.5 37l7.5 7 7.500-7-2-1.500h-11z" fill="#7b3a2e"/><rect x="20.5" y="30" width="7" height="8" rx="3" fill="#9a6a44"/><ellipse cx="14.6" cy="28" rx="1.5" ry="2.6" fill="#a9754b"/><ellipse cx="33.4" cy="28" rx="1.5" ry="2.6" fill="#a9754b"/><ellipse cx="24" cy="27" rx="9.4" ry="11" fill="#b98457"/>' + avShade + avFace() + '<path d="M2 23.5L24 5l22 18.5q-22 5.5-44 0z" fill="#a98d4f" stroke="#5e4a22" stroke-width="1.3" stroke-linejoin="round"/><path d="M24 5L11 24.5M24 5l13 19.5M24 5v20M6 24q18 4.5 36 0" stroke="#6e5a2a" stroke-width=".8" fill="none"/><path d="M13.5 25.5l-1 9M34.5 25.5l1 9" stroke="#3a2a1a" stroke-width="1" stroke-linecap="round"/>'),
  // 2 pekerja bertopi hijau lusuh, jenggot tipis
  avs('<path d="M4 48c1-9 8-12.5 20-12.5S43 39 44 48z" fill="#b9b5a8"/><path d="M17 36.5q7 4.5 14 0" stroke="#8d897c" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="20.5" y="30" width="7" height="8" rx="3" fill="#8f6040"/><ellipse cx="14.8" cy="28.5" rx="1.5" ry="2.5" fill="#9a6a45"/><ellipse cx="33.2" cy="28.5" rx="1.5" ry="2.5" fill="#9a6a45"/><ellipse cx="24" cy="27.5" rx="9.3" ry="11" fill="#a8754c"/>' + avShade + '<path d="M15 31q1 8 9 9 8-1 9-9-2 3-9 3.2T15 31z" fill="#2a1d14" opacity=".4"/>' + avFace() + '<path d="M12.5 23.5a11.5 11 0 0123 0z" fill="#3b5233"/><path d="M12 24q12-3.5 24 0l3 2.2q-15-2.5-30 0z" fill="#26361f"/>'),
  // 3 perempuan berambut panjang, tegas dan lelah
  avs('<path d="M24 4.5c-11 0-16 8.5-16 19.5 0 8.5 2 16 4 22h8.5V31h7v15H36c2-6 4-13.5 4-22C40 13 35 4.5 24 4.5z" fill="#241a1f"/><path d="M5 48c1-8.5 8-12 19-12s18 3.5 19 12z" fill="#5b4a5c"/><path d="M17.5 37l6.5 4.5 6.5-4.5" fill="#3d3140"/><rect x="21" y="31" width="6" height="7" rx="3" fill="#c79770"/><ellipse cx="24" cy="26.5" rx="9" ry="11" fill="#d8ab86"/>' + avShade + '<path d="M15 22.5c3-1.2 6.5-4.5 9-7 3 3 7 5.8 9.5 7-1-6-4.5-9.5-9.5-9.5S15.5 16.5 15 22.5z" fill="#241a1f"/>' + avFace()),
  // 4 pengendara bertopi biru tua, hoodie
  avs('<path d="M3 48c1-9.5 8.5-12.5 21-12.5S44 38.5 45 48z" fill="#3b4048"/><path d="M15.5 37q8.5 7 17 0" stroke="#262a30" stroke-width="2.8" fill="none" stroke-linecap="round"/><path d="M22 41v5M26 41v5" stroke="#9aa0a8" stroke-width="1" stroke-linecap="round"/><rect x="20.5" y="30" width="7" height="8" rx="3" fill="#5c3a26"/><ellipse cx="14.8" cy="28.5" rx="1.5" ry="2.5" fill="#6a412b"/><ellipse cx="33.2" cy="28.5" rx="1.5" ry="2.5" fill="#6a412b"/><ellipse cx="24" cy="27.5" rx="9.3" ry="11" fill="#6f4630"/>' + avShade + avFace() + '<path d="M12.5 23.5a11.5 11 0 0123 0z" fill="#26364f"/><path d="M24 24q11-1 17 2.5-10 .5-17-.8z" fill="#1a2639"/><path d="M12.5 24h23" stroke="#1a2639" stroke-width="1.5"/>')
];
const DCOL = ['#2dd4bf', '#c084fc', '#a3d65c', '#fb7a4a'];
const SPC = { A: '#f472b6', J: '#8d98b0', G: '#ffcf5a', L: '#2dd4bf', P: '#f5b94a', B: '#9fb2d8', K: '#c084fc', X: '#ff6a3d', R: '#7ee0a1', M: '#8d8aa8' };
const LBL = { SAFE: 'Aman', RISK: 'Rawan', BANKRUPT: 'Merantau' };
const EI = {'🌊': '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 20q5-6 10 0t10 0 10 0 10 0v8q-5 6-10 0t-10 0-10 0-10 0z" fill="#3fa7ff"/><path d="M4 32q5-6 10 0t10 0 10 0 10 0v7H4z" fill="#2a78c8"/></svg>', '🌍': '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="4" y="26" width="40" height="14" rx="2" fill="#8a6a4a"/><path d="M22 26l-3 5 6 3-4 6" fill="none" stroke="#2a1a17" stroke-width="2.6" stroke-linejoin="round"/><path d="M10 20l4-6 4 6M30 20l4-9 4 9" fill="none" stroke="#c8b08a" stroke-width="2.2"/></svg>', '🔥': '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 5c2 8 11 11 11 22a11 11 0 01-22 0c0-5 3-8 5-11 0 4 2 5 4 5-1-6 0-12 2-16z" fill="#ff7a2a"/><path d="M24 23c1 4 5 5 5 10a5 5 0 01-10 0c0-3 3-5 5-10z" fill="#ffd23f"/></svg>', '⛰': '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M3 40L19 12l8 14 5-8 13 22z" fill="#7a6a5a"/><path d="M19 12l-5 9 5-2 3 4z" fill="#f3e3c3"/><circle cx="34" cy="38" r="2.5" fill="#4a3a30"/><circle cx="28" cy="40" r="2" fill="#4a3a30"/></svg>', '🌋': '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M5 42L18 20h12l13 22z" fill="#6b4a3a"/><path d="M18 20l2-4h8l2 4z" fill="#ff5a1a"/><circle cx="20" cy="9" r="3" fill="#ff7a2a"/><circle cx="28" cy="6" r="2.4" fill="#ffd23f"/><path d="M22 20l-2 8 5-3 3 6" fill="none" stroke="#ff7a2a" stroke-width="2"/></svg>', '🌪': '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 10h36l-6 6H12zM12 19h24l-5 6H17zM17 28h14l-4 6h-6zM21 37h6l-2 5h-2z" fill="#9aa3b8"/></svg>', '☀': '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="9" fill="#ffd23f"/><path d="M24 4v7M24 37v7M4 24h7M37 24h7M10 10l5 5M33 33l5 5M38 10l-5 5M15 33l-5 5" stroke="#e8a02a" stroke-width="3" stroke-linecap="round"/></svg>', '🌫': '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 16h26M14 24h28M8 32h22M16 40h24" stroke="#b8aec9" stroke-width="4" stroke-linecap="round"/></svg>', '🗳': '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="22" width="32" height="18" rx="2" fill="#a8603a"/><rect x="16" y="20" width="16" height="4" fill="#2a1a17"/><path d="M14 5h20v15H14z" fill="#f3e3c3"/><path d="M19 12l3 3 7-7" fill="none" stroke="#3fb7a8" stroke-width="2.6" stroke-linecap="round"/></svg>', '😮‍💨': '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 10h36v22H24l-8 8v-8H6z" fill="#f3e3c3"/><path d="M13 18h22M13 24h14" stroke="#8a7a60" stroke-width="2.4" stroke-linecap="round"/></svg>', '🧳': '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="16" width="34" height="24" rx="3" fill="#6b7a8f"/><path d="M18 16v-4h12v4" fill="none" stroke="#2a1a17" stroke-width="3"/><rect x="7" y="26" width="34" height="3" fill="#4a5568"/><rect x="21" y="24" width="6" height="7" rx="1" fill="#e8b04a"/></svg>', '📰': ICON.K };
const eico = e => EI[String(e).replace(/\ufe0f/g, '')] || esc(e);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sleep = ms => new Promise(r => setTimeout(r, RM ? Math.min(ms, 30) : ms));
const H = (e, h) => { if (e && e._h !== h) { e.innerHTML = h; e._h = h; } };
const retrig = (e, cls, ms) => { if (!e || RM) return; e.classList.remove(cls); void e.offsetWidth; e.classList.add(cls); setTimeout(() => e.classList.remove(cls), ms); };
const xy = i => i < 8 ? [7 - i, 7] : i < 15 ? [0, 14 - i] : i < 22 ? [i - 14, 0] : [7, i - 21];
const btn = (t, a, o = {}) => `<button class="btn${o.alt ? ' alt' : ''}${o.sm ? ' sm' : ''}${o.big ? ' big' : ''}" ${o.off ? 'disabled' : ''} onclick='G.go(${JSON.stringify(a)})'>${t}</button>`;
const initial = n => [...String(n)][0] || '?';
const title = t => t.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());

let screen = '', D = null, vis = [], animating = false, animRid = 0, dv = { vals: null, rolling: false };
let tiles = [], pawns = [], tileCenters = [], pawnSize = 22, currentTile = -1, cards = [], el = {}, ro = null, alertShow = null, lastAl = 0, seenF = new Set(), logLast = null, logSig = '', saved = false, shownCash = {}, skyEl = null, tipEl = null;
const app = q('#app');

// ---------- toast ----------
let toastT;
function toast(m) { const t = q('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2400); }

// ---------- bangunan (SVG) — warna atap = warna pemilik ----------
function bld(l, free) {
  const g = '<ellipse class="bg" cx="24" cy="38" rx="20" ry="5"/>', w = (x, y, k) => `<rect class="bl ${k || 'a'}" x="${x}" y="${y}" width="4.6" height="5" rx=".8"/>`;
  if (free) return '<svg viewBox="0 0 48 44"><ellipse class="dash" cx="24" cy="33" rx="19" ry="7"/><path class="plus" d="M24 20v13M17.5 26.5h13"/></svg>';
  if (l === 0) return `<svg viewBox="0 0 48 44">${g}<ellipse class="bt" cx="24" cy="35" rx="18" ry="5.5"/><rect class="bk" x="8.5" y="29" width="2" height="8" rx=".6"/><rect class="bk" x="37.5" y="29" width="2" height="8" rx=".6"/><rect class="bk" x="23" y="11" width="1.8" height="25" rx=".6"/><path class="br" d="M24.8 11l12.5 5-12.5 5z"/></svg>`;
  if (l === 1) return `<svg viewBox="0 0 48 44">${g}<rect class="bw" x="12" y="22" width="24" height="16" rx="1.5"/><path class="br" d="M8 24.5L24 8l16 16.5z"/><rect class="bd" x="21" y="29" width="6" height="9" rx="1"/>${w(14.5, 26)}${w(28.9, 26, 'b')}</svg>`;
  if (l === 2) return `<svg viewBox="0 0 48 44">${g}<rect class="bw" x="9" y="19" width="30" height="19" rx="1.5"/><rect class="bs" x="9" y="28" width="30" height="1.2"/><rect class="bc" x="31" y="6" width="4.5" height="10" rx=".6"/><path class="br" d="M5 21.5L24 4l19 17.5z"/><rect class="bd" x="21.5" y="30" width="5" height="8" rx="1"/>${w(13, 22)}${w(30.4, 22, 'b')}${w(12, 31, 'b')}${w(31.4, 31)}</svg>`;
  return `<svg viewBox="0 0 48 44">${g}<rect class="bw" x="3" y="25" width="42" height="13" rx="1.5"/><rect class="bw" x="15" y="12" width="18" height="26" rx="1.5"/><path class="br" d="M12.5 14L24 3l11.5 11z"/><path class="br" d="M1.5 26L10 17.5 18.5 26z"/><path class="br" d="M29.5 26L38 17.5l8.5 8.5z"/><rect class="bk" x="23.5" y="-1" width="1" height="5"/><path class="bgold" d="M24.5 -.5l5 1.6-5 1.6z"/><path class="bd" d="M20.8 38v-6.5a3.2 3.2 0 016.4 0V38z"/>${w(17.5, 15)}${w(25.9, 15, 'b')}${w(17.5, 22, 'b')}${w(25.9, 22)}${w(6.5, 28, 'b')}${w(36.9, 28)}</svg>`;
}

// ---------- langit kota ----------
function skyline(w, h, minH, maxH, wMin, wMax, fill, lit) {
  let x = -10, out = '';
  while (x < w) {
    const bw = wMin + R(wMax - wMin), bh = minH + R(maxH - minH), y = h - bh, k = R(5);
    out += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" fill="${fill}"/>`;
    if (k === 0) out += `<rect x="${x + bw / 2 - 1}" y="${y - 22}" width="2" height="22" fill="${fill}"/>`;
    else if (k === 1) out += `<rect x="${x + 6}" y="${y - 8}" width="${bw - 12}" height="8" fill="${fill}"/>`;
    if (lit) for (let wy = y + 10; wy < h - 8; wy += 14) for (let wx = x + 8; wx < x + bw - 10; wx += 12) if (Math.random() < lit) out += `<rect class="w${Math.random() < .12 ? ' b' : ''}" x="${wx}" y="${wy}" width="4" height="6" rx=".5" style="animation-delay:-${(Math.random() * 6).toFixed(1)}s"/>`;
    x += bw + R(6);
  }
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${out}</svg>`;
}
function buildSky() {
  let st = ''; for (let i = 0; i < 64; i++) st += `<i style="left:${R(100)}%;top:${R(58)}%;--z:${(.8 + Math.random() * 1.6).toFixed(1)}px;--d:${(2 + Math.random() * 4).toFixed(1)}s;--l:-${(Math.random() * 6).toFixed(1)}s"></i>`;
  skyEl = document.createElement('div'); skyEl.className = 'sky'; skyEl.setAttribute('aria-hidden', 'true');
  skyEl.innerHTML = `<div class="sl dusk"></div><div class="sl ember"></div><div class="stars">${st}</div><div class="sun"></div><div class="cloud c1"></div><div class="cloud c2"></div><div class="cloud c3"></div><div class="sl dz"></div>
    <div class="sk far">${skyline(1600, 300, 90, 210, 50, 110, '#4a3030', 0)}</div><div class="sk near">${skyline(800, 300, 150, 270, 54, 96, '#1e1412', .34)}${skyline(800, 300, 30, 100, 38, 64, '#2a1c16', .03)}</div>`;
  document.body.prepend(skyEl);
  const f = document.createElement('div'); f.id = 'flash'; document.body.appendChild(f);
  tipEl = document.createElement('div'); tipEl.className = 'tip'; document.body.appendChild(tipEl);
  if (!RM && !LOW_POWER) { // parallax kota tak berguna di layar sentuh, dan tiap pointermove memicu recalc style seluruh langit
    let mx = 0, frame = 0;
    addEventListener('pointermove', e => {
      mx = (e.clientX / innerWidth * 2 - 1).toFixed(3);
      if (!frame) frame = requestAnimationFrame(() => { skyEl.style.setProperty('--mx', mx); frame = 0; });
    }, { passive: true });
  }
}

// ---------- efek partikel ----------
const FX = (() => {
  const cv = document.createElement('canvas'); cv.id = 'fx'; document.body.appendChild(cv);
  const g = cv.getContext('2d'); let W = 0, Ht = 0, parts = [], run = false, last = 0;
  const size = () => { const d = Math.min(LOW_POWER ? 1 : 2, devicePixelRatio || 1); W = innerWidth; Ht = innerHeight; cv.width = W * d; cv.height = Ht * d; g.setTransform(d, 0, 0, d, 0, 0); };
  size(); addEventListener('resize', size);
  const rnd = (a, b) => a + Math.random() * (b - a), pick = a => a[R(a.length)];
  function add(p) {
    if (RM || parts.length > (LOW_POWER ? 100 : 650)) return;
    parts.push(Object.assign({ x: 0, y: 0, vx: 0, vy: 0, g: 0, d: 1, life: 1, age: 0, s: 4, r: 0, vr: 0, c: '#fff', k: 'dot', grow: 0 }, p));
    if (!run) { run = true; last = performance.now(); requestAnimationFrame(loop); }
  }
  function loop(t) {
    const dt = Math.min(.05, (t - last) / 1000); last = t; g.clearRect(0, 0, W, Ht);
    parts = parts.filter(p => {
      p.age += dt; if (p.age >= p.life) return false;
      const f = Math.pow(p.d, dt * 60); p.vx *= f; p.vy = p.vy * f + p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt; p.s += p.grow * dt;
      const a = 1 - p.age / p.life; g.globalAlpha = p.k === 'smoke' ? a * .55 : Math.min(1, a * 1.8); g.fillStyle = p.c; g.strokeStyle = p.c;
      if (p.k === 'rect') { g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.fillRect(-p.s / 2, -p.s * .3, p.s, p.s * .6); g.restore(); }
      else if (p.k === 'coin') { g.save(); g.translate(p.x, p.y); g.scale(Math.abs(Math.cos(p.r)) * .9 + .1, 1); g.beginPath(); g.arc(0, 0, p.s, 0, 7); g.fill(); g.fillStyle = '#b8791a'; g.beginPath(); g.arc(0, 0, p.s * .55, 0, 7); g.fill(); g.restore(); }
      else if (p.k === 'streak') { g.lineWidth = p.s; g.lineCap = 'round'; g.beginPath(); g.moveTo(p.x, p.y); g.lineTo(p.x - p.vx * .035, p.y - p.vy * .035); g.stroke(); }
      else { g.beginPath(); g.arc(p.x, p.y, Math.max(.1, p.s), 0, 7); g.fill(); }
      return true;
    });
    g.globalAlpha = 1; if (parts.length) requestAnimationFrame(loop); else run = false;
  }
  const ids = new Set();
  const stream = (fn, ms, every = 45) => {
    if (RM) return;
    const interval = LOW_POWER ? Math.max(every * 3, 180) : every;
    const duration = LOW_POWER ? Math.min(ms, 1800) : ms;
    const id = setInterval(fn, interval); ids.add(id);
    setTimeout(() => { clearInterval(id); ids.delete(id); }, duration);
  };
  return {
    stop() { ids.forEach(clearInterval); ids.clear(); },
    add, rnd, stream, W: () => W, H: () => Ht,
    burst(x, y, o = {}) { const cols = o.c || ['#ffe29a', '#ffcf5a', '#fff'], n = LOW_POWER ? Math.min(o.n || 14, 8) : (o.n || 14); for (let i = 0; i < n; i++) { const a = Math.random() * 6.283, v = rnd(60, o.v || 230); add({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 40, g: o.g == null ? 280 : o.g, d: .95, life: rnd(.5, 1), s: rnd(2, 4.5), c: pick(cols), k: o.k || 'dot' }); } },
    coins(x, y, n = 10) { for (let i = 0; i < (LOW_POWER ? Math.min(n, 4) : n); i++) add({ k: 'coin', x, y, vx: rnd(-130, 130), vy: rnd(-420, -170), g: 950, life: rnd(.9, 1.4), s: rnd(5, 7.5), r: rnd(0, 6), vr: rnd(8, 16), c: '#ffd34d' }); },
    puff(x, y, c = '#8a7a9a', n = 6) { for (let i = 0; i < (LOW_POWER ? Math.min(n, 3) : n); i++) add({ k: 'smoke', x: x + rnd(-10, 10), y: y + rnd(-6, 6), vx: rnd(-30, 30), vy: rnd(-70, -20), life: rnd(.8, 1.4), s: rnd(8, 14), grow: 22, c }); },
    confetti(ms = 3600, n = 4) { const cols = ['#ff4f8b', '#3fa7ff', '#8be04e', '#ffd23f', '#c084fc', '#fff']; stream(() => { for (let i = 0; i < n; i++) add({ k: 'rect', x: rnd(0, W), y: -12, vx: rnd(-70, 70), vy: rnd(120, 260), g: 80, d: .995, life: rnd(2.6, 4.2), s: rnd(7, 12), r: rnd(0, 6), vr: rnd(-9, 9), c: pick(cols) }); }, ms, 60); },
    rain(kind, ms) {
      const sp = { coin: () => add({ k: 'coin', x: rnd(0, W), y: -12, vx: rnd(-30, 30), vy: rnd(200, 360), g: 160, life: 3.2, s: rnd(6, 9), r: rnd(0, 6), vr: rnd(7, 14), c: '#ffd34d' }),
        drop: () => { for (let i = 0; i < 3; i++) add({ k: 'streak', x: rnd(0, W + 200), y: -20, vx: -240, vy: rnd(800, 1100), life: rnd(.9, 1.2), s: 1.8, c: '#9bd6ff' }); },
        ember: () => add({ x: rnd(0, W), y: Ht + 8, vx: rnd(-50, 50), vy: rnd(-300, -120), g: -30, d: .99, life: rnd(1.4, 2.6), s: rnd(1.8, 4), c: pick(['#ff7a2a', '#ffb347', '#ffe08a', '#ff4d2a']) }),
        smoke: () => add({ k: 'smoke', x: rnd(0, W), y: Ht + 10, vx: rnd(-20, 20), vy: rnd(-110, -50), life: rnd(1.6, 2.6), s: rnd(18, 34), grow: 32, c: '#54486a' }),
        dust: () => add({ k: 'smoke', x: rnd(0, W), y: Ht + 10, vx: rnd(-20, 20), vy: rnd(-90, -40), life: rnd(1.5, 2.4), s: rnd(16, 30), grow: 30, c: '#b79a7a' }),
        ash: () => add({ x: rnd(0, W), y: -10, vx: rnd(-20, 20), vy: rnd(60, 130), life: rnd(2.5, 3.5), s: rnd(1.6, 3), c: '#b8aec9' }),
        debris: () => add({ k: 'rect', x: rnd(0, W), y: -12, vx: rnd(-40, 40), vy: rnd(150, 300), g: 500, life: rnd(1.2, 2), s: rnd(5, 12), r: rnd(0, 6), vr: rnd(-8, 8), c: pick(['#6b5646', '#8a7358', '#4a3a30', '#a58a6a']) }),
        rock: () => { for (let i = 0; i < 2; i++) add({ x: rnd(-20, W * .7), y: -20, vx: rnd(120, 280), vy: rnd(100, 260), g: 900, life: rnd(1.4, 2.2), s: rnd(6, 15), c: pick(['#5a4636', '#7a6048', '#3e3026', '#8f7458']) }); },
        wind: () => { for (let i = 0; i < 3; i++) add({ k: 'streak', x: W + 20, y: rnd(0, Ht), vx: rnd(-1700, -1100), vy: rnd(-40, 40), life: rnd(.6, .9), s: rnd(1, 2.4), c: '#e6eeff' }); },
        leaf: () => add({ k: 'rect', x: W + 20, y: rnd(0, Ht), vx: rnd(-950, -600), vy: rnd(-120, 120), g: 40, life: rnd(1.2, 1.9), s: rnd(6, 13), r: rnd(0, 6), vr: rnd(-18, 18), c: pick(['#6f9a3c', '#8a6a3a', '#9aa4b0', '#c9b36a']) }),
        ashfall: () => { for (let i = 0; i < 2; i++) add({ x: rnd(0, W), y: -10, vx: rnd(-30, 20), vy: rnd(90, 190), life: rnd(2.2, 3.4), s: rnd(1.6, 4), c: pick(['#4a4448', '#8c8186', '#cfc6c0']) }); },
        heat: () => add({ x: rnd(0, W), y: rnd(Ht * .45, Ht), vx: rnd(20, 70), vy: rnd(-40, -8), life: rnd(2, 3), s: rnd(1, 2.6), c: '#ffe9a8' }),
        haze: () => add({ k: 'smoke', x: rnd(0, W), y: rnd(Ht * .3, Ht), vx: rnd(10, 40), vy: rnd(-25, -5), life: rnd(2.4, 3.6), s: rnd(26, 50), grow: 26, c: 'rgba(150,132,106,.4)' }) }[kind];
      stream(sp, ms, { drop: 28, rock: 90, wind: 40, debris: 70, leaf: 80, heat: 90, haze: 130 }[kind] || 55);
    }
  };
})();

const board = () => q('#board');
const centerOf = e => { const r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
function flash(c) { const f = q('#flash'); if (!f || RM) return; f.style.setProperty('--fc', c); f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); }
function shake(cls = 'quake') { const b = board(); if (b) retrig(b, cls, 900); }
function wave() { if (RM) return; const w = document.createElement('div'); w.className = 'fxo wave'; document.body.appendChild(w); setTimeout(() => w.remove(), 2900); }
// ---------- pemberitahuan besar ----------
const KC = { news: '#c084fc', vote: '#ffcf5a', curhat: '#9fb2d8', bk: '#ff4d5e', disaster: '#ff7a3d', event: '#f5b94a' };
const KT = { news: 'Kabar negara', vote: 'Pemilu', curhat: 'Curhat', bk: 'Pemain tersingkir', disaster: 'Bencana', event: 'Kejadian' };
const alertKind = a => a.e === '🧳' ? 'bk' : a.e === '📰' ? 'news' : a.e === '🗳️' ? 'vote' : a.e === '😮‍💨' ? 'curhat' : Object.keys(DZK).some(k => k.replace(/\ufe0f/g, '') === String(a.e).replace(/\ufe0f/g, '')) ? 'disaster' : 'event';
// ---------- lapisan adegan bencana (menempel selama kartu bencana tampil) ----------
let sceneEl = null;
const rg = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');
const DZ = {
  fire: '<i class="glow"></i>' + rg(12, i => `<i class="ff" style="--i:${i}"></i>`),
  flood: '<div class="wt"></div>',
  quake: rg(6, i => `<i class="dd" style="--i:${i}"></i>`),
  slide: '<div class="md"></div>' + rg(6, i => `<i class="rk" style="--i:${i}"></i>`),
  volcano: '<i class="vl"></i><i class="cl"></i>' + rg(14, i => `<i class="eb" style="--i:${i}"></i>`),
  tornado: '<div class="tf">' + rg(8, i => `<i style="--i:${i}"></i>`) + '</div>',
  drought: '<i class="sn"></i><i class="hh"></i><div class="gd"></div>',
  haze: rg(3, i => `<i class="fg" style="--i:${i}"></i>`)
};
let dzEls = [];
function dzMount(kind) {
  const hub = q('#hub');
  [[hub, 'hubx'], [skyEl, 'skyz']].forEach(([host, c]) => {
    if (!host) return; const d = document.createElement('div'); d.className = `dzfx ${c} dz-${kind}`; d.innerHTML = DZ[kind] || '';
    const hin = host.querySelector('.hub-in'); host.insertBefore(d, hin || null); dzEls.push(d);
  });
}
function endScene() { FX.stop(); const s = sceneEl; sceneEl = null; if (!s) return; s.classList.add('out'); setTimeout(() => s.remove(), 700); }
// efek kota bertahan sampai bencana berikutnya (atau game baru)
const DZK = { '🔥': 'fire', '🌊': 'flood', '🌍': 'quake', '⛰️': 'slide', '🌋': 'volcano', '🌪️': 'tornado', '☀️': 'drought', '🌫️': 'haze' };
let cityKind = null;
function setCity(kind) {
  if (kind === cityKind) return; cityKind = kind;
  const ds = dzEls; dzEls = []; ds.forEach(d => { d.classList.add('out'); setTimeout(() => d.remove(), 700); });
  if (!kind) { document.body.removeAttribute('data-dz'); return; }
  document.body.dataset.dz = kind; if (!RM) dzMount(kind);
}
function scene(kind, html = '') {
  if (sceneEl) { sceneEl.remove(); sceneEl = null; }
  if (RM) return; const d = document.createElement('div'); d.className = 'fxo sc sc-' + kind; d.innerHTML = html;
  document.body.appendChild(d); sceneEl = d;
}
const quakes = (n, cls = 'quake') => { for (let i = 0; i < n; i++) setTimeout(() => shake(cls), i * 950); };
const CRACKS = '<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M52 100 L47 84 L55 72 L44 57 L51 42 L41 26 L48 8 L45 0"/><path d="M47 84 L34 78 L26 66"/><path d="M44 57 L30 52 L20 40 L12 34"/><path d="M51 42 L64 36 L72 24 L84 18"/><path d="M55 72 L68 68 L78 78 L90 74"/><path d="M41 26 L30 18 L24 6"/></svg>';
const GROUND = '<svg viewBox="0 0 100 40" preserveAspectRatio="none"><path d="M0 8 L14 14 L22 10 L34 20 L46 14 L58 24 L70 16 L84 26 L100 20"/><path d="M14 14 L10 28 L16 40"/><path d="M34 20 L38 32 L30 40"/><path d="M58 24 L54 36 L62 40"/><path d="M84 26 L90 36 L82 40"/><path d="M46 14 L48 6 L44 0"/><path d="M70 16 L74 6"/></svg>';
function disasterFx(e, cx, cy) {
  const H = innerHeight; FX.stop(); setCity(DZK[e] || 'haze');
  if (e === '🔥') { // kebakaran hutan
    scene('fire', [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<i class="flm" style="--i:${i}"></i>`).join(''));
    FX.rain('ember', 6000); FX.rain('haze', 4500); flash('#ff7a2a');
  } else if (e === '🌊') { // banjir
    scene('flood', '<div class="water"></div>'); wave(); FX.rain('drop', 6000); flash('#58b4ff');
  } else if (e === '🌍') { // gempa
    scene('quake', CRACKS); quakes(4, 'quake2'); FX.rain('debris', 4000); FX.rain('dust', 3500); flash('#8a6a4a');
  } else if (e === '⛰️') { // longsor
    scene('slide', '<div class="mud"></div>'); quakes(2); FX.rain('rock', 3600); FX.rain('dust', 4500); flash('#8a6a4a');
  } else if (e === '🌋') { // gunung meletus
    scene('volcano', '<div class="ashc"></div><div class="plume"></div><div class="lava"></div>'); quakes(3, 'quake2');
    FX.rain('ember', 6000); FX.rain('ashfall', 6500);
    for (let i = 0; i < 3; i++) setTimeout(() => FX.burst(cx + FX.rnd(-120, 120), H, { n: 40, v: 560, c: ['#ff5a1a', '#ffb347', '#fff1a8'], g: 700 }), i * 900);
    flash('#ff5a1a');
  } else if (e === '🌪️') { // puting beliung
    scene('tornado', '<div class="tw">' + [0, 1, 2, 3, 4, 5, 6, 7].map(i => `<i style="--i:${i}"></i>`).join('') + '</div>');
    FX.rain('wind', 5500); FX.rain('leaf', 5500); quakes(2); flash('#dbe8ff'); setTimeout(() => flash('#dbe8ff'), 650);
  } else if (e === '☀️') { // kekeringan
    scene('drought', '<div class="sun2"></div><div class="hz"></div><div class="ground">' + GROUND + '</div>');
    FX.rain('heat', 6000); FX.rain('dust', 3000); flash('#ffe08a'); FX.burst(cx, cy, { n: 26, v: 200, g: -40, c: ['#ffe08a', '#fff4c2'] });
  } else { // kabut asap
    scene('haze', '<i class="fg" style="--i:0"></i><i class="fg" style="--i:1"></i><i class="fg" style="--i:2"></i>');
    FX.rain('haze', 6500); flash('#8b7d6a');
  }
}
function alertFx(a, k) {
  const cx = innerWidth / 2, cy = innerHeight * .42;
  if (k === 'disaster') disasterFx(a.e, cx, cy);
  else if (k === 'news') FX.puff(cx, cy, '#9fb2d8', 8);
  else if (k === 'vote') FX.burst(cx, cy, { n: 20 });
  else if (k === 'curhat') FX.burst(cx, cy, { n: 12, c: ['#fff', '#c9b9e6'] });
  else if (k === 'bk') { FX.rain('ash', 2800); flash('#ff3b4e'); }
  else if (k === 'event') FX.burst(cx, cy, { n: 14, c: ['#ffe29a', '#ffcf5a', '#fff'] });
}
function showAlert(a) {
  alertShow = a; alertFx(a, alertKind(a)); updOverlay();
  clearTimeout(showAlert.t); showAlert.t = setTimeout(closeAlert, 8000);
}
function closeAlert() { clearTimeout(showAlert.t); endScene(); alertShow = null; updOverlay(); botStep(); }

// ---------- layar: home / loading / lobby ----------
function homeHTML() {
  const bad = !sb;
  return `<div class="home"><div class="hero">
    <div class="mascots">${AV.map((a, i) => `<span style="--i:${i};--c:${COL[i]}">${a}</span>`).join('')}</div>
    <h1 class="logo"><span class="lt" data-t="Rotan">Rotan</span><span class="ls">Dicambuk terus, tetap harus berdiri</span></h1>
    <p class="tag">Bertahan hidup sebagai rakyat di negeri yang kacau.</p>
    <div class="glass form">
      ${bad ? `<p class="warn">${esc(onlineIssue || 'Mode online belum siap. Periksa konfigurasi Supabase.')}</p>` : ''}
      <input id="nm" class="inp" maxlength="14" placeholder="Nama pemain" autocomplete="off">
      <button class="btn" onclick="G.create()">Buat room</button>
      <div class="or"><span>sudah punya kode?</span></div>
      <input id="cd" class="inp code-in" maxlength="6" placeholder="KODE ROOM" autocomplete="off" style="text-transform:uppercase">
      <button class="btn alt" onclick="G.join()">Gabung room</button>
      <div class="or"><span>atau coba dulu</span></div>
      <a class="btn alt link" href="?demo">Main demo melawan bot</a>
    </div>
    <ul class="pills"><li>2–4 pemain</li><li>Realtime online</li><li>Sindiran tanpa ampun</li></ul>
  </div></div>`;
}
function build(key) {
  hideTip(); if (ro) { ro.disconnect(); ro = null; }
  if (key === 'home') app.innerHTML = homeHTML();
  else if (key === 'loading') app.innerHTML = '<div class="home"><div class="loading"><div class="spin">🏙️</div><p>Menyambungkan kembali…</p></div></div>';
  else if (key === 'lobby') {
    app.innerHTML = `<div class="home"><div class="lobby glass"><h2>Lobby</h2>
      <button class="ticket" onclick="G.copy()" aria-label="Salin kode room"><small>Ketuk untuk menyalin kode</small><div class="digits">${[...room].map((c, i) => `<span style="--i:${i}">${c}</span>`).join('')}</div></button>
      <div class="slots" id="slots">${[0, 1, 2, 3].map(() => '<div class="slot"></div>').join('')}</div>
      <div class="lact" id="lact"></div><button class="btn alt sm" onclick="G.leave()">Keluar</button></div></div>`;
    el.slots = [...app.querySelectorAll('.slot')]; el.lact = q('#lact');
  } else buildGame();
}
function updLobby() {
  const ps = S.players, my = ps[me.pid], all = ps.length > 1 && ps.every(x => x.ready);
  el.slots.forEach((s, i) => {
    const p = ps[i], k = p ? `${p.name}|${p.ready}|${S.host}|${me.pid}` : 'empty';
    if (s._k === k) return; s._k = k;
    if (p && !s._on) retrig(s, 'enter', 700); s._on = !!p;
    s.classList.toggle('on', !!p); s.classList.toggle('rd', !!(p && p.ready)); s.style.setProperty('--c', p ? COL[p.id] : 'transparent');
    s.innerHTML = p ? `<span class="av" style="--c:${COL[p.id]}">${AV[p.id]}</span><span class="nm">${p.id === S.host ? '👑 ' : ''}${esc(p.name)}${p.id === me.pid ? '<em>kamu</em>' : ''}</span><span class="st">${p.ready ? 'Siap' : 'Belum siap'}</span>` : '<span class="wait">Menunggu pemain…</span>';
  });
  const rr = S.rounds === undefined ? C.rounds : S.rounds, rl = n => n ? n : 'Tanpa batas';
  H(el.lact, `<div class="hint">Batas ronde: <b>${rl(rr)}</b></div>` + (me.pid === S.host ? '<div class="rrow">' + [12, 18, 24, 0].map(n => btn(rl(n), { t: 'rounds', n }, { sm: 1, alt: n !== rr })).join('') + '</div>' : '') + btn(my.ready ? 'Batal siap' : 'Siap', { t: 'ready' }, { alt: my.ready }) +
    (me.pid === S.host ? btn('Mulai game', { t: 'start' }, { off: !all }) + (all ? '' : '<small class="hint">Butuh minimal 2 pemain dan semua siap</small>') : '<small class="hint">Menunggu host memulai…</small>'));
}

// ---------- layar game: kerangka (dibuat sekali) ----------
function buildGame() {
  const tl = T.map((t, i) => { const [c, r] = xy(i); return `<div class="tile k-${t === 'P' ? 'Pasar' : t}" data-i="${i}" data-s="${side(i)}" style="grid-column:${c + 1};grid-row:${r + 1};--sc:${SPC[t]}"></div>`; }).join('');
  app.innerHTML = `
  <header class="top"><div class="brand"><span class="mark">🏚️</span><span class="wm">Rotan</span></div>
    <div class="topr"><button class="roomchip" onclick="G.copy()" title="Salin kode room"><small>Room</small><b>${room}</b></button><button class="btn alt sm" onclick="G.help()">Cara main</button><button class="btn alt sm" onclick="G.leave()">Keluar</button></div></header>
  <main class="stage">
    <section class="bwrap"><div class="board" id="board">${tl}
      <div class="hub" id="hub"><div class="hub-city">${skyline(600, 140, 30, 110, 24, 52, '#2e1c18', .25)}</div>
        ${[0, 1, 2, 3].map(i => `<span class="dist d${i}" style="--dc:${DCOL[i]}">${C.sides[i]}</span>`).join('')}
        <div class="hub-in"><div id="hcrisis"></div><div id="hturn" class="turn"></div>
          <div id="hdice" class="dice"><div class="die ghost"></div><span class="sum"></span></div><div id="hctl" class="ctl"></div></div></div>
      <div class="tokens" id="tokens">${S.players.map(p => `<div class="pawn" style="--c:${COL[p.id]}"><i class="pb">${esc(initial(p.name))}</i><i class="sh"></i></div>`).join('')}</div>
    </div></section>
    <aside class="side"><div class="plist" id="plist">${S.players.map(p => `<div class="pcard" style="--c:${COL[p.id]}"><div class="av">${AV[p.id]}</div>
      <div class="pc-m"><div class="pc-top"></div><div class="pc-cash"><b class="cash"></b><span class="job"></span></div></div>
      <div class="pstats"></div><div class="fxbox"></div></div>`).join('')}</div>
      <div class="glass log" id="log"></div></aside>
  </main>`;
  el = { board: q('#board'), hub: q('#hub'), crisis: q('#hcrisis'), turn: q('#hturn'), dice: q('#hdice'), ctl: q('#hctl'), log: q('#log'), ov: q('#ov') };
  tiles = [...app.querySelectorAll('.tile')]; pawns = [...app.querySelectorAll('.pawn')]; currentTile = -1;
  cacheBoardLayout();
  cards = [...app.querySelectorAll('.pcard')].map(r => ({ root: r, top: r.querySelector('.pc-top'), cash: r.querySelector('.cash'), job: r.querySelector('.job'), stats: r.querySelector('.pstats'), fx: r.querySelector('.fxbox') }));
  shownCash = {}; logLast = null; logSig = ''; alertShow = null; endScene(); setCity(null);
  el.board.addEventListener('mouseover', e => { const t = e.target.closest('.tile'); t ? showTip(t) : hideTip(); });
  el.board.addEventListener('mouseleave', hideTip);
  el.board.addEventListener('click', e => { const t = e.target.closest('.tile'); if (t && matchMedia('(hover:none)').matches) { showTip(t); clearTimeout(showTip.t); showTip.t = setTimeout(hideTip, 3500); } });
  try { if (!localStorage.getItem('rotan_help')) { localStorage.setItem('rotan_help', 1); showHelp(); } } catch (e) {}
  ro = new ResizeObserver(() => { cacheBoardLayout(); if (D) placeAll(); }); ro.observe(el.board);
}

function cacheBoardLayout() {
  tileCenters = tiles.map(t => ({ x: t.offsetLeft + t.offsetWidth / 2, y: t.offsetTop + t.offsetHeight * .64 }));
  pawnSize = pawns[0] ? pawns[0].offsetWidth : 22;
}

// ---------- tooltip tile ----------
function tipHTML(i) {
  const t = T[i], sd = side(i), d = { A: 'Pojok Pengaduan: laporkan Penguasa. Berhasil kalau dadu ≤ jejak korupsinya. Gagal, pelapor yang kena batunya.', G: `Terima gaji saat melewati atau berhenti di sini. Berhenti tepat di sini: bonus +${C.gajiBonus} koin.`, L: 'Tarik 2 kartu pekerjaan, pilih satu. Pekerjaan layak butuh dadu 5–6 atau Orang Dalam.', P: `Bayar ${D.harga} koin. Harga naik tiap kebijakan baru.`, B: 'Bayar pelicin atau terima akibatnya. Pelicin masuk kantong Penguasa dan menambah jejak korupsinya.', K: 'Kabar Negara: warga mendapat 1 kebijakan acak; Penguasa memilih 1 dari 2.', X: 'Bencana menimpa semua warga di area ini.', R: 'Beri 1 koin ke warga lain, pulihkan 1 Sabar.', M: 'Macet: bayar 1 koin, atau rute dialihkan ke tile acak dan efek tile itu langsung berlaku. Ojol kebal dan malah dapat 1 koin.', J: `Penjara: lewatkan 2 giliran. Penguasa kebal hukum, hanya 1 giliran. Punya koin lebih dari ${C.penjara.bail}? Bayar jaminan ${C.penjara.bail} koin untuk langsung bebas.` }[t];
  return `<h4><i style="--dc:${DCOL[sd]}"></i>${ICON[t]} ${NAME[t]}</h4><p>${d}</p><p>Area ${C.sides[sd]}</p>`;
}
function showTip(t) {
  if (!D || screen !== 'game') return; H(tipEl, tipHTML(+t.dataset.i)); tipEl.classList.add('on');
  const r = t.getBoundingClientRect(), w = tipEl.offsetWidth, h = tipEl.offsetHeight; let x = r.left + r.width / 2 - w / 2, y = r.top - h - 10; if (y < 8) y = r.bottom + 10;
  tipEl.style.transform = `translate(${Math.max(8, Math.min(innerWidth - w - 8, x))}px,${Math.max(8, y)}px)`;
}
function hideTip() { if (tipEl) tipEl.classList.remove('on'); }

// ---------- pembaruan tampilan (patch, bukan bangun ulang) ----------
function updTiles() {
  const s = D, cp = s.phase === 'play' ? vis[s.turn] : -1;
  T.forEach((t, i) => { const e = tiles[i]; H(e, `<span class="band"></span><div class="ico">${ICON[t]}</div><span class="nm">${NAME[t]}</span>${t === 'P' ? `<span class="price">${s.harga} koin</span>` : ''}`); });
  setCurrentTile(cp);
}
function setCurrentTile(i) {
  if (currentTile === i) return;
  if (currentTile >= 0 && tiles[currentTile]) tiles[currentTile].classList.remove('cur');
  currentTile = i;
  if (currentTile >= 0 && tiles[currentTile]) tiles[currentTile].classList.add('cur');
}
function placeAll() {
  const grp = {}; D.players.forEach(p => { if (!p.gone) (grp[vis[p.id]] = grp[vis[p.id]] || []).push(p.id); });
  D.players.forEach(p => {
    const e = pawns[p.id]; if (!e) return; e.classList.toggle('gone', !!p.gone);
    e.classList.toggle('act', D.phase === 'play' && p.id === D.turn && !p.gone);
    const g = grp[vis[p.id]] || [p.id], k = Math.max(0, g.indexOf(p.id)), n = g.length, c = tileCenters[vis[p.id]];
    if (!c) return;
    const x = c.x + (k - (n - 1) / 2) * pawnSize * .62, y = c.y + (n > 2 ? (k % 2 ? -1 : 1) * pawnSize * .22 : 0);
    if (e._x !== x || e._y !== y) { e.style.transform = `translate3d(${x}px,${y}px,0)`; e._x = x; e._y = y; }
  });
}
const pips = v => { const P = [[], [5], [1, 9], [1, 5, 9], [1, 3, 7, 9], [1, 3, 5, 7, 9], [1, 3, 4, 6, 7, 9]][v]; return Array.from({ length: 9 }, (_, i) => P.includes(i + 1) ? '<i></i>' : '<b></b>').join(''); };
function updDice() {
  if (dv.rolling) return;
  const ds = el.dice.querySelectorAll('.die'), v = dv.vals;
  ds.forEach((d, k) => { d.classList.toggle('ghost', !v); H(d, v ? pips(v[k]) : ''); });
  H(el.dice.querySelector('.sum'), v ? '' : '');
}
function ctlHTML() {
  const s = D, cur = s.players[s.turn], my = s.players[me.pid];
  if (s.phase !== 'play') return '';
  if (animating) return `<div class="hint busy">${dv.rolling ? 'Mengocok dadu…' : 'Berjalan…'}</div>`;
  if (s.stage === 'vote') return '<div class="hint">Pemilu berlangsung…</div>';
  if (s.pend && s.pend.t === 'kabar') return s.pend.by === me.pid
    ? '<div class="hint">Giliran keputusanmu sebagai Penguasa.</div>'
    : `<div class="hint">Menunggu <b>${esc(s.players[s.pend.by].name)}</b> (Penguasa) memilih kebijakan. Giliran papan: <b>${esc(cur.name)}</b>.</div>`;
  if (!(s.turn === me.pid && !my.gone)) return `<div class="hint">Menunggu <b>${esc(cur.name)}</b>…</div>`;
  if (s.stage === 'roll') return btn('🎲 Lempar dadu', { t: 'roll' }, { big: 1 });
  return '<div class="hint">Pilih keputusan pada kartu</div>';
}
function updHub() {
  const s = D, cur = s.players[s.turn];
  H(el.crisis, `<div class="state"><span>👑 ${esc(s.players[s.penguasa].name)}</span><span>🏛️ Kas ${s.kas}</span><span title="Jejak korupsi Penguasa">🧾 ${s.players[s.penguasa].korup || 0}</span><span>📈 Harga ${'●'.repeat(s.harga)}${'○'.repeat(C.hargaMax - s.harga)}</span></div>`);
  H(el.turn, s.phase === 'over' ? '<span>Game selesai</span>' : s.stage === 'vote'
    ? `<span>Pemilu: ${Object.keys(s.votes).length}/${s.players.filter(x => !x.gone).length} sudah memilih</span>`
    : s.pend && s.pend.t === 'kabar'
      ? `<span>📰 Penguasa <b>${esc(s.players[s.pend.by].name)}</b> memilih berita</span><span class="round">Giliran papan: ${esc(cur.name)} · Ronde ${s.round}${s.rounds ? '/' + s.rounds : ''}</span>`
      : `<span class="av" style="--c:${COL[cur.id]}">${AV[cur.id]}</span><span>Giliran <b>${esc(cur.name)}</b></span><span class="round">Ronde ${s.round}${s.rounds ? '/' + s.rounds : ''}</span>`);
  updDice(); H(el.ctl, ctlHTML());
  const ds = s.phase === 'play' ? side(vis[s.turn]) : -1; el.hub.querySelectorAll('.dist').forEach((d, i) => d.classList.toggle('on', i === ds));
}
function tween(pid, to, e) {
  const from = e._v !== undefined ? e._v : shownCash[pid];
  shownCash[pid] = to;
  if (from === undefined || RM) { e._v = to; e.textContent = M(to); return; }
  if (e._to === to) return; e._to = to;
  if (e._tw) cancelAnimationFrame(e._tw);
  if (from === to) { e.textContent = M(to); return; }
  const t0 = performance.now(), dur = LOW_POWER ? 450 : 750; e.classList.remove('up', 'down'); e.classList.add(to > from ? 'up' : 'down');
  // tulis teks hanya kalau angka yang tampil berubah: tiap penulisan memicu layout ulang kartu pemain
  const step = t => { const k = Math.min(1, (t - t0) / dur), v = from + (to - from) * (1 - Math.pow(1 - k, 3)); e._v = v; const tx = M(v); if (e._tx !== tx) { e._tx = tx; e.textContent = tx; } if (k < 1) e._tw = requestAnimationFrame(step); else { e._tw = 0; e._v = to; e.classList.remove('up', 'down'); } };
  e._tw = requestAnimationFrame(step);
}
function updPlayers() {
  const s = D;
  s.players.forEach(p => {
    const c = cards[p.id]; if (!c) return; const j = J(p.job), st = p.gone ? 'BANKRUPT' : p.sab <= 1 ? 'RISK' : 'SAFE';
    c.root.classList.toggle('act', s.phase === 'play' && p.id === s.turn); c.root.classList.toggle('bk', !!p.gone);
    H(c.top, `<b class="nm">${p.id === s.penguasa && !p.gone ? '👑 ' : ''}${esc(p.name)}${p.id === me.pid ? '<em>kamu</em>' : ''}</b><span class="chip ${st}">${LBL[st]}</span>`);
    H(c.job, `💼 ${j.n}`); tween(p.id, p.coin, c.cash);
    H(c.stats, `<span><small>Sabar</small><b>${'❤️'.repeat(p.sab) || '—'}</b></span><span><small>Gaji</small><b>${j.sal}</b></span>${p.orang ? `<span><small>Orang Dalam</small><b>×${p.orang}</b></span>` : ''}`);
  });
}
function updLog() {
  const L = D.log, sig = L.length + '|' + L[L.length - 1]; if (sig === logSig) return; logSig = sig;
  const i = logLast == null ? L.length : L.lastIndexOf(logLast), fresh = i < 0 ? 0 : i + 1; logLast = L[L.length - 1];
  H(el.log, L.map((x, k) => `<div class="le${k >= fresh && fresh < L.length ? ' new' : ''}">${esc(x)}</div>`).reverse().join(''));
}
function updOverlay() {
  const o = q('#ov'); if (!o) return;
  if (screen !== 'game' || !D) { o.hidden = true; return; }
  const s = D, my = s.players[me.pid], mt = s.turn === me.pid && !my.gone && s.phase === 'play' && !animating; let h = '', cls = 'ov';
  const card = (ico, t, d, b) => `<div class="card"><div class="cico">${ico}</div><h2>${esc(t)}</h2><p>${esc(d)}</p><div class="cbtns col">${b}</div></div>`;
  if (s.phase === 'over') {
    const w = s.winner != null ? s.players[s.winner] : null, E = { layak: 'Kamu berhasil. Sekarang tinggal menunggu harga naik lagi.', bertahan: 'Kamu masih hidup. Itu sudah prestasi.', dinasti: 'Dinasti berlanjut. Selamat kepada keluarga besar.', none: 'Tidak ada yang bertahan.' }[s.ending] || '';
    h = `<div class="winbox"><div class="trophy">🏆</div><h1>Bertahan</h1>${w ? `<div class="wname" style="--c:${COL[w.id]}">${AV[w.id]} ${esc(w.name)}</div>` : ''}<p>${E}</p><div>${(me.pid === s.host || DEMO) ? btn('Main lagi', { t: 'again' }) : '<p class="hint">Menunggu host…</p>'}<button class="btn alt" onclick="G.leave()">Keluar</button></div></div>`;
  } else if (s.stage === 'vote' && !my.gone && !animating && s.votes[me.pid] !== undefined) {
    h = card(eico('🗳️'), 'Pemilu', 'Suara tercatat. Menunggu pemilih lain…', '');
  } else if (s.stage === 'vote' && !my.gone && !animating) {
    h = card(eico('🗳️'), 'Pemilu', 'Pilih pemegang Kursi (tidak boleh diri sendiri). Kursi hanya pindah kalau ada suara mayoritas. Kalau tinggal berdua, suara pasti seri dan kursi pindah ke penantang.', s.players.filter(p => !p.gone && p.id !== me.pid).map(p => btn(`${AV[p.id]} ${esc(p.name)}${p.id === s.penguasa ? ' (petahana)' : ''}`, { t: 'vote', for: p.id }, { alt: p.id !== s.penguasa })).join(''));
  } else if (s.stage === 'pend' && s.pend.t === 'kabar' && s.pend.by === me.pid && !animating) {
    const cs = s.pend.c.map(id => C.cards.kabar.find(k => k.id === id));
    h = card(ICON.K, 'Kamu Penguasa: pilih kebijakan', 'Satu kartu berlaku untuk semua pemain, satunya dibuang.', cs.map((c, i) => btn(`<span class="opt"><b>${esc(c.t)}</b><small class="bx">${Engine.fx.kabar(c).map(esc).join('<br>')}</small><i class="sat">${esc(c.d)}</i></span>`, { t: 'kabar', i })).join(''));
  } else if (mt && s.stage === 'pend') {
    const pd = s.pend;
    if (pd.t === 'job') { const lay = pd.c.some(i => J(i).layak); h = card(ICON.L, 'Lowongan', pd.c.map(i => `${J(i).n}: ${J(i).d}`).join(' ') + (lay ? ` Pekerjaan layak: lolos kalau dadu 5–6 (peluang 33%)${my.orang ? `, atau pakai Orang Dalam (kamu punya ${my.orang})` : ', atau pakai Orang Dalam'}.` : ''), pd.c.map((id, i) => btn(`${J(id).n}, gaji ${J(id).sal}${J(id).layak ? (my.orang ? ' (layak: dadu 5–6 / Orang Dalam)' : ' (layak: dadu 5–6)') : ''}`, { t: 'job', i })).join('') + btn('Tetap di pekerjaan lama', { t: 'job', i: -1 }, { alt: 1 }) + (lay ? btn(`🕴️ Beli Orang Dalam (${C.orangPrice} koin)`, { t: 'buy' }, { alt: 1, sm: 1, off: my.coin < C.orangPrice }) : '')); }
    else if (pd.t === 'biro') { const c = C.cards.biro.find(k => k.id === pd.id), cost = c.pay + (J(my.job).biro || 0); h = card(ICON.B, c.t, c.d, btn(`Bayar pelicin ${cost} koin`, { t: 'biro', pay: 1 }) + btn('Tolak, terima akibatnya', { t: 'biro', pay: 0 }, { alt: 1 }) + (my.orang ? btn('Pakai Orang Dalam', { t: 'orang' }, { alt: 1 }) : '') + btn(`🕴️ Beli Orang Dalam (${C.orangPrice} koin)`, { t: 'buy' }, { alt: 1, sm: 1, off: my.coin < C.orangPrice })); }
    else if (pd.t === 'jail') h = card(ICON.J, 'Penjara', `Kamu masuk Penjara dan harus lewat ${my.id === s.penguasa ? 1 : 2} giliran. Atau bayar uang jaminan ${C.penjara.bail} koin dan langsung bebas. Hukum itu adil: yang punya uang bebas duluan.`, btn(`💸 Bayar jaminan ${C.penjara.bail} koin`, { t: 'jail', pay: 1 }, { off: my.coin <= C.penjara.bail }) + btn('Terima hukuman', { t: 'jail', pay: 0 }, { alt: 1 }));
    else if (pd.t === 'macet') h = card(ICON.M, 'Macet Parah', 'Jalan di depan tidak bergerak. Bayar 1 koin ke juru parkir jalan tikus, atau ikuti GPS: rute dialihkan ke tile acak (bukan Gajian dan Penjara) dan efek tile itu langsung berlaku.', btn('🪙 Bayar 1 koin', { t: 'macet', pay: 1 }, { off: my.coin < 1 }) + btn('🧭 Ikuti GPS (rute dialihkan)', { t: 'macet', pay: 0 }, { alt: 1 }));
    else if (pd.t === 'lapor') { const g = s.players[s.penguasa], k = g.korup || 0, pr = Math.round(Math.min(6, k) / 6 * 100); h = card(ICON.A, 'Kantor Pengaduan', `Jejak korupsi Penguasa ${g.name}: ${k}. ${k ? `Laporan diterima kalau dadu ≤ ${Math.min(6, k)} (peluang ${pr}%). Berhasil: Penguasa masuk Penjara dan kamu dapat ${C.lapor.bounty} koin dari Kas.` : 'Belum ada bukti sama sekali, laporan pasti ditolak.'} Gagal: kamu −${C.lapor.sabFail} Sabar.`, btn(`📣 Laporkan (${pr}%)`, { t: 'lapor', go: 1 }, { off: k < 1 }) + btn('Urung melapor', { t: 'lapor', go: 0 }, { alt: 1 })); }
    else if (pd.t === 'gr') h = card(ICON.R, 'Gotong royong', 'Beri 1 koin ke warga lain, kamu pulih 1 Sabar.', s.players.filter(p => !p.gone && p.id !== my.id).map(p => btn(`Bantu ${AV[p.id]} ${esc(p.name)}`, { t: 'gr', to: p.id }, { off: my.coin < 1 })).join('') + btn('Lewati', { t: 'gr', to: -1 }, { alt: 1 }));
  } else if (alertShow) {
    const a = alertShow, k = alertKind(a); cls += ' alert'; o.style.setProperty('--k', KC[k]);
    h = `<div class="banner" style="--k:${KC[k]}"><button class="x" onclick="G.closeAlert()" aria-label="Tutup">✕</button><div class="kick">${KT[k]}</div><div class="big">${eico(a.e)}</div><h2>${esc(k === 'bk' ? 'Merantau' : title(a.t))}</h2>${a.w ? `<p class="where">${esc(a.w)}</p>` : ''}${a.x && a.x.length ? `<div class="efx">${a.x.map(t => `<span${t.startsWith('Bantuan') ? ' class="note"' : ''}>${esc(t)}</span>`).join('')}</div>` : ''}<p class="sat">${esc(a.d)}</p><i class="tm"></i></div>`;
  }
  o.hidden = !h; o.className = cls; H(o, h);
}
function mood() {
  const c = D && D.phase === 'play' && D.harga >= 3;
  const want = D && D.phase === 'play' && D.disaster ? DZK[D.disaster] || null : null; if (!want || !animating) setCity(want);
  document.body.classList.toggle('crisis', !!c); document.body.style.setProperty('--cr', '#ff5a3c');
}
function updGame() { updTiles(); placeAll(); updHub(); updPlayers(); updLog(); updOverlay(); }
function render() {
  const key = !S ? (saved ? 'loading' : 'home') : S.phase === 'lobby' ? 'lobby' : 'game';
  if (key !== screen) { screen = key; build(key); }
  document.body.classList.toggle('is-busy', busy);
  if (key === 'lobby') updLobby(); else if (key === 'game' && D) updGame();
  if (key !== 'game') { const o = q('#ov'); if (o) o.hidden = true; }
  mood();
}

// ---------- animasi berurutan ----------
function floatNum(f) {
  const c = cards[f.pid]; if (!c) return;
  const e = document.createElement('span'); e.className = 'fl ' + (f.amt > 0 ? 'pos' : 'neg'); e.textContent = (f.amt > 0 ? '+' : '−') + M(Math.abs(f.amt)); e.style.top = (c.fx.children.length * 20) + 'px'; c.fx.appendChild(e); setTimeout(() => e.remove(), 1700);
  if (f.amt >= 200) { const r = c.cash.getBoundingClientRect(); FX.coins(r.left + 24, r.top + 8, Math.min(10, Math.ceil(f.amt / 120))); }
}
function after(prev, snap) {
  const cur = D;
  (cur.fxs || []).forEach(f => { if (!seenF.has(f.id)) { seenF.add(f.id); if (!snap) floatNum(f); } });
  if (cur.alert && cur.alert.id !== lastAl) { lastAl = cur.alert.id; if (!snap) showAlert(cur.alert); }
  if (!snap && prev && prev.phase === 'play' && cur.phase === 'over') { FX.confetti(5200, 5); setTimeout(() => FX.coins(innerWidth / 2, innerHeight * .6, 18), 500); }
}
function settle(snap) {
  const prev = D; D = S;
  if (!snap) S.players.forEach(p => { if (vis[p.id] !== p.pos) vis[p.id] = p.pos; }); // posisi berubah tanpa dadu (mis. dipenjara kartu)
  if (snap) { vis = S.players.map(p => p.pos || 0); dv = { vals: S.dice || null, rolling: false }; animRid = S.rid || 0; shownCash = {}; if (S.alert) lastAl = S.alert.id; (S.fxs || []).forEach(f => seenF.add(f.id)); }
  render(); after(prev, snap); botStep();
}
async function rollAnim(vals) {
  dv = { vals, rolling: true }; const ds = [...el.dice.querySelectorAll('.die')];
  ds.forEach((d, k) => { d.classList.remove('ghost', 'land'); d.classList.add('rolling'); d.style.animationDelay = (k * -.14) + 's'; });
  H(el.dice.querySelector('.sum'), ''); H(el.ctl, ctlHTML());
  const spent = preAt ? performance.now() - preAt : 0; preAt = 0; // dadu sudah berputar selama menunggu server: jangan diputar lagi selama durasi penuh
  const dur = RM ? 0 : spent ? Math.max(120, DICE_MS - spent) : DICE_MS;
  const t0 = performance.now(); while (performance.now() - t0 < dur) { ds.forEach(d => H(d, pips(1 + R(6)))); await sleep(DICE_FRAME_MS); }
  ds.forEach((d, k) => { d.classList.remove('rolling'); d.style.animationDelay = ''; void d.offsetWidth; d.classList.add('land'); H(d, pips(vals[k])); });
  dv.rolling = false; H(el.dice.querySelector('.sum'), ''); H(el.ctl, ctlHTML()); await sleep(LOW_POWER ? 260 : 520);
}
function hop(pid) {
  const b = pawns[pid] && pawns[pid].firstElementChild; if (!b || !b.animate || RM) return;
  b.animate([{ transform: 'translateY(0) scale(1,1)' }, { transform: 'translateY(-72%) scale(.92,1.1)', offset: .45 }, { transform: 'translateY(0) scale(1.14,.86)', offset: .85 }, { transform: 'translateY(0) scale(1,1)' }], { duration: LOW_POWER ? 120 : 160 });
}
function stepTile(e) {
  if (!e || RM || LOW_POWER) return;
  e.classList.remove('step');
  requestAnimationFrame(() => {
    e.classList.add('step');
    setTimeout(() => e.classList.remove('step'), 620);
  });
}
async function hopAll() {
  const P = S.players; P.forEach(p => {
    if (S.teleported === p.id || ((p.pos - vis[p.id] + 28) % 28) > 12 || D.players[p.id].gone) vis[p.id] = p.pos;
  });
  for (;;) {
    const mv = P.filter(p => vis[p.id] !== p.pos); if (!mv.length) break;
    mv.forEach(p => {
      vis[p.id] = (vis[p.id] + 1) % 28; hop(p.id); stepTile(tiles[vis[p.id]]);
      if (vis[p.id] === 0) { const [x, y] = centerOf(tiles[0]); FX.burst(x, y, { n: 22 }); FX.coins(x, y, 6); retrig(tiles[0], 'land', 500); }
    });
    if (!LOW_POWER) setCurrentTile(D.phase === 'play' ? vis[D.turn] : -1);
    placeAll(); const ds = D.phase === 'play' ? side(vis[D.turn]) : -1; el.hub.querySelectorAll('.dist').forEach((d, i) => d.classList.toggle('on', i === ds));
    await sleep(STEP_MS);
  }
  setCurrentTile(D.phase === 'play' ? vis[D.turn] : -1);
  const landed = S.players[D.turn], t = landed && tiles[vis[landed.id]];
  if (t) { retrig(t, 'land', 500); const [x, y] = centerOf(t); FX.puff(x, y + 8, '#d9c7a0', 3); }
}
async function runSeq() {
  animating = true; render();
  try { while (S.rid && S.rid !== animRid) { animRid = S.rid; await rollAnim(S.dice); await hopAll(); await sleep(SEQUENCE_PAUSE_MS); } }
  finally { animating = false; }
  settle(false);
}
let botT = 0;
function botActor() { // mode demo: pemain selain kamu dimainkan bot
  if (!DEMO || !S || S.phase !== 'play') return null;
  if (S.stage === 'vote') return S.players.find(x => !x.gone && x.id !== me.pid && S.votes[x.id] === undefined) || null;
  if (S.pend && S.pend.t === 'kabar') return S.pend.by !== me.pid ? S.players[S.pend.by] : null;
  const t = S.players[S.turn]; return t.id !== me.pid && !t.gone ? t : null;
}
function botStep() {
  if (animating || botT || alertShow || !botActor()) return;
  botT = setTimeout(() => {
    botT = 0; const b = botActor(); if (!b || animating) return;
    const A = S.players.filter(x => !x.gone), pd = S.pend, clone = () => JSON.parse(JSON.stringify(S)); let a;
    if (S.stage === 'vote') a = { t: 'vote', for: S.penguasa !== b.id ? S.penguasa : A.find(x => x.id !== b.id).id };
    else if (pd && pd.t === 'kabar') { const w = pd.c.map(id => C.cards.kabar.find(k => k.id === id).w); a = { t: 'kabar', i: w[1] > w[0] ? 1 : 0 }; }
    else if (S.stage === 'roll') a = { t: 'roll' };
    else if (pd.t === 'job') { const sc = pd.c.map(id => J(id).sal), m = Math.max(...sc); a = { t: 'job', i: m > J(b.job).sal ? sc.indexOf(m) : -1 }; }
    else if (pd.t === 'jail') a = { t: 'jail', pay: b.coin >= 5 };
    else if (pd.t === 'macet') a = { t: 'macet', pay: b.coin >= 3 ? 1 : 0 };
    else if (pd.t === 'lapor') a = { t: 'lapor', go: (S.players[S.penguasa].korup || 0) >= 3 && b.sab > 1 };
    else if (pd.t === 'gr') { const o = A.filter(x => x.id !== b.id).sort((x, y) => x.coin - y.coin)[0]; a = { t: 'gr', to: o && b.coin >= 4 ? o.id : -1 }; }
    else { const c = C.cards.biro.find(k => k.id === pd.id); a = { t: 'biro', pay: b.coin >= c.pay + 2 }; }
    const n = act(clone(), a, b.id) || act(clone(), S.stage === 'roll' ? { t: 'roll' } : S.stage === 'vote' ? { t: 'vote', for: A.find(x => x.id !== b.id).id } : pd.t === 'kabar' ? { t: 'kabar', i: 0 } : { t: pd.t, pay: 0, i: -1, to: -1, go: 0 }, b.id);
    if (n) apply({ version: V + 1, state: n });
  }, RM ? 40 : 800);
}
function onState(first) {
  const can = D && D.phase === 'play' && (S.phase === 'play' || S.phase === 'over');
  if (first || !can) { settle(true); return; }
  if (animating) return;
  if (S.rid && S.rid !== animRid) { runSeq(); return; }
  settle(false);
}

function showHelp() {
  const t = k => `<span class="hi">${ICON[k]}</span>`, d = document.createElement('div'); d.className = 'ov helpov'; d.onclick = e => { if (e.target === d || e.target.closest('.btn')) d.remove(); };
  const rounds = S && S.rounds != null ? S.rounds : C.rounds;
  const elections = rounds === 0 ? `setiap ${C.pemiluEvery} ronde` : (() => {
    const after = Array.from({ length: Math.floor((rounds - 1) / C.pemiluEvery) }, (_, i) => (i + 1) * C.pemiluEvery);
    return after.length ? `setelah ronde ${after.join(', ')}` : 'tidak ada sebelum permainan selesai';
  })();
  d.innerHTML = `<div class="card wide"><div class="cico">${ICON.K}</div><h2>Cara main</h2><div class="hbody">
    <h3>Tujuan</h3><p>Bertahan sampai ${S && S.rounds === 0 ? 'tinggal satu pemain' : 'ronde ' + ((S && S.rounds) || C.rounds)}. Pemenang: yang masih bertahan, utamakan yang punya pekerjaan layak, lalu koin terbanyak.</p>
    <h3>Angka milikmu</h3><ul><li><b>Koin:</b> uangmu.</li><li><b>Sabar:</b> nyawamu, maksimal 3. Habis berarti merantau (tersingkir).</li><li><b>Gaji:</b> koin yang kamu terima tiap melewati Gajian.</li></ul>
    <h3>Angka bersama</h3><ul><li><b>Kas Negara:</b> terisi dari pajak, jaminan, dan koin warga yang merantau. Penguasa bisa mengambilnya.</li><li><b>Harga (1–4):</b> biaya di Pasar. Naik karena kebijakan dan bencana.</li><li><b>Penguasa 👑:</b> memilih kebijakan, dan tiap ${C.skimEvery} ronde mengambil 1 koin dari Kas.</li></ul>
    <h3>Tile di papan</h3><ul class="tl">
    <li>${t('G')}<span><b>Gajian:</b> terima gaji saat melewati. Berhenti tepat di sini: bonus +${C.gajiBonus} koin.</span></li>
    <li>${t('A')}<span><b>Pengaduan (pojok kiri bawah):</b> laporkan Penguasa. Berhasil kalau dadu ≤ jejak korupsinya 🧾: Penguasa masuk Penjara dan kamu dapat ${C.lapor.bounty} koin dari Kas. Gagal: kamu −${C.lapor.sabFail} Sabar.</span></li>
    <li>${t('L')}<span><b>Lowongan:</b> pilih 1 dari 2 pekerjaan. Pekerjaan layak (Karyawan Tetap, Pegawai Titipan) hanya lolos kalau dadu 5–6, atau kamu pakai Orang Dalam. Orang Dalam bisa dibeli langsung di sini.</span></li>
    <li>${t('P')}<span><b>Pasar:</b> bayar koin sebesar Harga.</span></li>
    <li>${t('B')}<span><b>Birokrasi:</b> bayar pelicin atau terima akibatnya. Pelicin masuk kantong Penguasa dan menambah jejak korupsinya 🧾. Boleh beli Orang Dalam (${C.orangPrice} koin, juga dibayar ke Penguasa).</span></li>
    <li>${t('K')}<span><b>Kabar:</b> warga biasa mendapat 1 berita acak yang langsung berlaku. Jika Penguasa mendarat, ia memilih 1 dari 2 berita.</span></li>
    <li>${t('X')}<span><b>Bencana:</b> menimpa semua pemain di area itu. Korban menerima dampak bencana tanpa bantuan koin dari Kas.</span></li>
    <li>${t('R')}<span><b>Gotong Royong:</b> beri 1 koin ke pemain lain, kamu pulih 1 Sabar.</span></li>
    <li>${t('M')}<span><b>Macet:</b> bayar 1 koin, atau rute dialihkan ke tile acak (bukan Gajian dan Penjara) dan efek tile itu langsung berlaku. Ojol kebal dan dapat 1 koin.</span></li>
    <li>${t('J')}<span><b>Penjara:</b> lewatkan 2 giliran, atau bayar uang jaminan ${C.penjara.bail} koin untuk langsung bebas (koin harus lebih dari ${C.penjara.bail}). Penguasa kebal hukum, hanya 1 giliran. Kartu Operasi Tangkap Tangan memenjarakan Penguasa 2 giliran.</span></li></ul>
    <h3>Aturan penting</h3><ul><li>Uang kurang? Kekurangannya dibayar Sabar (1 koin = 1 Sabar).</li><li>Sabar bisa pulih lewat Gotong Royong dan kartu Kabar tertentu.</li><li>Setelah tiap pemilu: harga turun 1 dan tiap warga dapat bansos ${C.kampanye.bansos} koin dari Kas (selama Kas ada).</li><li>Pajak Naik: Karyawan Tetap bayar lebih banyak, Pegawai Titipan bebas pajak.</li><li>Pegawai Titipan hanya bertahan selama Penguasanya berkuasa. Kursi lepas atau kena OTT, jabatannya hilang jadi Honorer.</li><li>Pemilu ${elections}: kursi pindah hanya kalau mayoritas memilih orang lain. Tidak boleh memilih diri sendiri. Kalau tinggal 2 pemain, suara pasti seri dan kursi pindah ke penantang.</li><li>Kartu Kabar yang berdampak pada Penguasa tetap bisa muncul di antara dua pilihan beritanya.</li></ul></div>
    <div class="cbtns"><button class="btn">Mengerti</button></div></div>`;
  document.body.appendChild(d);
}
window.G.help = showHelp; window.G.closeAlert = closeAlert;
// ================= BOOT =================
buildSky(); document.body.classList.toggle('is-hidden', document.hidden); q('#ov').onclick = e => { if (alertShow && e.currentTarget.classList.contains('alert')) closeAlert(); };
if (DEMO) {
  const mode = (location.search.match(/demo=(\w+)/) || [])[1], lobby = mode === 'lobby';
  const st = { phase: 'lobby', host: 0, players: ['Rina', 'Bayu', 'Sari', 'Dimas'].slice(0, lobby ? 3 : 4).map((n, i) => ({ id: i, name: n, ready: !lobby || i < 2 })), log: [], fxs: [] };
  me = { pid: 0 }; room = 'DEMO42'; if (!lobby) act(st, { t: 'start' }, 0);
  S = st; V = 1; onState(true);
  // alat uji desain: G.dbg.push(s => { ... }) mengubah state lalu menampilkannya seperti state dari server
  window.G.dbg = { S: () => S, push: fn => { const n = JSON.parse(JSON.stringify(S)); fn(n); apply({ version: V + 1, state: n }); }, fx: (e, t, d, x, w) => showAlert({ id: Math.random(), e, t, d, x, w }), FX };
} else {
  const url = C.supabase.url.trim(), key = C.supabase.key.trim();
  if (!url || url.includes('XXXX')) onlineIssue = 'Isi URL project Supabase di config.js dulu.';
  else if (!key || key.startsWith('ISI_')) onlineIssue = 'Isi anon/public key Supabase di config.js dulu.';
  else if (!window.supabase) onlineIssue = 'Library Supabase tidak termuat. Periksa koneksi internet atau CDN.';
  else {
    try { sb = window.supabase.createClient(url, key); }
    catch (e) { onlineIssue = `Konfigurasi Supabase tidak valid: ${e.message || e}`; }
  }
  try { const sv = JSON.parse(localStorage.getItem('sc') || 'null'); if (sv && sb) { saved = true; render(); enter(sv.code, sv.pid, sv.token); } } catch (e) {}
  render();
}
})();
