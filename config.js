// ===== ROTAN — konfigurasi & balancing. Semua angka, tile, pekerjaan, dan kartu ada di sini. =====
(typeof window !== 'undefined' ? window : globalThis).CFG = {
  supabase: { url: 'https://mvsttuzszganyfocoyvr.supabase.co', key: 'sb_publishable_WvzulfvL6STRCV26rh6mCQ_Bha0eaCR' },
  // rounds = batas ronde bawaan; host bisa mengubahnya di lobby (12/18/24/tanpa batas)
  rounds: 18, pemiluEvery: 6, skimEvery: 3, startCoin: 8, kasStart: 6, hargaMax: 4,
  orangPrice: 2,                        // harga Orang Dalam; dibayar ke Penguasa dan menambah jejak korupsinya
  penjara: { bail: 2 },                 // uang jaminan: pemain yang koinnya > bail boleh bebas dari Penjara tanpa lewat giliran
  gajiBonus: 2,                         // bonus bila BERHENTI tepat di Gajian (gaji pokok tidak berubah)
  lapor: { sabFail: 1, bounty: 2 },     // Kantor Pengaduan: pelapor gagal kehilangan Sabar; pelapor sukses dapat hadiah dari Kas
  kampanye: { harga: 1, bansos: 1 },    // setelah tiap pemilu: harga turun, tiap warga hidup dapat bansos dari Kas (selama Kas ada)
  sides: ['Pesisir', 'Kota', 'Bukit', 'Industri'],
  // G Gajian, A Kantor Pengaduan (pojok kiri bawah), L Lowongan, P Pasar, B Birokrasi, K Kabar Negara, X Bencana, R Gotong Royong, M Macet (pojok kanan atas), J Penjara (pojok kiri atas); 28 tile, 7 per area
  tiles: 'GPBKPXL APKBXRP JRKLXLB MKRBXKR',
  jobs: [
    { id: 'honorer', n: 'Honorer', sal: 2, late: 1, d: 'Dibayar telat, diberi ucapan terima kasih.' },
    { id: 'ojol', n: 'Ojol', sal: 3, cut: 1, macet: 1, d: "Bonusnya selalu 'sedikit lagi'." },
    { id: 'pkl', n: 'Pedagang Kaki Lima', sal: 2, pasar: 1, biro: 1, impor: 1, d: 'Berjualan di tempat terlarang, karena yang boleh sudah disewa orang dalam.' },
    { id: 'serabutan', n: 'Serabutan', sal: 1, even: 1, impor: 1, d: 'Hari ini kuli, besok tukang parkir, lusa pura-pura sibuk.' },
    { id: 'tetap', n: 'Karyawan Tetap', sal: 4, layak: 1, pajak: 1, d: 'Impian jutaan orang, diperebutkan dua ratus pelamar dan satu keponakan.' },
    { id: 'titipan', n: 'Pegawai Titipan', sal: 4, layak: 1, lock: 1, bebasPajak: 1, d: 'Kerjanya apa? Jangan tanya. Gajinya tetap.' }
  ],
  jobDeck: ['honorer', 'honorer', 'ojol', 'ojol', 'pkl', 'pkl', 'serabutan', 'serabutan', 'tetap', 'tetap'],
  cards: {
    kabar: [ // w = daya tarik bagi Penguasa saat memilih 1 dari 2 kartu
      { id: 'k1', t: 'Proyek Jalan Mulus', w: 3, fx: [['kas2pg', 1]], d: 'Jalan tol dibangun tiga kali di titik yang sama. Anggarannya mulus, jalannya tidak.' },
      { id: 'k2', t: 'Subsidi Dicabut', w: 1, fx: [['harga', 1]], d: 'Demi efisiensi, katanya. Efisiensi siapa, jangan ditanya.' },
      { id: 'k3', t: 'Pajak Naik', w: 2, fx: [['taxAll', 1]], d: 'Pajak untuk pembangunan. Pembangunan rumah pejabat, tentu saja.' },
      { id: 'k4', t: 'Anak Penguasa Dilantik', w: 1, fx: [['anak']], d: 'Kebetulan, tidak ada hubungannya dengan nama belakang. Kebetulan yang sangat konsisten.' },
      { id: 'k5', t: 'Dana Bansos', w: 1, fx: [['bansos']], d: 'Sampai ke tangan rakyat setelah melewati tujuh meja, empat map, dan satu koper.' },
      { id: 'k6', t: 'Anggaran Raib', w: 0, fx: [['kasHalf']], d: 'Auditornya ikut hilang. Kebetulan sekali.' },
      { id: 'k7', t: 'Festival Rakyat', w: 1, fx: [['sabAll', 1], ['kas', -1]], d: 'Hiburan gratis untuk rakyat. Perut tetap lapar, tapi panggungnya megah.' },
      { id: 'k8', t: 'Viral di Medsos', w: 0, fx: [['sabAllBut', 1]], d: 'Pemerintah minta maaf, lalu lupa tiga hari kemudian. Yang marah juga.' },
      { id: 'k9', t: 'Impor Besar-besaran', w: 1, fx: [['harga', -1], ['impor']], d: 'Harga murah. Petani lokal tidak diundang ke pesta ini.' },
      { id: 'k10', t: 'Reshuffle', w: 1, fx: [['reshuffle']], d: 'Orangnya diganti, masalahnya tetap sama. Seperti biasa.' },
      { id: 'k11', t: 'Studi Banding', w: 2, fx: [['kas', -3], ['sabPg', 1]], d: 'Studi banding ke luar negeri membahas cara membangun toilet umum. Hasilnya: foto yang bagus.' },
      { id: 'k13', t: 'Operasi Tangkap Tangan', w: 0, fx: [['ott']], d: 'Barang bukti: satu koper, dua amplop, dan satu alasan "itu uang arisan".' },
      { id: 'k14', t: 'Demo Besar-besaran', w: 0, fx: [['demo']], d: 'Tuntutan dibacakan. Jawabannya: akan dikaji, dibahas, dan dilupakan.' },
      { id: 'k12', t: 'Tunjangan Naik', w: 3, fx: [['kas2pg', 1], ['harga', 1]], d: 'Tunjangan beras naik. Berasnya yang tidak.' }
    ],
    bencana: [ // fx: coin/sab = kerugian warga di area, harga = kenaikan harga, skip = lewat 1 giliran
      { id: 'b1', e: '🌊', t: 'Banjir', fx: { coin: 2 }, d: 'Banjir langganan tiap tahun. Gorong-gorongnya sudah dianggarkan, mengalirnya ke mana belum dipastikan.' },
      { id: 'b2', e: '🌍', t: 'Gempa', fx: { sab: 1 }, d: 'Sekolah runtuh duluan, gedung dewan tetap kokoh. Materialnya beda, katanya.' },
      { id: 'b3', e: '🔥', t: 'Kebakaran Hutan', fx: { sab: 1, harga: 1 }, d: 'Asapnya sampai ke negara tetangga. Tanggung jawabnya belum sampai ke siapa-siapa.' },
      { id: 'b4', e: '⛰️', t: 'Longsor', fx: { coin: 2 }, d: 'Sudah dilaporkan dua kali. Laporannya aman, ada di laci.' },
      { id: 'b5', e: '🌋', t: 'Gunung Meletus', fx: { coin: 1, sab: 1 }, d: 'Tanda-tandanya sudah ada sebulan lalu. Alat peringatan dininya sudah dianggarkan, belum dibeli.' },
      { id: 'b6', e: '🌪️', t: 'Puting Beliung', fx: { coin: 1 }, d: 'Atap rumah rakyat terbang. Atap baliho wajah penguasa tetap terpasang.' },
      { id: 'b7', e: '☀️', t: 'Kekeringan', fx: { coin: 1, harga: 1 }, d: 'Sawah kering, tapi hujan janji turun deras.' },
      { id: 'b8', e: '🌫️', t: 'Kabut Asap', fx: { sab: 1, skip: 1 }, d: 'Sekolah diliburkan, kantor dibuka, napas dipersilakan cari sendiri.' }
    ],
    biro: [ // pay = pelicin; else = akibat bila menolak; force = tidak bisa ditolak; die = lempar dadu >= n untuk lolos
      { id: 'r1', t: 'Urus KTP', pay: 1, else: { sab: 1 }, d: "Gratis, katanya. Tapi ada 'uang rokok'." },
      { id: 'r2', t: 'Izin Usaha', pay: 2, else: { skip: 1 }, d: 'Prosesnya tiga hari. Kalau tanpa pelicin, tiga bulan.' },
      { id: 'r3', t: 'Tilang Dadakan', pay: 1, else: { die: 5 }, d: 'Damai saja, Pak. Damai itu indah, apalagi yang tunai.' },
      { id: 'r4', t: 'Antre Layanan Kesehatan', pay: 1, else: { sab: 1 }, d: 'Sakit boleh, asal bawa fotokopi dan kesabaran.' },
      { id: 'r5', t: 'Syarat Tambahan', pay: 1, force: 1, extra: 2, d: 'Berkasnya kurang satu. Yang kurang selalu yang tidak disebut.' },
      { id: 'r6', t: 'Pungli Parkir', pay: 1, force: 1, d: 'Yang jaga tidak punya seragam, tapi punya wibawa.' }
    ]
  }
};
