# Rotan — Dicambuk Terus, Tetap Harus Berdiri
Game papan online (2–4 pemain) tentang rakyat yang bertahan hidup di negeri korup. Aturan lengkap: dokumen "Rotan — Buku Aturan dan Kartu".

## File
- `index.html`, `style.css`: halaman & seluruh tampilan (warna dan font di variabel `:root`).
- `config.js`: tile, pekerjaan, 34 kartu, angka balancing. Kunci Supabase juga di sini.
- `engine.js`: mesin aturan murni (`act(state, aksi, idPemain)`). `game.js`: jaringan Supabase + tampilan + animasi.
- `schema.sql`: database dan fungsi RPC Supabase. `sim.js`: `node sim.js 3000 4` mensimulasikan 3000 game acak.

## Menjalankan
1. Isi `config.js` (URL & anon key Supabase), jalankan `schema.sql` di Supabase, upload semua file ke GitHub Pages.
2. Demo tanpa server tersedia dari tombol **Main demo melawan bot** di halaman awal, termasuk pada situs yang sudah dipublikasikan. URL `index.html?demo` juga bisa dibuka langsung (kamu melawan 3 bot).

## Catatan
- **Update server:** jalankan ulang seluruh `schema.sql` di SQL Editor Supabase setelah pembaruan skema. Skrip sekarang aman dijalankan ulang untuk Realtime dan membatasi state RPC yang tidak valid. Jangan gunakan service-role key di browser; `config.js` hanya boleh berisi anon/publishable key. Validasi RPC membatasi manipulasi struktur/state, tetapi arsitektur game masih menghitung aturan di browser sehingga bukan perlindungan anti-cheat penuh.
- Keluar saat lobby menghapus pemain dari slot dan mengalihkan host bila perlu. Saat game berlangsung, slot tetap ada agar urutan pemain tidak berubah; bila tidak ada aksi selama 60 detik, giliran lempar dadu dilewati dan pilihan yang sedang menunggu diproses otomatis oleh salah satu klien tersambung. Pemain yang kembali dapat melanjutkan pada giliran berikutnya.
- Realtime menjadi jalur utama sinkronisasi. Polling pembaruan room hanya aktif sebagai fallback saat channel Realtime belum tersambung, dengan interval 15 detik.
- Pemilu serentak: tiap pemilih memberi suara sendiri. Suara disembunyikan di tampilan, tapi tetap tersimpan di state.
- Tile Kabar: pemain selain Penguasa mendapat satu berita acak yang langsung berlaku; Penguasa selalu memilih satu dari dua berita, termasuk kartu yang berdampak langsung padanya.
- Tile Bencana: korban menerima dampak bencana; tidak ada bantuan koin dari Kas Negara.
- Tile Pengaduan (pojok kiri bawah): pemain boleh melaporkan Penguasa. Berhasil bila dadu ≤ jejak korupsi Penguasa (🧾, bertambah tiap Penguasa mengambil koin dari Kas): Penguasa masuk Penjara dan pelapor dapat hadiah dari Kas. Gagal: pelapor kehilangan Sabar. Angka di `CFG.lapor`.
- Pelicin Birokrasi dan harga Orang Dalam dibayar ke kantong Penguasa (bukan Kas) dan menambah jejak korupsinya 🧾, jadi laporan di Kantor Pengaduan makin mungkin berhasil. Bila yang membayar adalah Penguasa sendiri, uangnya masuk Kas. Orang Dalam kini bisa dibeli di tile Lowongan maupun Birokrasi (`CFG.orangPrice`).
- Pekerjaan layak (Karyawan Tetap, Pegawai Titipan) lolos dengan dadu 5–6 atau Orang Dalam; hasil lamaran sekarang tampil sebagai notifikasi dengan angka dadunya.
- Pajak Naik: Karyawan Tetap bayar 1 koin lebih banyak, Pegawai Titipan bebas pajak (`pajak` dan `bebasPajak` di `CFG.jobs`).
- Penjara: pemain dengan koin > `CFG.penjara.bail` boleh bayar uang jaminan dan langsung bebas. OTT dan Laporkan tetap memenjarakan tanpa pilihan jaminan.
- Tile Macet: pemain memilih bayar 1 koin ke Kas, atau rute dialihkan ke tile acak (bukan Gajian, Penjara, Macet) dengan efek tile tujuan langsung berlaku. Ojol kebal dan dapat 1 koin. Tidak ada lagi efek lewat giliran dari tile ini; lewat giliran hanya dari Penjara, Kabut Asap, Izin Usaha, dan OTT.
- Bonus Gajian: berhenti tepat di tile Gajian memberi bonus tambahan (`CFG.gajiBonus`); gaji pokok pekerjaan tidak berubah.
- Pegawai Titipan terikat pada Penguasa yang mengangkatnya: kursi lepas (pemilu) atau kena OTT, jabatannya hilang dan jadi Honorer. Selama Penguasa berkuasa tetap kebal Reshuffle dan tidak bisa diganti lewat Lowongan.
- Setelah tiap pemilu: harga turun dan bansos dibagi dari Kas (`CFG.kampanye`).
- Simulasi pemain acak (`node sim.js 3000 4 18`): Penguasa awal menang ~28% di 4 pemain (netral 25%), 37% di 3 pemain (netral 33%), ~56% di 2 pemain. Perlu diuji main sungguhan.

- Efek bencana: tiap bencana punya adegan layar sendiri (api, air naik, retakan, longsor, letusan, angin puyuh, tanah kering, kabut). Lihat `disasterFx` di `game.js` dan bagian ADEGAN BENCANA di `style.css`.
- Pemilu 2 pemain: tiap orang hanya bisa memilih lawan, jadi suara selalu seri 1-1. Aturan: seri → kursi pindah ke penantang (artinya kursi bergantian tiap pemilu). Berlaku juga kalau 3–4 pemain tinggal 2 yang hidup.
