globalThis.window = undefined; require('./config.js'); require('./engine.js');
const { act, T } = Engine, C = CFG; const N = +process.argv[2] || 2000, NP = +process.argv[3] || 4;
const st = { rounds: [], gone: [], end: {}, winners: {}, coins: [], pw: 0 }; let crash = 0;
for (let g = 0; g < N; g++) {
  const s = { phase: 'lobby', host: 0, players: Array.from({ length: NP }, (_, i) => ({ id: i, name: 'P' + i, ready: true })), log: [], fxs: [] };
  if (process.argv[4] !== undefined) act(s, { t: 'rounds', n: +process.argv[4] }, 0); act(s, { t: 'start' }, 0); let n = 0;
  try { while (s.phase === 'play' && n++ < 5000) {
    const p = s.players[s.turn], A = Engine.alive(s); let a;
    if (s.stage === 'vote') { A.forEach(x => { const o = A.filter(y => y.id !== x.id); act(s, { t: 'vote', for: o[Math.floor(Math.random() * o.length)].id }, x.id); }); continue; }
    if (s.pend && s.pend.t === 'kabar') { const w = s.pend.c.map(id => C.cards.kabar.find(k => k.id === id).w); if (!act(s, { t: 'kabar', i: w[1] > w[0] ? 1 : 0 }, s.pend.by)) throw new Error('kabar ditolak'); continue; }
    if (s.stage === 'roll') a = { t: 'roll' };
    else if (s.stage === 'vote') a = { t: 'vote', for: A[Math.floor(Math.random() * A.length)].id };
    else if (s.pend.t === 'job') a = { t: 'job', i: Math.floor(Math.random() * 3) - 1 };
    else if (s.pend.t === 'gr') a = { t: 'gr', to: (p.id + 1) % NP };
    else if (s.pend.t === 'jail') a = { t: 'jail', pay: p.coin >= 5 };
    else if (s.pend.t === 'macet') a = { t: 'macet', pay: p.coin >= 3 };
    else if (s.pend.t === 'lapor') a = { t: 'lapor', go: (s.players[s.penguasa].korup || 0) >= 3 && p.sab > 1 };
    else a = { t: 'biro', pay: p.coin > 1 && Math.random() < .7 };
    if (!act(s, a, s.turn)) { if (s.pend && s.pend.t === 'gr') act(s, { t: 'gr', to: -1 }, s.turn); else throw new Error('aksi ditolak ' + JSON.stringify(a) + ' stage ' + s.stage); }
  } } catch (e) { crash++; if (crash < 3) console.log('CRASH', e.message); continue; }
  st.rounds.push(s.round); st.gone.push(NP - Engine.alive(s).length); st.end[s.ending] = (st.end[s.ending] || 0) + 1; if (s.winner === s.penguasa) st.pw++;
  Engine.alive(s).forEach(p => st.coins.push(p.coin));
}
const av = a => (a.reduce((x, y) => x + y, 0) / (a.length || 1)).toFixed(2);
console.log({ games: N, crash, avgRonde: av(st.rounds), avgMerantau: av(st.gone), endings: st.end, penguasaMenang: (st.pw / N * 100).toFixed(0) + '%', avgKoinHidup: av(st.coins) });
