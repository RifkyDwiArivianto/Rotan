// ===== ROTAN — mesin aturan (fungsi murni: act(state, aksi, idPemain) -> state baru | null) =====
(function (g) {
const C = g.CFG, R = n => Math.floor(Math.random() * n), die = () => 1 + R(6);
const sh = a => { a = a.slice(); for (let i = a.length; i > 1;) { const j = R(i--); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const T = C.tiles.replace(/ /g, '').split(''), side = i => Math.floor(i / 7), J = id => C.jobs.find(j => j.id === id);
const TN = { G: 'Gajian', A: 'Pengaduan', L: 'Lowongan', P: 'Pasar', B: 'Birokrasi', K: 'Kabar', X: 'Bencana', R: 'Gotong Royong', M: 'Macet', J: 'Penjara' };
const L = (s, m) => { s.log.push(m); if (s.log.length > 40) s.log.shift(); };
const fl = (s, pid, amt) => { if (amt) s.fxs.push({ id: Math.random(), pid, amt }); };
const al = (s, e, t, d, x, w) => { s.alert = { id: Math.random(), e, t, d, x, w }; };
const alive = s => s.players.filter(p => !p.gone), pg = s => s.players[s.penguasa];
const draw = (s, k) => { const d = s.deck; if (!d[k].length) d[k] = sh(C.cards[k].map(c => c.id)); const id = d[k].pop(); return C.cards[k].find(c => c.id === id); };
const djob = s => { if (!s.deck.job.length) s.deck.job = sh(C.jobDeck); return s.deck.job.pop(); };
const gain = (s, p, n) => { p.coin += n; fl(s, p.id, n); };
function hurt(s, p, n) { p.sab = Math.max(0, p.sab - n); if (p.sab <= 0) quit(s, p); }
function pay(s, p, n, to) {
  n = Math.max(0, n); const c = Math.min(p.coin, n); p.coin -= c; fl(s, p.id, -c); if (to === 'kas') s.kas += c;
  else if (to === 'pg') { const g = pg(s); if (!g || g.gone || g.id === p.id) s.kas += c; else { g.coin += c; fl(s, g.id, c); g.korup = (g.korup || 0) + c; } } // pelicin & Orang Dalam: ke kantong Penguasa, jejak korupsinya naik
  const m = n - c; if (m) { L(s, `${p.name} ngutang ke tetangga, Sabar berkurang ${m}`); hurt(s, p, m); }
}
// Pegawai Titipan hanya bertahan selama patronnya (Penguasa) berkuasa: kursi lepas atau kena OTT -> kembali jadi Honorer
function fall(s, p) { if (p && !p.gone && p.job === 'titipan') { p.job = 'honorer'; L(s, `${p.name} kehilangan jabatan Titipan, patronnya jatuh`); } }
function setPg(s, id) { const old = pg(s); s.penguasa = id; if (old && old.id !== id) fall(s, old); }
function quit(s, p) {
  if (p.gone) return; p.gone = true; s.kas += p.coin; p.coin = 0; L(s, `🧳 ${p.name} merantau`); al(s, '🧳', 'Merantau', p.name + ' menyerah dan pergi');
  if (s.penguasa === p.id) { const a = alive(s); if (a.length) s.penguasa = a[0].id; }
}
function gaji(s, p) {
  const j = J(p.job); let n = j.sal;
  if (j.late && die() === 1) { L(s, `${p.name}: gaji telat`); return; }
  if (j.even && die() % 2 === 0) n++;
  gain(s, p, n); L(s, `🏁 ${p.name} gajian +${n}`); if (j.cut) pay(s, p, j.cut, 'kas');
}
const ops = {
  kas: (s, n) => { s.kas = Math.max(0, s.kas + n); },
  harga: (s, n) => { s.harga = Math.min(C.hargaMax, Math.max(1, s.harga + n)); },
  kas2pg: (s, n) => { const m = Math.min(n, s.kas); s.kas -= m; gain(s, pg(s), m); pg(s).korup = (pg(s).korup || 0) + m; },
  ott: s => { const p = pg(s), m = Math.min(p.korup || 0, p.coin); p.coin -= m; fl(s, p.id, -m); s.kas += m; p.korup = 0; p.skip = 2; p.pos = 14; s.teleported = p.id; L(s, `🔒 ${p.name} dijebloskan ke Penjara`); fall(s, p); hurt(s, p, 1); },
  demo: s => { const p = pg(s); pay(s, p, 1, 'kas'); hurt(s, p, 1); },
  taxAll: (s, n) => alive(s).forEach(p => { const j = J(p.job); pay(s, p, j.bebasPajak ? 0 : n + (j.pajak || 0), 'kas'); }),
  kasHalf: s => { s.kas = Math.floor(s.kas / 2); },
  bansos: s => { [s.penguasa, ...alive(s).map(p => p.id).filter(i => i !== s.penguasa)].forEach(i => { if (s.kas > 0 && !s.players[i].gone) { s.kas--; gain(s, s.players[i], 1); } }); },
  sabAll: (s, n) => alive(s).forEach(p => { p.sab = Math.min(3, p.sab + n); }),
  sabAllBut: (s, n) => alive(s).forEach(p => { if (p.id !== s.penguasa) p.sab = Math.min(3, p.sab + n); }),
  sabPg: (s, n) => { const p = pg(s); p.sab = Math.min(3, p.sab + n); },
  anak: s => { pg(s).job = 'titipan'; },
  impor: s => alive(s).forEach(p => { if (J(p.job).impor) pay(s, p, 1); }),
  reshuffle: s => { const a = alive(s).filter(p => !J(p.job).lock), j = a.map(p => p.job); a.forEach((p, i) => { p.job = j[(i + 1) % a.length]; }); }
};
const KX = { kas2pg: n => `Penguasa ambil ${n} koin dari Kas`, taxAll: n => `Semua bayar ${n} koin ke Kas (Karyawan Tetap ${n + 1}, Pegawai Titipan bebas)`, harga: n => n > 0 ? `Harga naik +${n}` : `Harga turun ${n}`, kas: n => `Kas Negara ${n > 0 ? '+' : ''}${n}`, kasHalf: () => 'Kas Negara dipotong setengah', bansos: () => 'Semua ambil 1 koin dari Kas (Penguasa duluan)', sabAll: n => `Semua +${n} Sabar`, sabAllBut: n => `Semua kecuali Penguasa +${n} Sabar`, sabPg: n => `Penguasa +${n} Sabar`, anak: () => 'Penguasa jadi Pegawai Titipan', impor: () => 'Pedagang Kaki Lima dan Serabutan −1 koin', reshuffle: () => 'Pekerjaan semua pemain berputar', ott: () => 'Penguasa masuk Penjara: koin hasil korupsi kembali ke Kas, −1 Sabar, lewat 2 giliran', demo: () => 'Penguasa bayar 1 koin ke Kas dan −1 Sabar' };
const fxKabar = c => c.fx.length ? c.fx.map(f => KX[f[0]](f[1])) : ['Tidak ada efek'];
const fxBencana = f => [f.coin && `−${f.coin} koin`, f.sab && `−${f.sab} Sabar`, f.skip && 'Lewati 1 giliran', f.harga && `Harga naik +${f.harga}`].filter(Boolean);
function kabar(s, p) {
  if (p.id !== s.penguasa) { applyKabar(s, draw(s, 'kabar').id); return; }
  const a = [draw(s, 'kabar'), draw(s, 'kabar')];
  s.pend = { t: 'kabar', by: p.id, c: [a[0].id, a[1].id] };
}
function applyKabar(s, id) { const c = C.cards.kabar.find(k => k.id === id); al(s, '📰', c.t, c.d, fxKabar(c)); L(s, `📰 ${c.t}`); c.fx.forEach(f => ops[f[0]](s, f[1])); }
function bencana(s, p) {
  const c = draw(s, 'bencana'), a = side(p.pos), v = alive(s).filter(x => side(x.pos) === a), f = c.fx;
  s.disaster = c.e;
  al(s, c.e, c.t, c.d, fxBencana(f), `Area ${C.sides[a]}: ${v.length} warga terdampak`); L(s, `${c.e} ${c.t} di ${C.sides[a]}`);
  v.forEach(x => { if (f.coin) pay(s, x, f.coin); if (f.sab) hurt(s, x, f.sab); if (f.skip) x.skip = 1; });
  if (f.harga) ops.harga(s, f.harga);
}
function sentence(s, p) { p.skip = p.id === s.penguasa ? 1 : 2; L(s, p.id === s.penguasa ? `🔒 ${p.name} masuk Penjara (Penguasa kebal hukum: 1 giliran)` : `🔒 ${p.name} masuk Penjara`); }
function resolve(s, p) {
  const t = T[p.pos]; s.pend = null;
  if (t === 'G') { const b = C.gajiBonus || 0; if (b) { gain(s, p, b); L(s, `🎯 ${p.name} berhenti tepat di Gajian, bonus +${b}`); al(s, '🎯', 'Tepat Sasaran', 'Berhenti persis di Gajian. Amplopnya sedikit lebih tebal, kali ini.', [`Bonus +${b} koin`]); } }
  else if (t === 'A') { if (p.id === s.penguasa) L(s, `${p.name} lewat Kantor Pengaduan dengan santai`); else s.pend = { t: 'lapor' }; }
  else if (t === 'P') pay(s, p, s.harga - (J(p.job).pasar || 0));
  else if (t === 'B') {
    const c = draw(s, 'biro'), extra = J(p.job).biro || 0;
    if (c.force) { pay(s, p, c.pay + extra, 'pg'); if (c.extra && die() <= c.extra) pay(s, p, 1, 'pg'); L(s, `📄 ${c.t}`); }
    else s.pend = { t: 'biro', id: c.id };
  }
  else if (t === 'K') kabar(s, p);
  else if (t === 'X') bencana(s, p);
  else if (t === 'L' && !J(p.job).lock) s.pend = { t: 'job', c: [djob(s), djob(s)] };
  else if (t === 'R') s.pend = { t: 'gr' };
  else if (t === 'J') { if (p.coin > C.penjara.bail) s.pend = { t: 'jail' }; else sentence(s, p); }
  else if (t === 'M') { if (J(p.job).macet) gain(s, p, 1); else s.pend = { t: 'macet' }; }
}
function over(s) {
  s.phase = 'over'; const A = alive(s), lay = A.filter(p => J(p.job).layak), pool = (lay.length ? lay : A).slice();
  pool.sort((a, b) => b.coin - a.coin || b.sab - a.sab || (b.id === s.penguasa) - (a.id === s.penguasa));
  const w = pool[0]; s.winner = w ? w.id : null;
  s.ending = !w ? 'none' : w.id === s.penguasa ? 'dinasti' : J(w.job).layak ? 'layak' : 'bertahan'; L(s, '🏆 Permainan selesai'); return s;
}
// Janji kampanye dicairkan setelah pemilu: harga turun, bansos dibagi dari Kas (Penguasa duluan)
function kampanye(s) {
  const k = C.kampanye, x = []; if (!k) return x;
  if (k.harga && s.harga > 1) { const b = s.harga; ops.harga(s, -k.harga); if (s.harga < b) x.push(`Harga turun −${b - s.harga}`); }
  let n = 0; if (k.bansos) [s.penguasa, ...alive(s).map(p => p.id).filter(i => i !== s.penguasa)].forEach(i => { const q = s.players[i]; if (!q.gone && s.kas >= k.bansos) { s.kas -= k.bansos; gain(s, q, k.bansos); n++; } });
  if (n) x.push(`Bansos kampanye: ${n} warga +${k.bansos} koin dari Kas`);
  if (x.length) L(s, `🎁 Pasca-pemilu: ${x.join(', ')}`);
  return x;
}
function tally(s) {
  const n = {}; Object.values(s.votes).forEach(v => { n[v] = (n[v] || 0) + 1; });
  const top = Object.keys(n).sort((a, b) => n[b] - n[a])[0], hidup = alive(s), chal = hidup.length === 2 && hidup.find(x => x.id !== s.penguasa);
  if (chal) { setPg(s, chal.id); L(s, `🗳️ Suara seri, kursi pindah ke penantang: ${chal.name}`); al(s, '🗳️', 'Pemilu', 'Suara seri. Berdua, penantang yang naik.'); }   // 2 pemain: tiap orang hanya bisa memilih lawan, jadi selalu seri 1-1 → kursi ke penantang
  else if (top != null && +top !== s.penguasa && n[top] > alive(s).length / 2) { setPg(s, +top); L(s, `🗳️ Kursi pindah ke ${s.players[+top].name}`); al(s, '🗳️', 'Pemilu', 'Kursi berpindah tangan'); }
  else { L(s, '🗳️ Pemilu: penguasa lama tetap berkuasa'); al(s, '🗳️', 'Pemilu', 'Dinasti berlanjut. Seperti biasa.'); }
  const kx = kampanye(s); if (s.alert && kx.length) s.alert.x = kx;
  s.votes = null; s.pend = null; s.turn = s.players.findIndex(p => !p.gone); s.stage = 'roll';
  const first = s.players[s.turn];
  if (first.skip) { first.skip--; L(s, `${first.name} melewatkan giliran`); return next(s); }
}
function next(s) {
  if (alive(s).length < 2) return over(s);
  let i = s.turn, w = false; do { i = (i + 1) % s.players.length; if (i === 0) w = true; } while (s.players[i].gone);
  if (w) { s.round++; if (s.rounds && s.round > s.rounds) return over(s); }
  s.turn = i; s.stage = 'roll'; s.pend = null;
  if (w && (s.round - 1) % C.pemiluEvery === 0) { s.stage = 'vote'; s.votes = {}; s.pend = { t: 'vote' }; s.turn = s.players.findIndex(p => !p.gone); return s; }
  if (i === s.penguasa && s.kas > 0 && s.round % C.skimEvery === 0) { s.kas--; gain(s, s.players[i], 1); s.players[i].korup = (s.players[i].korup || 0) + 1; L(s, `${s.players[i].name} ambil biaya operasional`); }
  if (s.players[i].skip) { s.players[i].skip--; L(s, `${s.players[i].name} melewatkan giliran`); return next(s); }
  return s;
}
const fin = s => s.phase === 'over' ? s : s.pend ? (s.stage = 'pend', s) : next(s);
function start(s) {
  Object.assign(s, { phase: 'play', turn: 0, round: 1, stage: 'roll', kas: C.kasStart, harga: 1, pend: null, votes: null, winner: null, ending: null, dice: null, disaster: null,
    rounds: s.rounds === undefined ? C.rounds : s.rounds, deck: { kabar: [], bencana: [], biro: [], curhat: [], job: sh(C.jobDeck) }, log: ['Game dimulai!'], penguasa: R(s.players.length) });
  s.players.forEach(p => Object.assign(p, { coin: C.startCoin, sab: 3, job: pk(['honorer', 'ojol', 'pkl', 'serabutan']), pos: 0, orang: 0, skip: 0, korup: 0, cur: -9, gone: false }));
}
const pk = a => a[R(a.length)];
function act(s, a, pid) {
  const P = s.players, p = P[pid]; if (!p) return null; s.fxs = [];
  if (s.phase === 'lobby') {
    if (a.t === 'ready') { p.ready = !p.ready; return s; }
    if (a.t === 'rounds' && pid === s.host && [0, 12, 18, 24].includes(a.n)) { s.rounds = a.n; return s; }
    if (a.t === 'start' && pid === s.host && P.length > 1 && P.every(x => x.ready)) { start(s); return s; }
    return null;
  }
  if (s.phase === 'over') { if (a.t === 'again' && pid === s.host) { s.phase = 'lobby'; s.winner = null; P.forEach(x => { x.ready = false; x.gone = false; }); return s; } return null; }
  s.teleported = null;
  const pd0 = s.pend, ok = s.stage === 'vote' ? (!p.gone && s.votes[pid] === undefined) : (pd0 && pd0.t === 'kabar') ? pid === pd0.by : (s.turn === pid && !p.gone);
  if (!ok) return null;
  const st = s.stage, pd = s.pend;
  if (st === 'roll') {
    if (a.t === 'timeout') { L(s, `⏭️ Giliran ${p.name} dilewati karena tidak merespons`); return fin(s); }
    if (a.t === 'roll') {
      const d = die(); s.dice = [d]; s.rid = Math.random(); L(s, `🎲 ${p.name} melempar ${d}`);
      for (let k = 0; k < d; k++) { p.pos = (p.pos + 1) % 28; if (p.pos === 0) gaji(s, p); }
      if (!p.gone) resolve(s, p); return fin(s);
    }
    return null;
  }
  if (!pd) return null;
  if (st === 'vote' && a.t === 'vote') {
    if (!P[a.for] || P[a.for].gone || a.for === pid) return null; s.votes[pid] = a.for;
    if (alive(s).every(x => s.votes[x.id] !== undefined)) tally(s); return s;
  }
  if (st !== 'pend') return null;
  if (pd.t === 'kabar' && a.t === 'kabar') { s.pend = null; applyKabar(s, pd.c[a.i === 1 ? 1 : 0]); return fin(s); }
  if (pd.t === 'job' && a.t === 'buy') { if (p.coin < C.orangPrice) return null; pay(s, p, C.orangPrice, 'pg'); p.orang++; L(s, `🕴️ ${p.name} membeli Orang Dalam`); return s; }
  if (pd.t === 'job' && a.t === 'job') {
    const [x, y] = pd.c, pick = a.i === 0 ? x : a.i === 1 ? y : null; s.pend = null;
    if (pick) {
      const j = J(pick); let ok = true, dd = 0, how = '';
      if (j.layak) { dd = die(); if (dd >= 5) how = `dadu ${dd}`; else if (p.orang > 0) { p.orang--; how = `dadu ${dd}, pakai Orang Dalam`; L(s, `${p.name} pakai Orang Dalam`); } else ok = false; }
      if (ok) { s.deck.job.unshift(p.job); p.job = pick; L(s, `💼 ${p.name} jadi ${j.n}`); if (j.layak) al(s, '💼', 'Lamaran Diterima', `${j.n}: ${how}. Impian jutaan orang, kali ini jatuh ke tanganmu.`, [`Pekerjaan baru: ${j.n}`]); }
      else { s.deck.job.unshift(pick); L(s, `${p.name} ditolak: ${j.n} butuh dadu 5–6 atau Orang Dalam (dadu ${dd})`); al(s, '🚪', 'Lamaran Ditolak', `Dadu ${dd}. ${j.n} butuh dadu 5–6 atau Orang Dalam. Berkasmu lengkap, koneksimu yang kurang.`, [`Tetap ${J(p.job).n}`, 'Beli Orang Dalam di tile Lowongan atau Birokrasi']); }
      s.deck.job.unshift(pick === x ? y : x);
    } else s.deck.job.unshift(x, y);
    return fin(s);
  }
  if (pd.t === 'jail' && a.t === 'jail') {
    s.pend = null; const bail = C.penjara.bail;
    if (a.pay && p.coin > bail) { pay(s, p, bail, 'kas'); L(s, `💸 ${p.name} bayar uang jaminan ${bail} koin, bebas`); al(s, '💸', 'Uang Jaminan', 'Hukum itu adil: yang punya uang bebas duluan, yang tidak punya menunggu giliran.', [`${p.name} −${bail} koin`, 'Tidak lewat giliran']); }
    else sentence(s, p);
    return fin(s);
  }
  if (pd.t === 'macet' && a.t === 'macet') {
    s.pend = null;
    if (a.pay && p.coin >= 1) { pay(s, p, 1, 'kas'); L(s, `🚗 ${p.name} bayar jalan tikus 1 koin`); return fin(s); }
    // rute dialihkan: tile acak (bukan Gajian, Penjara, Macet); efek tile tujuan langsung berlaku
    const cand = T.map((_, i) => i).filter(i => !'MJG'.includes(T[i]) && i !== p.pos), to = cand[R(cand.length)];
    p.pos = to; s.teleported = p.id; L(s, `🧭 Rute ${p.name} dialihkan ke ${TN[T[to]]}`);
    al(s, '🧭', 'Rute Dialihkan', `Aplikasi peta berkata "belok kanan". Kamu belok kanan, lalu sampai di ${TN[T[to]]}.`, [`Pindah ke tile ${TN[T[to]]}`]);
    const mine = s.alert; resolve(s, p);
    if (s.alert && s.alert !== mine) s.alert.d = `Rute dialihkan ke ${TN[T[to]]}. ` + s.alert.d;
    return fin(s);
  }
  if (pd.t === 'lapor' && a.t === 'lapor') {
    s.pend = null; if (!a.go) { L(s, `${p.name} urung melapor`); return fin(s); }
    const g = pg(s), k = g.korup || 0, d = die(), cf = C.lapor;
    if (d <= k) {
      const b = Math.min(cf.bounty, s.kas); s.kas -= b; if (b) gain(s, p, b); ops.ott(s);
      L(s, `📣 Laporan ${p.name} diterima (dadu ${d} ≤ korupsi ${k})`);
      al(s, '🔒', 'Laporan Diterima', `Dadu ${d}, bukti korupsi ${k}. Penguasa ${g.name} diciduk. Sebuah kebetulan yang langka.`, [`${g.name} masuk Penjara`, ...(b ? [`Hadiah pelapor +${b} koin`] : [])]);
    } else {
      hurt(s, p, cf.sabFail);
      L(s, `📣 Laporan ${p.name} ditolak (dadu ${d} > korupsi ${k})`);
      al(s, '📣', 'Laporan Ditolak', `Dadu ${d}, bukti korupsi ${k}. Berkas hilang, pelapor malah dipanggil untuk klarifikasi.`, [`${p.name} −${cf.sabFail} Sabar`]);
    }
    return fin(s);
  }
  if (pd.t === 'gr' && a.t === 'gr') {
    s.pend = null; const q = P[a.to]; if (q && !q.gone && q.id !== pid && p.coin >= 1) { pay(s, p, 1); gain(s, q, 1); p.sab = Math.min(3, p.sab + 1); L(s, `🤝 ${p.name} membantu ${q.name}`); } return fin(s);
  }
  if (pd.t === 'biro') {
    if (a.t === 'buy' && p.coin >= C.orangPrice) { pay(s, p, C.orangPrice, 'pg'); p.orang++; return s; }
    const c = C.cards.biro.find(k => k.id === pd.id), cost = c.pay + (J(p.job).biro || 0);
    if (a.t === 'orang' && p.orang > 0) { p.orang--; s.pend = null; return fin(s); }
    if (a.t !== 'biro') return null; s.pend = null;
    if (a.pay) pay(s, p, cost, 'pg');
    else if (c.else.sab) hurt(s, p, c.else.sab); else if (c.else.skip) p.skip = 1;
    else if (c.else.die && die() < c.else.die) pay(s, p, cost, 'pg');
    return fin(s);
  }
  return null;
}
g.Engine = { act, start, T, side, J, alive, fx: { kabar: fxKabar, bencana: fxBencana } };
})(typeof window !== 'undefined' ? window : globalThis);
