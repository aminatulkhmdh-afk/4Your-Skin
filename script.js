/* ============================================================
   4Your Skin: script.js
   Semua data pengunjung tersimpan di browser (localStorage), tanpa backend.

   CARA MENGGANTI GAMBAR DENGAN FOTO ASLI:
   1. Buat folder "images" sejajar dengan index.html.
   2. Simpan foto dengan NAMA FILE yang sama seperti field "gambar" di data di bawah
      (contoh: images/hero.jpg, images/perawatan-acne-calm.jpg, images/dokter-1.jpg).
   3. Urutan pemuatan: file di images/  ->  gambar cadangan  ->  placeholder emoji.
      Jadi situs tidak pernah menampilkan gambar rusak.
   4. Ingin memakai nama file lain? Ubah saja teks pada field "gambar".
   ============================================================ */

const NOMOR_WA = "6282228087492"; // satu-satunya tempat nomor WhatsApp
const STORAGE_KEY = "4ys_data_v2";
const SEMUA_KULIT = ["Berminyak", "Kering", "Kombinasi", "Sensitif", "Normal"];

/* ---------- GAMBAR CADANGAN (dipakai bila file di images/ belum ada) ---------- */
const POOL = {
  hero: "https://images.unsplash.com/photo-1782159981479-0fafb56d3cd6?auto=format&fit=crop&w=1200&q=82",
  facial: "https://images.unsplash.com/photo-1782159981435-78545e10428a?auto=format&fit=crop&w=900&q=80",
  product1: "https://images.unsplash.com/photo-1670201202833-b0932731628f?auto=format&fit=crop&w=800&q=80",
  product2: "https://images.unsplash.com/photo-1585652757141-8837d676fac8?auto=format&fit=crop&w=800&q=80",
  product3: "https://images.unsplash.com/photo-1718490953028-021d352b14fd?auto=format&fit=crop&w=800&q=80",
  product4: "https://images.unsplash.com/photo-1707539160277-e39464517645?auto=format&fit=crop&w=800&q=80",
  product5: "https://images.unsplash.com/photo-1598412795976-9c195182ee01?auto=format&fit=crop&w=800&q=80",
  product6: "https://images.unsplash.com/photo-1601049541079-473f79fd3746?auto=format&fit=crop&w=800&q=80",
  clinic: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  article1: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80",
  article2: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=80",
  article3: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80"
};

/* ---------- GAMBAR UMUM (satu file per tempat) ---------- */
const FOTO = {
  hero:    { gambar: "images/hero.jpg",           cadangan: [POOL.hero] },
  tentang: { gambar: "images/tentang-klinik.jpg", cadangan: [POOL.clinic] },
  promo:   { gambar: "images/promo.jpg",          cadangan: [POOL.product3] },
  lokasi:  { gambar: "images/lokasi-klinik.jpg",  cadangan: [POOL.clinic] },
  qris:    { gambar: "images/qris.png",           cadangan: [] },
  before:  { gambar: "images/before.jpg",         cadangan: ["before.jpeg"] },
  after:   { gambar: "images/after.jpg",          cadangan: ["after.jpeg"] }
};

/* ---------- PERAWATAN: tiap perawatan punya 2 gambar (kartu dan detail) ---------- */
const PERAWATAN = [
  { id:"facial-dasar", nama:"Fresh Start Facial", kategori:"Facial", masalah:["Kusam","Kering"], harga:149000, durasi:"60 menit",
    gambar:"images/perawatan-facial-dasar.jpg", gambarDetail:"images/perawatan-facial-dasar-detail.jpg", cadangan:["start facial.jpeg", POOL.facial],
    ringkas:"Pembersihan menyeluruh dan hidrasi ringan untuk perawatan rutin.", manfaat:"Membersihkan pori, mengangkat sel kulit mati ringan, dan membantu kulit terasa segar.", cocok:"Pemula dan kulit normal hingga kering.", langkah:["Analisis singkat","Double cleansing","Eksfoliasi lembut","Masker hidrasi","Tabir surya"], persiapan:"Hindari scrub 2 hari sebelumnya.", setelah:"Gunakan pelembap dan SPF, hindari eksfoliasi 3 hari.", peringatan:"Konsultasikan dulu bila sedang iritasi berat atau memiliki luka terbuka.", ulasan:"Wajah terasa lebih bersih tanpa rasa tertarik. Penjelasannya juga mudah dipahami." },
  { id:"acne-calm", nama:"Acne Calm Facial", kategori:"Jerawat", masalah:["Jerawat","Berminyak"], harga:189000, durasi:"75 menit",
    gambar:"images/perawatan-acne-calm.jpg", gambarDetail:"images/perawatan-acne-calm-detail.jpg", cadangan:[POOL.facial],
    ringkas:"Facial terarah untuk kulit berminyak dan jerawat ringan.", manfaat:"Membantu membersihkan sumbatan dan menenangkan kemerahan.", cocok:"Kulit berminyak dengan komedo atau jerawat ringan.", langkah:["Konsultasi","Pembersihan","Ekstraksi selektif","Masker calming","Edukasi rumah"], persiapan:"Jangan memencet jerawat sebelum datang.", setelah:"Hindari makeup berat dan bahan aktif 48 jam.", peringatan:"Jerawat meradang berat perlu evaluasi dokter lebih dulu.", ulasan:"Ekstraksinya pelan dan saya dibantu menyusun rutinitas yang sederhana." },
  { id:"gentle-peel", nama:"Gentle Renewal Peel", kategori:"Eksfoliasi", masalah:["Kusam","Flek","Jerawat"], harga:239000, durasi:"45 menit",
    gambar:"images/perawatan-gentle-peel.jpg", gambarDetail:"images/perawatan-gentle-peel-detail.jpg", cadangan:[POOL.product1],
    ringkas:"Peeling ringan untuk tekstur, noda bekas, dan kulit tampak kusam.", manfaat:"Membantu pergantian sel kulit dan meratakan tampilan warna kulit.", cocok:"Kulit kusam, tekstur kasar, dan bekas jerawat dangkal.", langkah:["Analisis dokter","Pembersihan","Aplikasi peeling","Netralisasi","Soothing care"], persiapan:"Hentikan retinoid dan AHA/BHA 5 hari sebelumnya.", setelah:"SPF wajib; jangan mengelupas kulit secara paksa.", peringatan:"Ibu hamil, kulit sangat sensitif, atau pengguna obat tertentu wajib konsultasi.", ulasan:"Ada penjelasan downtime sejak awal, jadi saya tidak kaget saat sedikit kering." },
  { id:"micro-polish", nama:"Micro Polish Therapy", kategori:"Tekstur", masalah:["Kusam","Flek"], harga:269000, durasi:"60 menit",
    gambar:"images/perawatan-micro-polish.jpg", gambarDetail:"images/perawatan-micro-polish-detail.jpg", cadangan:[POOL.facial],
    ringkas:"Mikrodermabrasi terukur untuk kulit kusam dan tekstur tidak rata.", manfaat:"Membantu menghaluskan permukaan kulit dan membuat skincare lebih mudah diratakan.", cocok:"Tekstur kasar dan kulit kusam tanpa peradangan aktif.", langkah:["Analisis","Cleansing","Mikrodermabrasi","Serum soothing","SPF"], persiapan:"Hindari waxing dan eksfoliasi 5 hari.", setelah:"Gunakan pembersih lembut dan SPF.", peringatan:"Tidak disarankan saat jerawat aktif meradang atau rosacea kambuh.", ulasan:"Kulit terasa halus, tetapi dokter tetap mengingatkan hasil tiap orang berbeda." },
  { id:"bright-spot", nama:"Bright Spot Care", kategori:"Pencerah & Flek", masalah:["Flek","Kusam"], harga:329000, durasi:"75 menit",
    gambar:"images/perawatan-bright-spot.jpg", gambarDetail:"images/perawatan-bright-spot-detail.jpg", cadangan:[POOL.product4],
    ringkas:"Kombinasi perawatan pencerah untuk tampilan noda dan warna tidak merata.", manfaat:"Membantu menyamarkan tampilan flek secara bertahap.", cocok:"Noda bekas jerawat, flek ringan, dan warna kulit tidak merata.", langkah:["Pemeriksaan dokter","Eksfoliasi terukur","Serum pencerah","Masker","Rencana rumah"], persiapan:"Bawa daftar produk yang sedang dipakai.", setelah:"Disiplin SPF dan ikuti jadwal kontrol.", peringatan:"Flek perlu diagnosis; hasil tidak instan dan dapat berbeda.", ulasan:"Saya suka karena tidak dijanjikan langsung hilang dan harganya dijelaskan." },
  { id:"age-well", nama:"Age Well Firming", kategori:"Anti Penuaan", masalah:["Penuaan","Kering"], harga:399000, durasi:"90 menit",
    gambar:"images/perawatan-age-well.jpg", gambarDetail:"images/perawatan-age-well-detail.jpg", cadangan:[POOL.facial],
    ringkas:"Perawatan nyaman untuk hidrasi dan tampilan garis halus.", manfaat:"Mendukung kelembapan dan elastisitas kulit.", cocok:"Kulit dewasa, kering, dan garis halus awal.", langkah:["Analisis","Cleansing","Pijat wajah","Firming serum","Masker intensif"], persiapan:"Sampaikan riwayat prosedur estetika sebelumnya.", setelah:"Jaga hidrasi dan gunakan tabir surya.", peringatan:"Konsultasikan bila memiliki kondisi autoimun atau sedang hamil.", ulasan:"Kulit terasa kenyal dan tidak ada dorongan membeli paket berlebihan." },
  { id:"aqua-glow", nama:"Aqua Glow Infusion", kategori:"Hidrasi", masalah:["Kering","Kusam","Sensitif"], harga:279000, durasi:"60 menit",
    gambar:"images/perawatan-aqua-glow.jpg", gambarDetail:"images/perawatan-aqua-glow-detail.jpg", cadangan:[POOL.hero],
    ringkas:"Infusi hidrasi lembut untuk kulit dehidrasi dan tampak lelah.", manfaat:"Membantu kulit terasa lebih lembap dan tampak segar.", cocok:"Kulit dehidrasi, kering, atau sensitif stabil.", langkah:["Cleansing","Kompres lembut","Infusi serum","Masker gel","Barrier cream"], persiapan:"Tidak ada persiapan khusus.", setelah:"Hindari air panas dan bahan aktif 24 jam.", peringatan:"Kulit dengan infeksi aktif perlu ditunda.", ulasan:"Nyaman dan tidak perih. Kulit saya terasa lebih lembap." },
  { id:"barrier-rescue", nama:"Barrier Rescue", kategori:"Kulit Sensitif", masalah:["Sensitif","Kering"], harga:219000, durasi:"55 menit",
    gambar:"images/perawatan-barrier-rescue.jpg", gambarDetail:"images/perawatan-barrier-rescue-detail.jpg", cadangan:[POOL.product3],
    ringkas:"Perawatan minimalis untuk membantu menenangkan skin barrier.", manfaat:"Membantu mengurangi rasa kering dan tidak nyaman.", cocok:"Kulit sensitif stabil atau barrier yang terasa terganggu.", langkah:["Konsultasi","Pembersihan minimal","Soothing compress","Barrier mask","Edukasi"], persiapan:"Hentikan produk yang menimbulkan reaksi.", setelah:"Gunakan rutinitas minimal sesuai arahan.", peringatan:"Reaksi alergi akut harus diperiksa tenaga medis segera.", ulasan:"Produk yang dipakai dijelaskan satu per satu dan tidak terasa menyengat." },
  { id:"doctor-consult", nama:"Konsultasi Dokter Kulit", kategori:"Konsultasi", masalah:["Jerawat","Flek","Kusam","Penuaan","Sensitif","Kering"], harga:75000, durasi:"30 menit",
    gambar:"images/perawatan-doctor-consult.jpg", gambarDetail:"images/perawatan-doctor-consult-detail.jpg", cadangan:["diyana.jpeg"],
    ringkas:"Diskusi masalah kulit, pemeriksaan, dan rencana perawatan personal.", manfaat:"Membantu memahami kondisi kulit sebelum memilih tindakan atau produk.", cocok:"Semua orang, terutama pemula dan kondisi yang berulang.", langkah:["Wawancara","Pemeriksaan","Penjelasan kondisi","Rencana prioritas"], persiapan:"Bawa daftar skincare, obat, dan riwayat alergi.", setelah:"Ikuti rencana dan catat perubahan kulit.", peringatan:"Bukan layanan kegawatdaruratan.", ulasan:"Dokternya menjawab pertanyaan saya tanpa terburu-buru." },
  { id:"student-starter", nama:"Paket Student Starter", kategori:"Paket Hemat", masalah:["Jerawat","Kusam"], harga:199000, durasi:"70 menit",
    gambar:"images/perawatan-student-starter.jpg", gambarDetail:"images/perawatan-student-starter-detail.jpg", cadangan:["start facial.jpeg", POOL.facial],
    ringkas:"Konsultasi singkat, basic facial, dan panduan rutinitas untuk pelajar/mahasiswa.", manfaat:"Memberi langkah awal yang terarah dengan biaya lebih ringan.", cocok:"Pelajar dan mahasiswa yang baru mulai merawat kulit.", langkah:["Konsultasi","Basic cleansing","Perawatan sesuai kondisi","Panduan 3 langkah"], persiapan:"Bawa kartu pelajar/mahasiswa yang berlaku.", setelah:"Ikuti rutinitas sederhana selama 4 minggu.", peringatan:"Peserta di bawah 17 tahun perlu pendamping orang tua.", ulasan:"Paketnya jelas dan cocok untuk uang saku. Tidak dipaksa menambah layanan." },
  { id:"acne-reset", nama:"Acne Reset Program", kategori:"Jerawat", masalah:["Jerawat","Berminyak"], harga:459000, durasi:"90 menit",
    gambar:"images/perawatan-acne-reset.jpg", gambarDetail:"images/perawatan-acne-reset-detail.jpg", cadangan:[POOL.product6],
    ringkas:"Konsultasi dokter dan perawatan kombinasi untuk jerawat berulang.", manfaat:"Membantu mengendalikan faktor pemicu dan menyusun kontrol bertahap.", cocok:"Jerawat berulang ringan hingga sedang setelah evaluasi dokter.", langkah:["Pemeriksaan","Deep cleanse","Tindakan terpilih","Calming mask","Rencana kontrol"], persiapan:"Foto perkembangan dan daftar obat membantu evaluasi.", setelah:"Jangan memencet jerawat; ikuti kontrol 4 minggu.", peringatan:"Obat atau tindakan dipilih dokter sesuai kondisi.", ulasan:"Target perawatannya realistis dan ada rencana kontrol yang jelas." }
];

/* ---------- PRODUK 4YOUR SKIN (data contoh: ganti nama, kandungan, harga sesuai produk asli) ----------
   Foto produk asli perlu difoto sendiri. Gambar cadangan hanya botol generik. */
const MEREK = "4Your Skin";
const PRODUK = [
  { id:"cleanser-calm", merek:MEREK, seri:"Seri Lembut", nama:"4Your Skin Calm Cloud Cleanser", kategori:"Pembersih", ukuran:"100 ml", harga:89000, kulit:SEMUA_KULIT, masalah:["Sensitif"], terlaris:true,
    gambar:"images/produk-cleanser-calm.jpg", cadangan:[POOL.product2], ringkas:"Pembersih lembut tanpa rasa kesat.", kandungan:"Panthenol, betaine, oat", cara:"Pijat 30–60 detik pagi dan malam.", cocok:"Semua jenis kulit, terutama sensitif." },
  { id:"gel-cleanser", merek:MEREK, seri:"Seri Jerawat", nama:"4Your Skin Clear Day Gel Cleanser", kategori:"Pembersih", ukuran:"100 ml", harga:95000, kulit:["Berminyak","Kombinasi"], masalah:["Jerawat"], terlaris:false,
    gambar:"images/produk-gel-cleanser.jpg", cadangan:[POOL.product6], ringkas:"Gel pembersih segar untuk minyak berlebih.", kandungan:"Zinc PCA, allantoin", cara:"Gunakan pagi dan malam.", cocok:"Kulit berminyak dan berjerawat." },
  { id:"barrier-toner", merek:MEREK, seri:"Seri Hidrasi", nama:"4Your Skin Barrier Dew Toner", kategori:"Toner", ukuran:"120 ml", harga:119000, kulit:["Kering","Sensitif","Normal"], masalah:["Kering"], terlaris:false,
    gambar:"images/produk-barrier-toner.jpg", cadangan:[POOL.product1], ringkas:"Toner hidrasi untuk kulit terasa nyaman.", kandungan:"Beta-glucan, panthenol", cara:"Tepuk 1–2 lapis setelah mencuci wajah.", cocok:"Kulit kering dan dehidrasi." },
  { id:"clarity-serum", merek:MEREK, seri:"Seri Jerawat", nama:"4Your Skin Clarity Balance Serum", kategori:"Serum", ukuran:"30 ml", harga:159000, kulit:["Berminyak","Kombinasi"], masalah:["Jerawat"], terlaris:true,
    gambar:"images/produk-clarity-serum.jpg", cadangan:[POOL.product4], ringkas:"Serum ringan untuk komedo dan minyak.", kandungan:"Niacinamide 5%, zinc", cara:"2–3 tetes pada malam hari.", cocok:"Kulit berminyak; mulai selang sehari." },
  { id:"spot-serum", merek:MEREK, seri:"Seri Cerah", nama:"4Your Skin Even Spot Serum", kategori:"Serum", ukuran:"20 ml", harga:179000, kulit:SEMUA_KULIT, masalah:["Flek"], terlaris:false,
    gambar:"images/produk-spot-serum.jpg", cadangan:[POOL.product4], ringkas:"Serum untuk tampilan noda dan warna tidak merata.", kandungan:"Alpha arbutin, licorice", cara:"Gunakan malam, lanjut pelembap.", cocok:"Kulit dengan bekas jerawat atau flek." },
  { id:"cica-gel", merek:MEREK, seri:"Seri Lembut", nama:"4Your Skin Cica Comfort Gel", kategori:"Pelembap Gel", ukuran:"50 ml", harga:129000, kulit:["Sensitif","Kombinasi","Berminyak"], masalah:["Sensitif"], terlaris:false,
    gambar:"images/produk-cica-gel.jpg", cadangan:[POOL.product3], ringkas:"Gel pelembap menenangkan tanpa rasa berat.", kandungan:"Centella, madecassoside", cara:"Oles pagi dan malam.", cocok:"Kulit sensitif dan kombinasi." },
  { id:"cream-moist", merek:MEREK, seri:"Seri Hidrasi", nama:"4Your Skin Soft Barrier Cream", kategori:"Pelembap Krim", ukuran:"50 ml", harga:145000, kulit:["Kering","Sensitif","Normal"], masalah:["Kering"], terlaris:false,
    gambar:"images/produk-cream-moist.jpg", cadangan:[POOL.product5], ringkas:"Krim ceramide untuk menjaga kelembapan.", kandungan:"Ceramide, squalane", cara:"Oles setelah serum.", cocok:"Kulit kering dan barrier terganggu." },
  { id:"aqua-moist", merek:MEREK, seri:"Seri Hidrasi", nama:"4Your Skin Aqua Balance Moisturizer", kategori:"Pelembap Gel", ukuran:"50 ml", harga:135000, kulit:["Kombinasi","Normal","Berminyak"], masalah:["Kusam"], terlaris:false,
    gambar:"images/produk-aqua-moist.jpg", cadangan:[POOL.product3], ringkas:"Gel-cream seimbang untuk area kering dan berminyak.", kandungan:"Hyaluronic acid, ectoin", cara:"Gunakan pagi dan malam.", cocok:"Kulit kombinasi dan normal." },
  { id:"daily-spf", merek:MEREK, seri:"Seri Pelindung", nama:"4Your Skin Daily Veil SPF 50", kategori:"Tabir Surya", ukuran:"40 ml", harga:139000, kulit:SEMUA_KULIT, masalah:["Flek","Penuaan"], terlaris:true,
    gambar:"images/produk-daily-spf.jpg", cadangan:[POOL.product2], ringkas:"Tabir surya ringan tanpa white cast berlebih.", kandungan:"UV filters, vitamin E", cara:"Dua ruas jari, ulangi tiap 2–3 jam.", cocok:"Semua jenis kulit." },
  { id:"retinol-night", merek:MEREK, seri:"Seri Peremaja", nama:"4Your Skin Slow Age Night Serum", kategori:"Krim/Serum Malam", ukuran:"30 ml", harga:199000, kulit:["Normal","Kombinasi"], masalah:["Penuaan"], terlaris:false,
    gambar:"images/produk-retinol-night.jpg", cadangan:[POOL.product4], ringkas:"Retinol pemula untuk garis halus.", kandungan:"Retinol 0,1%, ceramide", cara:"Malam 2x seminggu, tingkatkan perlahan.", cocok:"Kulit normal; tidak untuk hamil/menyusui." },
  { id:"bright-mask", merek:MEREK, seri:"Seri Cerah", nama:"4Your Skin Weekend Bright Mask", kategori:"Masker", ukuran:"60 g", harga:99000, kulit:SEMUA_KULIT, masalah:["Kusam"], terlaris:false,
    gambar:"images/produk-bright-mask.jpg", cadangan:[POOL.product1], ringkas:"Masker bilas untuk kulit tampak segar.", kandungan:"Kaolin lembut, licorice", cara:"Gunakan 10 menit, 1x seminggu.", cocok:"Kulit kusam kecuali sedang iritasi." },
  { id:"lip-repair", merek:MEREK, seri:"Seri Hidrasi", nama:"4Your Skin Lip Barrier Balm", kategori:"Perawatan Bibir", ukuran:"10 g", harga:69000, kulit:SEMUA_KULIT, masalah:["Kering"], terlaris:false,
    gambar:"images/produk-lip-repair.jpg", cadangan:[POOL.product5], ringkas:"Balm nyaman untuk bibir kering.", kandungan:"Shea butter, vitamin E", cara:"Oles kapan saja sesuai kebutuhan.", cocok:"Bibir kering dan pecah ringan." },
  { id:"starter-pack", merek:MEREK, seri:"Paket Hemat", nama:"4Your Skin Paket Skincare Pemula", kategori:"Paket", ukuran:"3 produk", harga:299000, kulit:SEMUA_KULIT, masalah:["Kusam","Jerawat"], terlaris:true,
    gambar:"images/produk-starter-pack.jpg", cadangan:[POOL.product2], ringkas:"Pembersih, pelembap, dan tabir surya dalam satu paket, lebih hemat dari beli satuan (Rp363.000).", kandungan:"Calm Cloud Cleanser, Aqua Balance Moisturizer, Daily Veil SPF 50", cara:"Pagi: cuci wajah, pelembap, tabir surya. Malam: cuci wajah, pelembap.", cocok:"Pemula yang ingin rutinitas 3 langkah sederhana." }
];

/* ---------- DOKTER (nama dan foto adalah CONTOH, ganti dengan dokter asli) ---------- */
const DOKTER = [
  { id:"dokter-1", nama:"dr. Nara Putri", spesialisasi:"Dokter Umum Estetika", pengalaman:"±8 tahun di bidang estetika (contoh)", hari:"Senin, Rabu, Jumat", jam:"10.00–18.00",
    gambar:"images/dokter-1.jpg", cadangan:["diyana.jpeg"] },
  { id:"dokter-2", nama:"dr. Bima Aditya, Sp.DV", spesialisasi:"Dokter Spesialis Kulit (Dermatologi)", pengalaman:"±12 tahun menangani kondisi kulit (contoh)", hari:"Selasa, Kamis, Sabtu", jam:"12.00–20.00",
    gambar:"images/dokter-2.jpg", cadangan:[] },
  { id:"dokter-3", nama:"dr. Raka Wirawan", spesialisasi:"Fokus Anti Penuaan & Flek", pengalaman:"±9 tahun perawatan anti penuaan (contoh)", hari:"Senin, Kamis", jam:"13.00–20.00",
    gambar:"images/dokter-3.jpg", cadangan:[] },
  { id:"dokter-4", nama:"dr. Salsa Maharani", spesialisasi:"Fokus Jerawat & Kulit Remaja", pengalaman:"±6 tahun pendampingan kulit remaja (contoh)", hari:"Rabu, Jumat, Sabtu", jam:"09.00–16.00",
    gambar:"images/dokter-4.jpg", cadangan:[] }
];

const JAM_BUKA = [
  { hari:"Senin–Jumat", jam:"09.00–20.00" },
  { hari:"Sabtu", jam:"09.00–20.00" },
  { hari:"Minggu", jam:"Tutup" },
  { hari:"Hari libur nasional", jam:"Konfirmasi di media sosial" }
];

/* ---------- ARTIKEL EDUKASI ---------- */
const ARTIKEL = [
  { slug:"urutan-skincare-untuk-pemula", judul:"Urutan Skincare untuk Pemula: Mulai dari yang Paling Penting",
    tanggal:"7 November 2026", dokter:"dr. Nara Putri",
    gambar:"images/artikel-urutan-skincare-untuk-pemula.jpg", cadangan:[POOL.article2],
    ringkas:"Panduan rutinitas pagi dan malam yang sederhana agar kulit tidak kewalahan oleh terlalu banyak produk.",
    bagian:[
      { judul:"Mulai dari tiga kebutuhan dasar", isi:"Rutinitas yang baik tidak harus panjang. Untuk pemula, fokuskan dulu pada pembersih yang lembut, pelembap yang terasa nyaman, dan tabir surya pada pagi hari. Tiga langkah ini membantu membersihkan kotoran, menjaga kelembapan, dan melindungi kulit dari paparan sinar. Gunakan secara konsisten selama beberapa minggu agar kamu dapat menilai respons kulit dengan lebih jelas." },
      { judul:"Urutan pada pagi hari", isi:"Setelah mencuci wajah, gunakan pelembap lalu tabir surya sebagai langkah terakhir. Bila kulitmu sangat berminyak, pelembap bertekstur gel dapat terasa lebih ringan. Jangan mengurangi jumlah tabir surya hanya karena terasa berat; lebih baik cari tekstur yang nyaman. Makeup dapat digunakan setelah tabir surya meresap dan membentuk lapisan yang rata." },
      { judul:"Urutan pada malam hari", isi:"Bersihkan wajah setelah beraktivitas, terutama bila memakai makeup atau tabir surya tahan air. Lanjutkan dengan pelembap. Bahan aktif seperti niacinamide, retinoid, atau eksfolian sebaiknya ditambahkan satu per satu setelah rutinitas dasar stabil. Beri jarak beberapa minggu agar mudah mengetahui produk mana yang membantu atau justru memicu reaksi." },
      { judul:"Kapan perlu meminta bantuan", isi:"Hentikan produk baru bila kulit terasa terbakar, membengkak, atau mengalami ruam yang memburuk. Jerawat nyeri, kulit yang terus mengelupas, dan keluhan berulang sebaiknya dievaluasi dokter. Bawa daftar produk yang dipakai saat konsultasi. Tujuannya bukan mengumpulkan banyak produk, melainkan menemukan rutinitas yang dapat dijalankan dengan nyaman dan konsisten." }
    ] },
  { slug:"jerawat-jangan-dipencet", judul:"Jerawat Jangan Dipencet: Mengapa dan Apa yang Lebih Aman?",
    tanggal:"31 Oktober 2026", dokter:"dr. Salsa Maharani",
    gambar:"images/artikel-jerawat-jangan-dipencet.jpg", cadangan:[POOL.article1],
    ringkas:"Memencet jerawat terasa menggoda, tetapi dapat memperpanjang peradangan dan meningkatkan risiko bekas.",
    bagian:[
      { judul:"Apa yang terjadi saat jerawat dipencet", isi:"Tekanan dari jari dapat mendorong isi jerawat lebih dalam dan melukai jaringan di sekitarnya. Tangan yang tidak bersih juga membawa kotoran serta bakteri tambahan. Akibatnya, jerawat bisa tampak lebih merah, terasa nyeri, dan membutuhkan waktu lebih lama untuk pulih. Luka terbuka juga lebih mudah meninggalkan noda gelap atau jaringan parut." },
      { judul:"Langkah yang lebih aman di rumah", isi:"Bersihkan wajah dengan lembut dan hindari scrub kasar. Kompres dingin singkat dapat membantu rasa tidak nyaman pada jerawat yang meradang. Plester hidrokoloid bisa dipakai untuk melindungi jerawat dari sentuhan, tetapi bukan pengganti pengobatan. Bila ingin mencoba bahan aktif, gunakan satu produk sesuai petunjuk dan jangan menumpuk beberapa bahan sekaligus." },
      { judul:"Kebiasaan kecil yang membantu", isi:"Jangan terlalu sering menyentuh wajah, bersihkan layar ponsel, dan ganti sarung bantal secara rutin. Pilih produk yang tidak terasa menyumbat dan tetap gunakan pelembap meski kulit berminyak. Tidur cukup serta pola makan seimbang mendukung kesehatan umum, tetapi jerawat bukan tanda seseorang malas atau tidak menjaga kebersihan." },
      { judul:"Kapan sebaiknya konsultasi", isi:"Temui dokter bila jerawat besar dan nyeri, sering muncul kembali, meninggalkan cekungan, atau memengaruhi kepercayaan diri. Dokter dapat menilai tingkat peradangan dan memilih perawatan yang sesuai. Jangan menggunakan obat milik orang lain karena kondisi, alergi, dan kebutuhan setiap kulit berbeda. Hasil juga tidak dapat dijanjikan sama pada setiap orang." }
    ] },
  { slug:"tabir-surya-setiap-hari", judul:"Tabir Surya Setiap Hari: Cara Pakai yang Benar",
    tanggal:"24 Oktober 2026", dokter:"dr. Nara Putri",
    gambar:"images/artikel-tabir-surya-setiap-hari.jpg", cadangan:[POOL.article3],
    ringkas:"Tabir surya membantu melindungi kulit saat beraktivitas di luar maupun dekat jendela pada siang hari.",
    bagian:[
      { judul:"Mengapa perlu dipakai setiap hari", isi:"Paparan ultraviolet terjadi bukan hanya saat cuaca sangat panas. Awan tidak sepenuhnya menghalangi sinar, dan sebagian paparan dapat masuk melalui jendela. Tabir surya membantu mengurangi dampak paparan terhadap warna kulit tidak merata, flek, dan tanda penuaan dini. Perlindungan terbaik tetap merupakan gabungan tabir surya, pakaian, topi, dan mencari tempat teduh." },
      { judul:"Pilih yang nyaman digunakan", isi:"Cari tabir surya berspektrum luas dengan SPF minimal 30. Kulit berminyak mungkin lebih nyaman dengan tekstur gel atau cair, sedangkan kulit kering dapat memilih tekstur krim. Kulit sensitif perlu memperhatikan kandungan yang pernah memicu reaksi. Produk terbaik adalah produk yang cukup nyaman sehingga bisa kamu gunakan dalam jumlah yang memadai setiap hari." },
      { judul:"Jumlah dan urutan pemakaian", isi:"Gunakan tabir surya sebagai langkah terakhir rutinitas pagi, setelah pelembap dan sebelum makeup. Ratakan pada wajah, telinga, leher, dan area lain yang terpapar. Patokan dua ruas jari untuk wajah dan leher dapat menjadi awal, tetapi ikuti juga petunjuk produk. Beri waktu agar lapisan merata sebelum keluar rumah." },
      { judul:"Kapan harus mengulang", isi:"Ulangi sekitar setiap dua sampai tiga jam ketika berada di luar, serta setelah banyak berkeringat, berenang, atau mengusap wajah. Saat lebih banyak berada di dalam ruangan, kebutuhan pengulangan menyesuaikan paparan. Bila tabir surya memicu perih, ruam, atau bengkak, hentikan pemakaian dan konsultasikan kepada dokter untuk mencari pilihan yang lebih sesuai." }
    ] }
];

/* ---------- KUIS ---------- */
const PERTANYAAN_KUIS = [
  { tanya:"Menjelang siang, bagaimana kondisi kulitmu?", opsi:[["Sangat mengilap","Berminyak"],["Mengilap di zona T saja","Kombinasi"],["Terasa kencang atau bersisik","Kering"],["Nyaman dan seimbang","Normal"],["Mudah merah atau perih","Sensitif"]] },
  { tanya:"Bagaimana pori dan jerawatmu biasanya?", opsi:[["Pori terlihat dan sering berjerawat","Berminyak"],["Pori terlihat di hidung/dahi","Kombinasi"],["Pori hampir tidak terlihat","Kering"],["Jarang bermasalah","Normal"],["Mudah muncul ruam kecil","Sensitif"]] },
  { tanya:"Apa yang terjadi saat mencoba produk baru?", opsi:[["Cepat terasa makin berminyak","Berminyak"],["Berbeda di tiap area wajah","Kombinasi"],["Sering terasa kurang lembap","Kering"],["Biasanya baik-baik saja","Normal"],["Mudah panas, gatal, atau merah","Sensitif"]] },
  { tanya:"Masalah yang paling ingin kamu atasi?", opsi:[["Minyak dan jerawat","Berminyak"],["Area T berminyak, pipi kering","Kombinasi"],["Kering dan kusam","Kering"],["Menjaga kulit tetap sehat","Normal"],["Sensitif dan mudah iritasi","Sensitif"]] }
];
// Rekomendasi hasil kuis: id perawatan dan id produk 4Your Skin
const REKOMENDASI = {
  Berminyak: { perawatan:"acne-calm",      produk:["gel-cleanser","clarity-serum","daily-spf"] },
  Kombinasi: { perawatan:"facial-dasar",   produk:["cleanser-calm","aqua-moist","daily-spf"] },
  Kering:    { perawatan:"aqua-glow",      produk:["barrier-toner","cream-moist","daily-spf"] },
  Sensitif:  { perawatan:"barrier-rescue", produk:["cleanser-calm","cica-gel","daily-spf"] },
  Normal:    { perawatan:"facial-dasar",   produk:["cleanser-calm","aqua-moist","daily-spf"] }
};

/* ---------- FAQ (tepat 6) ---------- */
const FAQ = [
  { id:"faq-1", tanya:"Apakah ibu hamil boleh melakukan treatment?", jawab:"Ibu hamil tetap dapat melakukan beberapa jenis perawatan, tetapi tidak semua treatment aman untuk dilakukan selama kehamilan. Pelanggan disarankan berkonsultasi terlebih dahulu dengan dokter atau tenaga profesional kami untuk menentukan perawatan yang sesuai dan aman. Hal yang sama berlaku untuk pemakaian produk 4Your Skin saat hamil atau menyusui." },
  { id:"faq-2", tanya:"Apakah ada biaya tambahan selain harga treatment?", jawab:"Tidak ada biaya tambahan di luar harga yang telah diinformasikan, kecuali terdapat layanan atau produk tambahan yang dipilih oleh pelanggan. Setiap biaya tambahan akan dikonfirmasikan terlebih dahulu sebelum layanan diberikan. Booking tidak memerlukan uang muka; pembayaran perawatan dilakukan di klinik lewat tunai, transfer, atau QRIS." },
  { id:"faq-3", tanya:"Apakah pelanggan mendapatkan informasi perawatan setelah treatment selesai?", jawab:"Ya, pelanggan akan mendapatkan arahan mengenai perawatan setelah treatment (aftercare), termasuk hal-hal yang perlu dilakukan dan dihindari agar hasil perawatan dapat optimal." },
  { id:"faq-4", tanya:"Apakah pelanggan bisa mengetahui kandungan produk skincare sebelum membeli?", jawab:"Tentu saja. Pelanggan dapat melihat informasi kandungan, manfaat, cara penggunaan, serta jenis kulit yang sesuai pada setiap produk skincare yang tersedia di website kami." },
  { id:"faq-5", tanya:"Berapa lama durasi satu kali treatment?", jawab:"Durasi treatment berbeda-beda, tergantung jenis perawatan yang dipilih. Umumnya membutuhkan waktu sekitar 30–90 menit. Informasi durasi setiap treatment dapat dilihat pada halaman detail layanan." },
  { id:"faq-6", tanya:"Bagaimana cara melakukan reservasi treatment?", jawab:"Pelanggan dapat melakukan reservasi secara langsung melalui website 4Your Skin dengan memilih jenis treatment, tanggal, dan jadwal yang tersedia. Remaja di bawah 17 tahun perlu didampingi orang tua. WhatsApp hanya untuk pertanyaan cepat, bukan untuk membuat booking." }
];

/* ---------- METODE PEMBAYARAN PRODUK (GANTI data contoh dengan data asli klinik) ----------
   Website statis tidak bisa memeriksa pembayaran otomatis. Status pesanan = "Menunggu Pembayaran",
   lalu admin mengecek mutasi/QRIS dan mengonfirmasi. */
const METODE_BAYAR = [
  { id:"qris", nama:"QRIS", ikon:"📱", ket:"Semua e-wallet dan m-banking",
    gambar:FOTO.qris.gambar,
    langkah:["Buka aplikasi e-wallet atau m-banking (GoPay, OVO, DANA, ShopeePay, dll).","Pilih Scan/Bayar, lalu pindai kode QRIS di atas.","Masukkan nominal sesuai total pesanan, lalu simpan bukti pembayaran."] },
  { id:"transfer", nama:"Transfer Bank", ikon:"🏦", ket:"BCA atau BRI",
    rekening:[{ bank:"BCA", no:"1234567890", an:"4Your Skin (CONTOH)" },{ bank:"BRI", no:"0987654321", an:"4Your Skin (CONTOH)" }],
    langkah:["Transfer sesuai total pesanan ke salah satu rekening di atas.","Simpan bukti transfer.","Pesanan diproses setelah pembayaran kami cek."] },
  { id:"tunai", nama:"Tunai (Cash)", ikon:"💵", ket:"Bayar di kasir saat ambil pesanan", hanyaAmbil:true,
    langkah:["Pesanan disiapkan atas nama kamu.","Ambil pesanan di klinik pada jam buka dan bayar tunai di kasir.","Hanya tersedia untuk pilihan Ambil di klinik."] }
];

/* ---------- STATE ---------- */
const dataKosong = () => ({ cart:[], bookings:[], quizResult:null, points:0, orders:[] });
const checkoutKosong = () => ({ nama:"", hp:"", kirim:"ambil", alamat:"", metode:"qris", pakaiPoin:false });
const bookingKosong = () => ({ layanan:"", tanggal:"", jam:"", nama:"", hp:"", catatan:"", dokter:"" });

function loadData(){
  try { return Object.assign(dataKosong(), JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}); }
  catch (_) { return dataKosong(); }
}
function saveData(){ try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data)); } catch (_) {} }

const state = {
  data: loadData(),
  treatmentFilter:"Semua", productSkin:"Semua", productProblem:"Semua",
  quizStep:0, quizAnswers:[],
  bookingStep:0, booking:bookingKosong(), editCode:null, lastCode:null,
  checkout:checkoutKosong(),
  lastModalTrigger:null
};

function promoIsClosed(){ try { return sessionStorage.getItem("4ys_promo_closed")==="1"; } catch (_) { return false; } }
function closePromoForSession(){ try { sessionStorage.setItem("4ys_promo_closed","1"); } catch (_) {} }

/* ---------- UTIL ---------- */
function esc(s){ return String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c])); }
function rupiah(n){ return new Intl.NumberFormat("id-ID",{ style:"currency", currency:"IDR", maximumFractionDigits:0 }).format(n); }
function formatDate(s){ return s ? new Intl.DateTimeFormat("id-ID",{ weekday:"long", day:"numeric", month:"long", year:"numeric" }).format(new Date(`${s}T12:00:00`)) : "-"; }
function waUrl(message){ return `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(message)}`; }
function goto(hash){ if(location.hash===hash) route(); else location.hash=hash; }
function toast(text){
  const el=document.querySelector("#toast"); el.textContent=text; el.classList.add("show");
  clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove("show"),2600);
}

/* Placeholder SVG lembut bila semua sumber gambar gagal */
function placeholder(label, ikon){
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="#F6E9E4"/><circle cx="400" cy="245" r="105" fill="#C98B8B" opacity=".28"/><text x="400" y="285" text-anchor="middle" font-size="92">${ikon}</text><text x="400" y="440" text-anchor="middle" fill="#6B6161" font-family="Arial" font-size="28">${esc(label).slice(0,40)}</text></svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}
/* img(): src utama + daftar cadangan. Bila gagal, otomatis coba cadangan, lalu placeholder. */
function img(src, alt, o={}){
  const { cls="card-image", ikon="🌿", label="Foto", cadangan=[], w=800, h=600 } = o;
  const fb=[].concat(cadangan).filter(Boolean).join("|");
  return `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" width="${w}" height="${h}" data-fb="${esc(fb)}" data-ikon="${ikon}" data-label="${esc(label)}">`;
}
document.addEventListener("error", e => {
  const el=e.target; if(!(el instanceof HTMLImageElement) || el.classList.contains("logo-img")) return;
  const list=(el.dataset.fb||"").split("|").filter(Boolean);
  if(list.length){ el.dataset.fb=list.slice(1).join("|"); el.src=list[0]; return; }
  if(el.dataset.ph==="1") return;
  el.dataset.ph="1"; el.src=placeholder(el.dataset.label||"Foto", el.dataset.ikon||"🌿");
}, true);

function cartCount(){ return (state.data.cart||[]).reduce((a,x)=>a+x.qty,0); }
function updateCartBadge(){
  const c=cartCount(); document.querySelector("#cart-badge").textContent=c;
  document.querySelector(".cart-link").setAttribute("aria-label",`Keranjang, ${c} barang`);
}
const treatmentById = id => PERAWATAN.find(t=>t.id===id);
const productById = id => PRODUK.find(p=>p.id===id);

/* ---------- KARTU ---------- */
function treatmentCard(t){
  return `<article class="card fade-up">${img(t.gambar,`Perawatan ${t.nama}`,{ ikon:"🌿", label:t.nama, cadangan:t.cadangan })}<div class="card-body"><div class="meta"><span class="tag">${t.kategori}</span><span>${t.durasi}</span></div><h3>${t.nama}</h3><span class="price">Mulai dari ${rupiah(t.harga)}</span><p>${t.ringkas}</p><div class="meta">${t.masalah.map(x=>`<span class="tag">${x}</span>`).join("")}</div><div class="card-actions"><button class="btn btn-secondary detail-treatment" data-id="${t.id}">Lihat Detail</button><button class="btn btn-primary book-treatment" data-id="${t.id}">Pesan Perawatan Ini</button></div></div></article>`;
}
function productCard(p){
  const kulit=p.kulit.length===SEMUA_KULIT.length?"Semua kulit":p.kulit.join(", ");
  return `<article class="card fade-up"><div class="media">${img(p.gambar,`Produk ${p.nama}`,{ ikon:"🧴", label:p.nama, cadangan:p.cadangan })}<span class="merek-badge">${p.merek}</span></div><div class="card-body"><div class="meta">${p.terlaris?`<span class="tag terlaris">Produk Terlaris</span>`:""}<span class="tag">${p.masalah.join(", ")}</span></div><h3>${p.nama}</h3><p class="help-text">${p.ukuran} · ${p.kategori} · ${kulit}</p><span class="price">${rupiah(p.harga)}</span><p>${p.ringkas}</p><div class="card-actions"><button class="btn btn-secondary detail-product" data-id="${p.id}">Lihat Detail</button><button class="btn btn-primary add-cart" data-id="${p.id}">Tambah ke Keranjang</button></div></div></article>`;
}
function articleCard(a){
  return `<article class="card fade-up">${img(a.gambar,`Ilustrasi artikel ${a.judul}`,{ ikon:"📖", label:"Artikel", cadangan:a.cadangan })}<div class="card-body"><div class="meta"><span>${a.tanggal}</span><span class="tag">Ditinjau dokter</span></div><h3>${a.judul}</h3><p>${a.ringkas}</p><div class="card-actions"><a class="btn btn-secondary" href="#/edukasi/${a.slug}">Baca Selengkapnya</a></div></div></article>`;
}
function doctorCard(d){
  return `<article class="card fade-up"><div class="media">${img(d.gambar,`Foto contoh ${d.nama}, ${d.spesialisasi}`,{ cls:"dokter-foto", ikon:"🩺", label:"Foto dokter (contoh)", cadangan:d.cadangan, w:600, h:800 })}<span class="example-label">Foto dan nama contoh</span></div><div class="card-body"><h3>${d.nama}</h3><p class="spes">${d.spesialisasi}</p><p>${d.pengalaman}</p><p><strong>Praktik:</strong><br>${d.hari}<br>${d.jam}</p><div class="card-actions"><button class="btn btn-secondary book-doctor" data-id="${d.id}">Booking Konsultasi Dokter</button></div></div></article>`;
}

/* ---------- BERANDA (hanya perkenalan) ---------- */
function renderHome(){
  const last=state.data.bookings.at(-1);
  document.querySelector("#home-content").innerHTML=`
    ${!promoIsClosed()?`<div class="container section-block"><aside class="promo-banner" aria-label="Promo bulan ini"><button class="promo-close" id="promo-close" aria-label="Tutup promo">×</button><div><p class="eyebrow">Promo bulan ini</p><h2>Kenalan dengan kulitmu, lebih hemat</h2><p>Paket Student Starter mulai Rp199.000 untuk pelajar dan mahasiswa. Syarat berlaku, tunjukkan kartu yang aktif.</p><a class="btn btn-primary" href="#/perawatan">Lihat Paket</a></div>${img(FOTO.promo.gambar,"Banner produk skincare untuk promo bulan ini",{ cls:"promo-image", ikon:"🎁", label:"Promo", cadangan:FOTO.promo.cadangan })}</aside></div>`:""}
    ${last?`<div class="container"><div class="welcome-box"><strong>Selamat datang kembali, ${esc(last.nama)}!</strong><p>Ingin melanjutkan perawatan ${esc(last.layanan)}?</p><div class="form-actions"><button class="btn btn-secondary" id="rebook-home">Booking Ulang</button><a href="#/riwayat">Lihat Aktivitas Saya</a></div></div></div>`:""}
    <div class="hero"><div class="container hero-grid"><div class="hero-copy"><p class="breadcrumb">Beranda</p><p class="eyebrow">Klinik kulit ramah di Madiun</p><h1 id="judul-beranda" tabindex="-1">Kulit bermasalah? Mulai dari kuis 1 menit</h1><p>Tidak perlu langsung tahu nama masalah kulitmu. Kami membantumu mulai dari pertanyaan sederhana, harga yang jelas, dan pilihan yang tidak membingungkan.</p><div class="hero-actions"><a class="btn btn-primary" href="#/kuis">Ikuti Kuis</a><a class="btn btn-secondary" href="#/booking">Booking Sekarang</a></div><div class="trust-row"><div class="trust-item"><i>✓</i>Harga transparan</div><div class="trust-item"><i>✓</i>Ditangani dokter</div><div class="trust-item"><i>✓</i>Booking tanpa chat admin</div></div></div><div class="hero-media">${img(FOTO.hero.gambar,"Perawatan wajah yang nyaman di klinik 4Your Skin",{ cls:"hero-image", ikon:"🌿", label:"Perawatan", cadangan:FOTO.hero.cadangan })}</div></div></div>
    <div class="section-band nude"><div class="container location-preview">${img(FOTO.tentang.gambar,"Ruang klinik bersih sebagai ilustrasi 4Your Skin",{ cls:"location-photo", ikon:"🏥", label:"Klinik", cadangan:FOTO.tentang.cadangan })}<div><p class="eyebrow">Mengenal 4Your Skin</p><h2>Tempat aman untuk mulai memahami kulitmu</h2><p>4Your Skin adalah klinik kecantikan di Madiun yang dirancang untuk remaja, dewasa muda, dan siapa pun yang ingin merawat kulit tanpa merasa dihakimi. Kami membantu menjelaskan masalah kulit dengan bahasa yang mudah dipahami, dan memiliki rangkaian skincare sendiri bermerek 4Your Skin.</p><p>Yang membedakan kami adalah harga yang terlihat sejak awal, pilihan perawatan yang terarah, dan proses booking yang selesai di website. Kamu tetap memegang keputusan setelah menerima penjelasan manfaat, risiko, dan alternatif.</p><p class="help-text"><strong>Hasil setiap orang berbeda.</strong> Konsultasi dokter tetap disarankan untuk kondisi medis atau keluhan yang menetap.</p></div></div></div>
    <div class="section-band"><div class="container"><div class="section-heading"><p class="eyebrow">Kenapa memilih kami</p><h2>Lebih tenang sejak langkah pertama</h2></div><div class="card-grid three"><article class="card"><div class="card-body"><span class="empty-icon" aria-hidden="true">◇</span><h3>Harga Transparan</h3><p>Harga “mulai dari” selalu terlihat dan total dijelaskan sebelum tindakan dimulai.</p></div></article><article class="card"><div class="card-body"><span class="empty-icon" aria-hidden="true">+</span><h3>Ditangani Dokter</h3><p>Kondisi kulit dinilai dengan hati-hati dan tindakan medis dilakukan oleh dokter.</p></div></article><article class="card"><div class="card-body"><span class="empty-icon" aria-hidden="true">✓</span><h3>Booking Mudah</h3><p>Pilih layanan, tanggal, dan jam sendiri tanpa perlu menunggu balasan chat admin.</p></div></article></div></div></div>
    <div class="section-band nude"><div class="container location-preview"><div><p class="eyebrow">Jam buka &amp; tautan cepat</p><h2>Rencanakan kunjunganmu</h2><ul class="hours-list">${JAM_BUKA.slice(0,3).map(x=>`<li><span>${x.hari}</span><strong>${x.jam}</strong></li>`).join("")}</ul></div><div><p>Harga, jadwal dokter, lokasi, dan aktivitasmu dapat ditemukan dengan cepat.</p><div class="quick-links"><a class="btn btn-primary" href="#/perawatan">Lihat Perawatan &amp; Harga</a><a class="btn btn-secondary" href="#/lokasi">Lokasi &amp; Jam</a><a class="btn btn-quiet" href="#/riwayat">Aktivitas Saya</a></div></div></div></div>`;
  bindDynamic();
}

/* ---------- PERAWATAN, PRODUK ---------- */
function renderTreatments(){
  const filters=["Semua","Jerawat","Flek","Kusam","Penuaan","Kering","Sensitif"];
  document.querySelector("#treatment-filters").innerHTML=filters.map(x=>`<button class="filter-btn ${state.treatmentFilter===x?"active":""}" data-treatment-filter="${x}" aria-pressed="${state.treatmentFilter===x}">${x}</button>`).join("");
  const shown=PERAWATAN.filter(t=>state.treatmentFilter==="Semua"||t.masalah.includes(state.treatmentFilter));
  const cats=[...new Set(shown.map(x=>x.kategori))];
  document.querySelector("#treatment-catalog").innerHTML=cats.map(cat=>{
    const list=shown.filter(x=>x.kategori===cat);
    return `<section class="category-block"><div class="category-head"><h2>${cat}</h2><p>${list.length} pilihan</p></div><div class="card-grid three">${list.map(treatmentCard).join("")}</div></section>`;
  }).join("");
  bindDynamic();
}
function renderProducts(){
  const skins=["Semua",...SEMUA_KULIT], problems=["Semua","Jerawat","Flek","Kusam","Penuaan","Kering","Sensitif"];
  document.querySelector("#product-filters").innerHTML=`<div class="filter-group"><strong>Jenis kulit</strong><div class="filter-bar">${skins.map(x=>`<button class="filter-btn ${state.productSkin===x?"active":""}" data-product-skin="${x}" aria-pressed="${state.productSkin===x}">${x}</button>`).join("")}</div></div><div class="filter-group"><strong>Masalah kulit</strong><div class="filter-bar">${problems.map(x=>`<button class="filter-btn ${state.productProblem===x?"active":""}" data-product-problem="${x}" aria-pressed="${state.productProblem===x}">${x}</button>`).join("")}</div></div>`;
  const shown=PRODUK.filter(p=>(state.productSkin==="Semua"||p.kulit.includes(state.productSkin))&&(state.productProblem==="Semua"||p.masalah.includes(state.productProblem)));
  document.querySelector("#product-catalog").innerHTML=shown.map(productCard).join("")||`<div class="empty-state"><h2>Belum ada produk yang cocok</h2><p>Coba ubah salah satu filter atau konsultasikan kebutuhanmu dengan dokter.</p></div>`;
  bindDynamic();
}

/* ---------- LOKASI ---------- */
function renderLocation(){
  document.querySelector("#location-content").innerHTML=`
  <div class="container section-block"><div class="location-preview">${img(FOTO.lokasi.gambar,"Fasad dan ruang klinik 4Your Skin",{ cls:"location-photo", ikon:"🏥", label:"Lokasi", cadangan:FOTO.lokasi.cadangan })}<div><p class="eyebrow">Alamat klinik</p><h2>4Your Skin Madiun</h2><p>Jl. Sehat No. 24, Kelurahan, Kota Madiun, Jawa Timur 63100.</p><p class="help-text"><span class="example-label">Alamat contoh</span> Ganti dengan alamat asli klinik.</p><a class="btn btn-primary" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Madiun">Petunjuk Arah</a></div></div></div>
  <div class="section-band nude"><div class="container"><div class="card-grid two"><div><h2>Jam buka</h2><div class="table-wrap"><table><thead><tr><th>Hari</th><th>Jam</th></tr></thead><tbody>${JAM_BUKA.map(x=>`<tr><td>${x.hari}</td><td>${x.jam}</td></tr>`).join("")}</tbody></table></div></div><div><h2>Parkir &amp; fasilitas</h2><ul><li>Parkir motor dan beberapa mobil</li><li>Ruang tunggu nyaman</li><li>Mushola dan toilet</li><li>Wi-Fi untuk pengunjung</li><li>Area aman bagi anak/remaja bersama orang tua</li></ul></div></div></div></div>
  <div class="container section-block"><div class="section-heading"><p class="eyebrow">Tim dokter</p><h2>Tim Dokter Kami</h2><p>Nama, foto, dan pengalaman berikut adalah contoh dan perlu diganti dengan data dokter klinik yang sebenarnya.</p></div><div class="card-grid four">${DOKTER.map(doctorCard).join("")}</div></div>
  <div class="section-band nude"><div class="container"><h2>Jadwal dokter</h2><div class="table-wrap"><table><thead><tr><th>Dokter</th><th>Bidang</th><th>Hari</th><th>Jam</th></tr></thead><tbody>${DOKTER.map(d=>`<tr><td>${d.nama} <span class="example-label">Contoh</span></td><td>${d.spesialisasi}</td><td>${d.hari}</td><td>${d.jam}</td></tr>`).join("")}</tbody></table></div><p class="help-text" style="margin-top:12px">Klinik tutup hari Minggu. Jadwal dapat berubah, cek lagi saat booking.</p></div></div>
  <div class="container section-block"><h2>Peta area Madiun</h2><iframe class="map-frame" title="Peta lokasi area Madiun" loading="lazy" src="https://www.google.com/maps?q=Madiun&output=embed"></iframe></div>
  <div class="section-band nude"><div class="container narrow"><h2>Before &amp; After <span class="example-label">Contoh</span></h2><div class="before-after"><figure>${img(FOTO.before.gambar,"Foto contoh sebelum perawatan, bukan hasil pasien klinik",{ cls:"", ikon:"🌿", label:"Before (contoh)", cadangan:FOTO.before.cadangan })}<figcaption>Before</figcaption></figure><figure>${img(FOTO.after.gambar,"Foto contoh sesudah perawatan, bukan hasil pasien klinik",{ cls:"", ikon:"✨", label:"After (contoh)", cadangan:FOTO.after.cadangan })}<figcaption>After</figcaption></figure></div><p class="help-text">Gambar contoh. Hasil setiap orang berbeda.</p></div></div>`;
  bindDynamic();
}

/* ---------- ARTIKEL ---------- */
function renderArticles(){ document.querySelector("#article-list").innerHTML=ARTIKEL.map(articleCard).join(""); bindDynamic(); }
function renderArticle(slug){
  const a=ARTIKEL.find(x=>x.slug===slug); if(!a) return;
  document.querySelector("#article-detail").innerHTML=`<div class="page-head"><div class="container"><p class="breadcrumb"><a href="#/beranda">Beranda</a> <span>›</span> <a href="#/edukasi">Edukasi</a> <span>›</span> Artikel</p><p class="eyebrow">${a.tanggal}</p><h1 id="judul-artikel" tabindex="-1">${a.judul}</h1><p>Ditinjau oleh ${a.dokter} <span class="example-label">Nama contoh</span></p></div></div><article class="container section-block article-body">${img(a.gambar,`Ilustrasi artikel ${a.judul}`,{ cls:"", ikon:"📖", label:"Artikel", cadangan:a.cadangan, w:1000, h:563 })}${a.bagian.map(b=>`<section><h2>${b.judul}</h2><p>${b.isi}</p></section>`).join("")}<div class="result-box"><strong>Catatan:</strong> Artikel ini bersifat edukasi dan bukan pengganti konsultasi dokter. Konsultasikan kondisi yang menetap atau memburuk kepada tenaga medis.</div><p style="margin-top:28px"><a class="btn btn-secondary" href="#/edukasi">Kembali ke Edukasi</a></p></article>`;
}

/* ---------- KUIS ---------- */
function renderQuiz(){
  const root=document.querySelector("#quiz-app");
  if(state.quizStep>=PERTANYAAN_KUIS.length){
    const counts={}; state.quizAnswers.forEach(x=>counts[x]=(counts[x]||0)+1);
    const result=Object.keys(counts).sort((a,b)=>counts[b]-counts[a])[0]||"Normal";
    const rec=REKOMENDASI[result], t=treatmentById(rec.perawatan), prods=rec.produk.map(productById).filter(Boolean);
    state.data.quizResult={ result, perawatan:rec.perawatan, produk:rec.produk, date:new Date().toISOString() }; saveData();
    root.innerHTML=`<div class="result-box"><p class="eyebrow">Hasil panduan awal</p><h2>Kulitmu cenderung ${result}</h2><p>Mulailah dari perawatan <strong>${t.nama}</strong> (mulai dari ${rupiah(t.harga)}).</p><p><strong>Produk 4Your Skin yang cocok:</strong></p><ul>${prods.map(p=>`<li>${p.nama}, ${rupiah(p.harga)}</li>`).join("")}</ul><p class="help-text">Kuis ini hanya panduan awal, konsultasi dokter tetap disarankan.</p><div class="form-actions"><button class="btn btn-primary" id="quiz-book">Booking Perawatan Ini</button><a class="btn btn-secondary" href="#/produk">Lihat Produk</a><button class="btn btn-quiet" id="quiz-reset">Ulangi Kuis</button></div></div>`;
    document.querySelector("#quiz-book").onclick=()=>{ selectBooking(t.nama); goto("#/booking"); };
    document.querySelector("#quiz-reset").onclick=()=>{ state.quizStep=0; state.quizAnswers=[]; renderQuiz(); };
    return;
  }
  const q=PERTANYAAN_KUIS[state.quizStep];
  root.innerHTML=`<p><strong>Pertanyaan ${state.quizStep+1} dari ${PERTANYAAN_KUIS.length}</strong></p><div class="quiz-progress" role="progressbar" aria-valuemin="0" aria-valuemax="4" aria-valuenow="${state.quizStep+1}" aria-label="Progres kuis"><span style="width:${(state.quizStep+1)*25}%"></span></div><fieldset class="field"><legend><h2>${q.tanya}</h2></legend>${q.opsi.map(o=>`<label class="quiz-option"><input type="radio" name="quiz-answer" value="${o[1]}" ${state.quizAnswers[state.quizStep]===o[1]?"checked":""}><span>${o[0]}</span></label>`).join("")}</fieldset><p id="quiz-error" class="error-text" aria-live="polite"></p><div class="form-actions"><button class="btn btn-secondary" id="quiz-back" ${state.quizStep===0?"disabled":""}>Kembali</button><button class="btn btn-primary" id="quiz-next">Lanjut</button></div><p class="privacy-note">Hasil kuis disimpan hanya di browser perangkatmu.</p>`;
  document.querySelector("#quiz-back").onclick=()=>{ state.quizStep--; renderQuiz(); };
  document.querySelector("#quiz-next").onclick=()=>{
    const a=document.querySelector('input[name="quiz-answer"]:checked');
    if(!a){ document.querySelector("#quiz-error").textContent="Pilih satu jawaban dulu, ya."; return; }
    state.quizAnswers[state.quizStep]=a.value; state.quizStep++; renderQuiz();
  };
}

/* ---------- BOOKING ---------- */
function minDate(){ const d=new Date(); return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-"); }
function availableTimes(date){
  if(!date) return [];
  if(new Date(`${date}T12:00:00`).getDay()===0) return [];
  const times=[]; for(let h=9;h<20;h++) times.push(`${String(h).padStart(2,"0")}.00`,`${String(h).padStart(2,"0")}.30`);
  const seed=[...date].reduce((a,c)=>a+c.charCodeAt(0),0), now=new Date(), nowMin=now.getHours()*60+now.getMinutes(), today=date===minDate();
  return times.map((time,i)=>{
    const [h,m]=time.split(".").map(Number);
    return { time, full:(i+seed)%7===0||(i*3+seed)%13===0, past:today&&h*60+m<=nowMin };
  });
}
function resetBooking(){ state.booking=bookingKosong(); state.bookingStep=0; state.editCode=null; }
function selectBooking(name, dokter=""){
  const last=state.data.bookings.at(-1);
  state.booking={ ...bookingKosong(), layanan:name, nama:last?.nama||"", hp:last?.hp||"", dokter };
  state.bookingStep=0; state.editCode=null;
}
function bookingProgress(){
  const s=["1. Pilih layanan","2. Tanggal &amp; jam","3. Data diri"];
  return `<div class="progress-steps" aria-label="Progres booking, langkah ${state.bookingStep+1} dari 3">${s.map((x,i)=>`<div class="progress-step ${state.bookingStep===i?"active":""}" ${state.bookingStep===i?'aria-current="step"':""}>${x}</div>`).join("")}</div>`;
}
function renderBooking(){
  const root=document.querySelector("#booking-app"), b=state.booking;
  if(state.bookingStep===3){ renderBookingSuccess(); return; }
  if(state.bookingStep===0) root.innerHTML=bookingProgress()+`<h2>Pilih layanan</h2><div class="field"><label for="booking-service">Layanan yang ingin dipesan</label><select id="booking-service"><option value="">Pilih layanan</option>${PERAWATAN.map(t=>`<option value="${esc(t.nama)}" ${b.layanan===t.nama?"selected":""}>${t.nama} — mulai ${rupiah(t.harga)}</option>`).join("")}</select><p id="booking-service-error" class="error-text"></p></div>${b.dokter?`<p class="help-text">Dokter pilihanmu: <strong>${esc(b.dokter)}</strong> <span class="example-label">Contoh</span></p>`:""}<div class="form-actions"><button class="btn btn-primary" id="booking-next">Lanjut</button></div><p class="privacy-note">Booking selesai kurang dari 2 menit, tanpa uang muka. Pembayaran perawatan di klinik (tunai, transfer, atau QRIS). WhatsApp hanya untuk pertanyaan cepat, bukan membuat booking.</p>`;
  if(state.bookingStep===1){
    const times=availableTimes(b.tanggal), closed=b.tanggal&&new Date(`${b.tanggal}T12:00:00`).getDay()===0;
    root.innerHTML=bookingProgress()+`<h2>Pilih tanggal dan jam</h2><div class="field"><label for="booking-date">Tanggal kunjungan</label><input id="booking-date" type="date" min="${minDate()}" value="${esc(b.tanggal)}"><p id="booking-date-error" class="error-text"></p></div><div class="field"><p><strong>Pilih jam</strong></p><div id="time-options" class="time-grid">${times.map(x=>`<button type="button" class="time-btn ${b.jam===x.time?"selected":""}" data-time="${x.time}" ${x.full||x.past?"disabled":""} aria-pressed="${b.jam===x.time}">${x.time}${x.full?" · Penuh":x.past?" · Lewat":""}</button>`).join("")||(closed?"<p>Minggu klinik tutup. Silakan pilih hari lain.</p>":"<p>Pilih tanggal untuk melihat jam.</p>")}</div><p id="booking-time-error" class="error-text" aria-live="polite"></p></div><div class="form-actions"><button class="btn btn-secondary" id="booking-back">Kembali</button><button class="btn btn-primary" id="booking-next">Lanjut</button></div>`;
  }
  if(state.bookingStep===2) root.innerHTML=bookingProgress()+`<h2>Isi data diri</h2><div class="field"><label for="booking-name">Nama lengkap</label><input id="booking-name" autocomplete="name" value="${esc(b.nama)}"><p id="booking-name-error" class="error-text"></p></div><div class="field"><label for="booking-phone">Nomor HP</label><input id="booking-phone" inputmode="numeric" autocomplete="tel" placeholder="08xxxxxxxxxx" value="${esc(b.hp)}"><p id="booking-phone-error" class="error-text"></p></div><div class="field"><label for="booking-note">Catatan (opsional)</label><textarea id="booking-note" placeholder="Misalnya alergi atau hal yang perlu kami ketahui">${esc(b.catatan)}</textarea></div><div class="form-actions"><button class="btn btn-secondary" id="booking-back">Kembali</button><button class="btn btn-primary" id="booking-submit">Konfirmasi Booking</button></div><p class="privacy-note">Data booking disimpan di browser ini. Jangan tulis informasi medis yang sangat sensitif.</p>`;
  bindBooking();
}
function markInvalid(el, errorId, message){
  el.setAttribute("aria-invalid","true"); el.setAttribute("aria-describedby",errorId);
  document.querySelector(`#${errorId}`).textContent=message; el.focus();
}
function bindBooking(){
  const back=document.querySelector("#booking-back"); if(back) back.onclick=()=>{ state.bookingStep--; renderBooking(); };
  const date=document.querySelector("#booking-date"); if(date) date.onchange=e=>{ state.booking.tanggal=e.target.value; state.booking.jam=""; renderBooking(); };
  document.querySelectorAll(".time-btn").forEach(btn=>btn.onclick=()=>{ state.booking.jam=btn.dataset.time; renderBooking(); });
  const next=document.querySelector("#booking-next");
  if(next) next.onclick=()=>{
    if(state.bookingStep===0){
      const el=document.querySelector("#booking-service"); state.booking.layanan=el.value;
      if(!el.value){ markInvalid(el,"booking-service-error","Pilih satu layanan agar kami dapat menyiapkan kunjunganmu."); return; }
    } else {
      const dateEl=document.querySelector("#booking-date");
      if(!state.booking.tanggal||state.booking.tanggal<minDate()){ markInvalid(dateEl,"booking-date-error","Pilih tanggal hari ini atau setelahnya."); return; }
      if(new Date(`${state.booking.tanggal}T12:00:00`).getDay()===0){ markInvalid(dateEl,"booking-date-error","Minggu klinik tutup. Silakan pilih Senin sampai Sabtu."); return; }
      if(!state.booking.jam){ document.querySelector("#booking-time-error").textContent="Pilih salah satu jam yang masih tersedia."; return; }
    }
    state.bookingStep++; renderBooking();
  };
  const submit=document.querySelector("#booking-submit");
  if(submit) submit.onclick=()=>{
    const name=document.querySelector("#booking-name"), phone=document.querySelector("#booking-phone");
    state.booking.nama=name.value.trim(); state.booking.hp=phone.value.replace(/\D/g,""); state.booking.catatan=document.querySelector("#booking-note").value.trim();
    let ok=true;
    if(state.booking.nama.length<3){ markInvalid(name,"booking-name-error","Tulis nama lengkap minimal 3 karakter."); ok=false; }
    if(!/^08\d{8,11}$/.test(state.booking.hp)){ markInvalid(phone,"booking-phone-error","Nomor HP harus diawali 08 dan 10-13 digit."); ok=false; }
    if(!ok) return;
    submit.disabled=true; submit.textContent="Menyimpan booking…";
    setTimeout(()=>{
      const list=state.data.bookings, f={ ...state.booking };
      if(state.editCode && list.some(x=>x.code===state.editCode)){
        const i=list.findIndex(x=>x.code===state.editCode); list[i]={ ...list[i], ...f }; state.lastCode=state.editCode;
      } else {
        const code=`4YS-${String(new Date().getDate()).padStart(2,"0")}${Math.floor(Math.random()*90+10)}`;
        list.push({ ...f, code, status:"Menunggu Konfirmasi", created:new Date().toISOString() });
        state.data.points=(state.data.points||0)+20; state.lastCode=code;
      }
      state.editCode=null; saveData(); state.bookingStep=3; renderBooking();
    },700);
  };
}
function renderBookingSuccess(){
  const b=state.data.bookings.find(x=>x.code===state.lastCode)||state.data.bookings.at(-1);
  if(!b){ resetBooking(); renderBooking(); return; }
  const control=new Date(`${b.tanggal}T12:00:00`); control.setDate(control.getDate()+28);
  document.querySelector("#booking-app").innerHTML=`<div class="success-box"><p class="eyebrow">Booking berhasil dicatat</p><h2>${b.code}</h2><div class="summary-line"><span>Layanan</span><strong>${esc(b.layanan)}</strong></div>${b.dokter?`<div class="summary-line"><span>Dokter</span><strong>${esc(b.dokter)}</strong></div>`:""}<div class="summary-line"><span>Jadwal</span><strong>${formatDate(b.tanggal)}, ${b.jam}</strong></div><div class="summary-line"><span>Nama</span><strong>${esc(b.nama)}</strong></div><div class="summary-line"><span>Status</span><strong>${b.status}</strong></div><p>Pembayaran dilakukan di klinik (tunai, transfer, atau QRIS), tanpa uang muka.</p><p>Saran kontrol ulang: <strong>${new Intl.DateTimeFormat("id-ID",{ day:"numeric", month:"long", year:"numeric" }).format(control)}</strong> (4 minggu lagi).</p><div class="form-actions"><button class="btn btn-primary" id="calendar-booking">Tambah ke Kalender</button><button class="btn btn-secondary" id="calendar-control">Simpan Kontrol</button><button class="btn btn-quiet" id="edit-booking">Ubah Booking</button></div></div><p class="privacy-note">Simpan kode booking. Status dapat dilihat lagi di <a href="#/riwayat">Aktivitas Saya</a>.</p>`;
  document.querySelector("#calendar-booking").onclick=()=>downloadICS(b.layanan,b.tanggal,b.jam,"Kunjungan 4Your Skin");
  document.querySelector("#calendar-control").onclick=()=>downloadICS("Kontrol 4Your Skin",control.toISOString().slice(0,10),"10.00","Pengingat kontrol ulang");
  document.querySelector("#edit-booking").onclick=()=>{ state.booking={ ...bookingKosong(), ...b }; state.editCode=b.code; state.bookingStep=0; renderBooking(); };
}
function downloadICS(title, date, time, description){
  const [h,m]=time.split("."), start=new Date(`${date}T${h}:${m}:00`), end=new Date(start.getTime()+3600000);
  const fmt=d=>d.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"");
  const body=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nDTSTART:${fmt(start)}\r\nDTEND:${fmt(end)}\r\nSUMMARY:${title}\r\nDESCRIPTION:${description}\r\nLOCATION:4Your Skin Madiun\r\nEND:VEVENT\r\nEND:VCALENDAR`;
  const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([body],{ type:"text/calendar" })); a.download="4your-skin.ics"; a.click(); URL.revokeObjectURL(a.href);
}

/* ---------- KERANJANG, PEMBAYARAN, CHECKOUT ---------- */
const metodeById = id => METODE_BAYAR.find(m=>m.id===id);
const hitungTotal = sub => state.checkout.pakaiPoin ? Math.round(sub*0.9) : sub;

function addCart(id){
  const item=state.data.cart.find(x=>x.id===id); if(item) item.qty++; else state.data.cart.push({ id, qty:1 });
  saveData(); updateCartBadge(); toast("Berhasil ditambahkan ke keranjang");
}
function changeCart(id, delta){
  const x=state.data.cart.find(i=>i.id===id); if(!x) return;
  x.qty+=delta; if(x.qty<=0) state.data.cart=state.data.cart.filter(i=>i.id!==id);
  saveData(); updateCartBadge(); renderCart();
}
function removeCart(id){ state.data.cart=state.data.cart.filter(x=>x.id!==id); saveData(); updateCartBadge(); renderCart(); }

/* Isi petunjuk pembayaran (dipakai di checkout dan di layar pesanan berhasil) */
function instruksiBayarHtml(m, total){
  return `<h3>${m.nama}</h3><p>Total yang harus dibayar: <strong>${rupiah(total)}</strong></p>
    ${m.gambar?img(m.gambar,"Kode QRIS 4Your Skin",{ cls:"bayar-qris", ikon:"📱", label:"QRIS: taruh file images/qris.png", w:240, h:240 }):""}
    ${(m.rekening||[]).map(r=>`<div class="bayar-rek"><span><strong>${r.bank}</strong> ${r.no}<br>a.n. ${r.an}</span><button type="button" class="btn-salin" data-salin="${r.no}">Salin Nomor</button></div>`).join("")}
    <ol>${m.langkah.map(l=>`<li>${l}</li>`).join("")}</ol>`;
}
function renderCart(){
  const root=document.querySelector("#cart-app"), c=state.checkout;
  const items=state.data.cart.map(x=>({ ...x, p:productById(x.id) })).filter(x=>x.p);
  if(!items.length){ root.innerHTML=`<div class="empty-state"><span class="empty-icon" aria-hidden="true">🛍</span><h2>Keranjangmu masih kosong</h2><p>Temukan skincare 4Your Skin dengan filter jenis kulit dan masalah yang mudah digunakan.</p><a class="btn btn-primary" href="#/produk">Kembali ke Produk</a></div>`; return; }
  const last=state.data.bookings.at(-1); if(!c.nama&&last){ c.nama=last.nama; c.hp=last.hp; }
  const sub=items.reduce((a,x)=>a+x.p.harga*x.qty,0), eligible=(state.data.points||0)>=100;
  if(!eligible) c.pakaiPoin=false;
  if(c.kirim==="kirim"&&c.metode==="tunai") c.metode="qris";
  root.innerHTML=`<div class="cart-layout"><div><h2>Produk pilihanmu</h2>${items.map(x=>`<div class="cart-item">${img(x.p.gambar,x.p.nama,{ cls:"", ikon:"🧴", label:x.p.nama, cadangan:x.p.cadangan, w:80, h:80 })}<div><h3>${x.p.nama}</h3><p>${rupiah(x.p.harga)}</p><div class="quantity"><button data-cart-minus="${x.id}" aria-label="Kurangi ${esc(x.p.nama)}">−</button><strong>${x.qty}</strong><button data-cart-plus="${x.id}" aria-label="Tambah ${esc(x.p.nama)}">+</button><button class="btn btn-quiet" data-cart-remove="${x.id}">Hapus</button></div></div></div>`).join("")}
    <div class="form-card" style="margin-top:24px"><h2>Data pemesan</h2>
      <div class="field"><label for="checkout-name">Nama</label><input id="checkout-name" autocomplete="name" value="${esc(c.nama)}"><p id="checkout-name-error" class="error-text"></p></div>
      <div class="field"><label for="checkout-phone">Nomor HP</label><input id="checkout-phone" inputmode="numeric" placeholder="08xxxxxxxxxx" value="${esc(c.hp)}"><p id="checkout-phone-error" class="error-text"></p></div>
      <fieldset class="field"><legend>Cara menerima pesanan</legend><div class="choice-grid"><label class="choice-card"><input type="radio" name="delivery" value="ambil" ${c.kirim==="ambil"?"checked":""}><span>Ambil di klinik</span></label><label class="choice-card"><input type="radio" name="delivery" value="kirim" ${c.kirim==="kirim"?"checked":""}><span>Kirim ke alamat</span></label></div></fieldset>
      <div class="field" id="address-field" ${c.kirim==="kirim"?"":"hidden"}><label for="checkout-address">Alamat lengkap</label><textarea id="checkout-address">${esc(c.alamat)}</textarea><p id="checkout-address-error" class="error-text"></p></div>
      <fieldset class="bayar"><legend>Metode pembayaran</legend><div class="bayar-daftar">${METODE_BAYAR.map(m=>{ const off=m.hanyaAmbil&&c.kirim==="kirim"; return `<label class="bayar-opsi"><input type="radio" name="metodeBayar" value="${m.id}" ${c.metode===m.id?"checked":""} ${off?"disabled":""}><span class="bayar-kartu"><span class="bayar-ikon" aria-hidden="true">${m.ikon}</span><span><strong>${m.nama}</strong><small>${off?"Hanya untuk ambil di klinik":m.ket}</small></span></span></label>`; }).join("")}</div><div id="bayar-instruksi" class="bayar-instruksi" aria-live="polite"></div></fieldset>
    </div></div>
    <aside class="summary-card"><h2>Ringkasan</h2><div class="summary-line"><span>Subtotal</span><strong>${rupiah(sub)}</strong></div><label class="choice-card"><input id="use-points" type="checkbox" ${eligible?"":"disabled"} ${c.pakaiPoin?"checked":""}><span>${eligible?"Gunakan diskon poin 10%":"Diskon 10% butuh 100 poin"} (${state.data.points||0} poin)</span></label><div class="summary-line total"><span>Total</span><strong id="cart-total">${rupiah(hitungTotal(sub))}</strong></div><button class="btn btn-primary" id="checkout-submit" style="width:100%;margin-top:14px">Selesaikan Pesanan</button><p class="help-text" style="margin-top:12px">Pembelian selesai di website ini. Bayar lewat metode yang kamu pilih di samping.</p></aside></div>`;

  const refresh=()=>{
    document.querySelector("#cart-total").textContent=rupiah(hitungTotal(sub));
    document.querySelector("#bayar-instruksi").innerHTML=instruksiBayarHtml(metodeById(c.metode),hitungTotal(sub));
  };
  refresh();
  document.querySelectorAll("[data-cart-minus]").forEach(b=>b.onclick=()=>changeCart(b.dataset.cartMinus,-1));
  document.querySelectorAll("[data-cart-plus]").forEach(b=>b.onclick=()=>changeCart(b.dataset.cartPlus,1));
  document.querySelectorAll("[data-cart-remove]").forEach(b=>b.onclick=()=>removeCart(b.dataset.cartRemove));
  document.querySelector("#checkout-name").oninput=e=>c.nama=e.target.value;
  document.querySelector("#checkout-phone").oninput=e=>c.hp=e.target.value;
  document.querySelector("#checkout-address").oninput=e=>c.alamat=e.target.value;
  document.querySelectorAll('input[name="delivery"]').forEach(r=>r.onchange=()=>{ c.kirim=r.value; renderCart(); });
  document.querySelectorAll('input[name="metodeBayar"]').forEach(r=>r.onchange=()=>{ c.metode=r.value; refresh(); });
  const pts=document.querySelector("#use-points"); if(pts) pts.onchange=()=>{ c.pakaiPoin=pts.checked; refresh(); };
  document.querySelector("#checkout-submit").onclick=()=>checkout(sub);
}
function checkout(sub){
  const c=state.checkout, name=document.querySelector("#checkout-name"), phone=document.querySelector("#checkout-phone"), addr=document.querySelector("#checkout-address");
  c.nama=name.value.trim(); c.hp=phone.value.replace(/\D/g,""); c.alamat=addr.value.trim();
  let ok=true;
  if(c.nama.length<3){ markInvalid(name,"checkout-name-error","Tulis nama lengkap minimal 3 karakter."); ok=false; }
  if(!/^08\d{8,11}$/.test(c.hp)){ markInvalid(phone,"checkout-phone-error","Nomor HP harus diawali 08 dan 10-13 digit."); ok=false; }
  if(c.kirim==="kirim"&&c.alamat.length<12){ markInvalid(addr,"checkout-address-error","Tulis alamat lengkap minimal 12 karakter."); ok=false; }
  if(!ok) return;
  const m=metodeById(c.metode), total=hitungTotal(sub), earned=Math.floor(total/10000);
  if(c.pakaiPoin) state.data.points-=100;
  state.data.points=(state.data.points||0)+earned;
  const order={ code:`4YP-${Date.now().toString().slice(-6)}`, nama:c.nama, hp:c.hp, kirim:c.kirim, alamat:c.alamat, metodeId:m.id, metode:m.nama,
    status:m.id==="tunai"?"Bayar di Klinik":"Menunggu Pembayaran", total, earned,
    items:state.data.cart.map(x=>({ nama:productById(x.id)?.nama||x.id, qty:x.qty })), date:new Date().toISOString() };
  state.data.orders.push(order); state.data.cart=[];
  state.checkout={ ...checkoutKosong(), nama:c.nama, hp:c.hp };
  saveData(); updateCartBadge(); renderOrderSuccess(order);
}
function renderOrderSuccess(o){
  const m=metodeById(o.metodeId), wa=waUrl(`Halo 4Your Skin, saya ingin konfirmasi pembayaran pesanan ${o.code} sebesar ${rupiah(o.total)} via ${o.metode}.`);
  document.querySelector("#cart-app").innerHTML=`<div class="success-box narrow"><p class="eyebrow">Pesanan berhasil dibuat</p><h2>${o.code}</h2><p>Terima kasih, ${esc(o.nama)}. Pesananmu telah dicatat.</p><div class="summary-line"><span>Total</span><strong>${rupiah(o.total)}</strong></div><div class="summary-line"><span>Metode</span><strong>${o.metode}</strong></div><div class="summary-line"><span>Status</span><strong>${o.status}</strong></div><div class="summary-line"><span>Penerimaan</span><strong>${o.kirim==="ambil"?"Ambil di klinik":"Kirim ke alamat"}</strong></div><p>Kamu mendapat <strong>${o.earned} poin</strong> dari pembelian ini.</p>${m&&m.id!=="tunai"?`<div class="bayar-instruksi">${instruksiBayarHtml(m,o.total)}</div>`:`<div class="bayar-instruksi"><p>Siapkan <strong>${rupiah(o.total)}</strong> tunai. Pesanan bisa diambil di klinik pada jam buka (Senin–Sabtu 09.00–20.00).</p></div>`}<div class="form-actions" style="margin-top:16px">${m&&m.id!=="tunai"?`<a class="btn btn-secondary" href="${wa}" target="_blank" rel="noopener">Kirim Bukti Pembayaran (opsional)</a>`:""}<a class="btn btn-primary" href="#/riwayat">Lihat Aktivitas Saya</a></div>${m&&m.id!=="tunai"?`<p class="help-text" style="margin-top:12px">WhatsApp hanya untuk konfirmasi pembayaran, bukan untuk memesan.</p>`:""}</div>`;
}

/* ---------- RIWAYAT ---------- */
function renderHistory(){
  const d=state.data, bookings=d.bookings, orders=d.orders, quiz=d.quizResult, points=d.points||0, last=bookings.at(-1);
  const qt=quiz?treatmentById(quiz.perawatan):null, qp=quiz?(quiz.produk||[]).map(productById).filter(Boolean):[];
  document.querySelector("#history-content").innerHTML=`<div class="loyalty"><p class="eyebrow">Poin loyalitas</p><h2>${points} / 100 poin</h2><div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.min(points,100)}" aria-label="Progres poin menuju diskon 10%"><span style="width:${Math.min(points,100)}%"></span></div><p>${points>=100?"Hadiah diskon 10% siap digunakan saat checkout.":`${100-points} poin lagi menuju diskon 10%.`}</p></div>
  <div class="history-grid section-block">
    <section class="history-card"><h2>Riwayat booking</h2>${bookings.length?bookings.slice().reverse().map(b=>`<article><strong>${esc(b.layanan)}</strong><p>${formatDate(b.tanggal)}, ${b.jam}<br>${b.code} · ${b.status}</p></article>`).join(""):"<p>Belum ada booking. Jadwal pertamamu akan tampil di sini.</p>"}${last?`<button class="btn btn-secondary" id="history-rebook" style="margin-top:12px">Booking Ulang</button>`:`<a class="btn btn-primary" href="#/booking">Buat Booking</a>`}</section>
    <section class="history-card"><h2>Riwayat pesanan produk</h2>${orders.length?orders.slice().reverse().map(o=>`<article><strong>${o.code}</strong><p>${o.items.map(i=>`${esc(i.nama)} ×${i.qty}`).join(", ")}<br>${rupiah(o.total)} · ${o.metode} · ${o.status}</p></article>`).join(""):"<p>Belum ada pesanan produk.</p>"}<a class="btn btn-secondary" href="#/produk" style="margin-top:12px">Lihat Produk</a></section>
    <section class="history-card"><h2>Hasil kuis terakhir</h2>${quiz?`<p>Kulit cenderung <strong>${quiz.result}</strong></p><p>Rekomendasi: ${qt?qt.nama:"-"}${qp.length?` dan ${qp.map(p=>p.nama).join(", ")}`:""}.</p><a class="btn btn-secondary" href="#/kuis">Ulangi Kuis</a>`:`<p>Belum ada hasil kuis.</p><a class="btn btn-primary" href="#/kuis">Ikuti Kuis</a>`}</section>
    <section class="history-card"><h2>Pengingat kontrol</h2>${last?`<p>Kontrol disarankan sekitar 4 minggu setelah ${formatDate(last.tanggal)}.</p><button class="btn btn-secondary" id="history-calendar">Simpan ke Kalender</button>`:"<p>Pengingat muncul setelah kamu menyelesaikan booking.</p>"}</section>
    <section class="history-card"><h2>Privasi datamu</h2><p>Semua data ini hanya tersimpan di browser perangkatmu melalui localStorage.</p><button class="btn btn-danger" id="delete-data">Hapus Semua Data Saya</button></section>
  </div>`;
  if(last){
    document.querySelector("#history-rebook").onclick=()=>{ selectBooking(last.layanan, last.dokter||""); goto("#/booking"); };
    document.querySelector("#history-calendar").onclick=()=>{ const x=new Date(`${last.tanggal}T12:00:00`); x.setDate(x.getDate()+28); downloadICS("Kontrol 4Your Skin",x.toISOString().slice(0,10),"10.00","Pengingat kontrol ulang"); };
  }
  document.querySelector("#delete-data").onclick=()=>{
    if(confirm("Hapus keranjang, booking, pesanan, hasil kuis, nama, dan poin dari browser ini?")){
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
      state.data=dataKosong(); state.checkout=checkoutKosong(); resetBooking(); updateCartBadge(); renderHistory(); toast("Semua data di browser telah dihapus");
    }
  };
}

/* ---------- FAQ ---------- */
function renderFaq(){
  document.querySelector("#faq-app").innerHTML=`<div class="faq-list">${FAQ.map(f=>`<div class="faq-item"><h3><button class="faq-question" aria-expanded="false" aria-controls="faq-a-${f.id}" id="faq-q-${f.id}">${f.tanya}<span aria-hidden="true">+</span></button></h3><div class="faq-answer" id="faq-a-${f.id}" role="region" aria-labelledby="faq-q-${f.id}" hidden><p>${f.jawab}</p></div></div>`).join("")}</div><div class="section-block"><p>Belum menemukan jawaban yang kamu butuhkan? WhatsApp hanya untuk pertanyaan cepat, bukan membuat booking.</p><a class="btn btn-primary" href="${waUrl("Halo 4Your Skin, saya ingin menanyakan: ")}" target="_blank" rel="noopener">Tanya via WhatsApp</a></div>`;
  document.querySelectorAll("#faq-app .faq-question").forEach(btn=>btn.onclick=()=>{
    const open=btn.getAttribute("aria-expanded")==="true";
    btn.setAttribute("aria-expanded",String(!open)); document.querySelector(`#${btn.getAttribute("aria-controls")}`).hidden=open;
  });
}

/* ---------- MODAL ---------- */
function showTreatmentModal(id, trigger){
  const t=treatmentById(id); if(!t) return;
  const pend=PRODUK.filter(p=>p.masalah.some(m=>t.masalah.includes(m))).slice(0,2);
  openModal(`<button class="modal-close" aria-label="Tutup detail">×</button>${img(t.gambarDetail,`Foto detail perawatan ${t.nama}`,{ cls:"modal-image", ikon:"🌿", label:t.nama, cadangan:[t.gambar,...t.cadangan] })}<div class="modal-content"><p class="eyebrow">${t.kategori} · ${t.durasi}</p><h2 id="modal-title">${t.nama}</h2><span class="price">Mulai dari ${rupiah(t.harga)}</span><h3>Manfaat</h3><p>${t.manfaat}</p><h3>Cocok untuk siapa?</h3><p>${t.cocok}</p><h3>Langkah perawatan</h3><ol>${t.langkah.map(x=>`<li>${x}</li>`).join("")}</ol><h3>Persiapan</h3><p>${t.persiapan}</p><h3>Setelah perawatan</h3><p>${t.setelah}</p><h3>Perlu konsultasi dulu bila…</h3><p>${t.peringatan}</p><h3>Ulasan <span class="example-label">Contoh</span></h3><div class="review-card"><div class="stars" aria-label="5 dari 5 bintang">★★★★★</div><p>“${t.ulasan}”</p></div>${pend.length?`<h3>Produk 4Your Skin pendamping</h3><ul>${pend.map(p=>`<li>${p.nama}, ${rupiah(p.harga)}</li>`).join("")}</ul><a class="btn btn-quiet modal-products" href="#/produk">Lihat Produk</a>`:""}<p class="help-text" style="margin-top:16px">Hasil setiap orang berbeda.</p><button class="btn btn-primary modal-book">Pesan Perawatan Ini</button></div>`, trigger);
  document.querySelector(".modal-book").onclick=()=>{ closeModal(false); selectBooking(t.nama); goto("#/booking"); };
  const lp=document.querySelector(".modal-products"); if(lp) lp.onclick=()=>closeModal(false);
}
function showProductModal(id, trigger){
  const p=productById(id); if(!p) return;
  openModal(`<button class="modal-close" aria-label="Tutup detail">×</button>${img(p.gambar,`Foto detail produk ${p.nama}`,{ cls:"modal-image", ikon:"🧴", label:p.nama, cadangan:p.cadangan })}<div class="modal-content"><p class="eyebrow">${p.merek} · ${p.seri}</p><h2 id="modal-title">${p.nama}</h2><span class="price">${rupiah(p.harga)} · ${p.ukuran}</span><p>${p.ringkas}</p><h3>Kandungan</h3><p>${p.kandungan}</p><h3>Cara pakai</h3><p>${p.cara}</p><h3>Cocok untuk</h3><p>${p.cocok}</p><p class="help-text">Hentikan pemakaian dan konsultasi dokter bila timbul iritasi. Hasil setiap orang berbeda.</p><button class="btn btn-primary modal-add">Tambah ke Keranjang</button></div>`, trigger);
  document.querySelector(".modal-add").onclick=()=>{ addCart(p.id); closeModal(); };
}
function openModal(html, trigger){
  state.lastModalTrigger=trigger;
  document.querySelector("#modal-root").innerHTML=`<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">${html}</div></div>`;
  document.body.classList.add("modal-open");
  const close=document.querySelector(".modal-close");
  close.onclick=()=>closeModal();
  document.querySelector(".modal-backdrop").onclick=e=>{ if(e.target.classList.contains("modal-backdrop")) closeModal(); };
  document.querySelector(".modal").addEventListener("keydown",trapFocus); close.focus();
}
function closeModal(restore=true){
  document.querySelector("#modal-root").innerHTML=""; document.body.classList.remove("modal-open");
  if(restore) state.lastModalTrigger?.focus();
}
function trapFocus(e){
  if(e.key!=="Tab") return;
  const els=[...e.currentTarget.querySelectorAll("button,a[href],input,select,textarea")].filter(x=>!x.disabled), first=els[0], last=els.at(-1);
  if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus(); }
}

/* ---------- PENGIKAT EVENT ---------- */
function bindDynamic(){
  document.querySelectorAll(".detail-treatment").forEach(b=>b.onclick=()=>showTreatmentModal(b.dataset.id,b));
  document.querySelectorAll(".book-treatment").forEach(b=>b.onclick=()=>{ selectBooking(treatmentById(b.dataset.id).nama); goto("#/booking"); });
  document.querySelectorAll(".detail-product").forEach(b=>b.onclick=()=>showProductModal(b.dataset.id,b));
  document.querySelectorAll(".add-cart").forEach(b=>b.onclick=()=>addCart(b.dataset.id));
  document.querySelectorAll(".book-doctor").forEach(b=>b.onclick=()=>{ const d=DOKTER.find(x=>x.id===b.dataset.id); selectBooking("Konsultasi Dokter Kulit", d.nama); goto("#/booking"); });
  document.querySelectorAll("[data-treatment-filter]").forEach(b=>b.onclick=()=>{ state.treatmentFilter=b.dataset.treatmentFilter; renderTreatments(); });
  document.querySelectorAll("[data-product-skin]").forEach(b=>b.onclick=()=>{ state.productSkin=b.dataset.productSkin; renderProducts(); });
  document.querySelectorAll("[data-product-problem]").forEach(b=>b.onclick=()=>{ state.productProblem=b.dataset.productProblem; renderProducts(); });
  const promo=document.querySelector("#promo-close"); if(promo) promo.onclick=()=>{ closePromoForSession(); renderHome(); };
  const rebook=document.querySelector("#rebook-home"); if(rebook) rebook.onclick=()=>{ const b=state.data.bookings.at(-1); selectBooking(b.layanan,b.dokter||""); goto("#/booking"); };
  observeAnimations();
}
function observeAnimations(){
  const items=document.querySelectorAll(".fade-up:not(.visible)");
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver" in window)){ items.forEach(x=>x.classList.add("visible")); return; }
  const ob=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("visible"); ob.unobserve(e.target); } }),{ threshold:.08 });
  items.forEach(x=>ob.observe(x));
}

/* ---------- ROUTER BERBASIS HASH ---------- */
const routeTitles={ beranda:"4Your Skin | Klinik Kecantikan Madiun", perawatan:"Perawatan & Harga | 4Your Skin", kuis:"Kuis Jenis Kulit | 4Your Skin", produk:"Produk Skincare | 4Your Skin", lokasi:"Lokasi, Jam & Dokter | 4Your Skin", edukasi:"Edukasi Kulit | 4Your Skin", booking:"Booking Perawatan | 4Your Skin", keranjang:"Keranjang | 4Your Skin", riwayat:"Aktivitas Saya | 4Your Skin", faq:"FAQ | 4Your Skin", "tidak-ditemukan":"Halaman Tidak Ditemukan | 4Your Skin" };
const KNOWN=["beranda","perawatan","kuis","produk","lokasi","edukasi","booking","keranjang","riwayat","faq"];
function showPage(page){ document.querySelectorAll(".halaman").forEach(s=>s.classList.toggle("active",s.dataset.halaman===page)); }
function closeMenu(){ document.querySelector(".menu-utama").classList.remove("open"); document.querySelector("#menu-toggle").setAttribute("aria-expanded","false"); }

function route(){
  const h=location.hash;
  // Hash biasa (misalnya skip link "#konten-utama") tidak memicu 404
  if(h && !h.startsWith("#/")){
    if(!document.querySelector(".halaman.active")){ renderHome(); showPage("beranda"); document.title=routeTitles.beranda; }
    return;
  }
  const parts=(h||"#/beranda").replace(/^#\//,"").split("/"), base=parts[0]||"beranda";
  let page=KNOWN.includes(base)?base:"tidak-ditemukan";
  if(base==="edukasi"&&parts[1]) page=ARTIKEL.some(x=>x.slug===parts[1])?"artikel":"tidak-ditemukan";
  if(document.querySelector(".modal-backdrop")) closeModal(false);
  if(page!=="booking"&&state.bookingStep===3) resetBooking();

  const R={ beranda:renderHome, perawatan:renderTreatments, kuis:renderQuiz, produk:renderProducts, lokasi:renderLocation, edukasi:renderArticles, artikel:()=>renderArticle(parts[1]), booking:renderBooking, keranjang:renderCart, riwayat:renderHistory, faq:renderFaq };
  if(R[page]) R[page]();
  showPage(page);
  document.title=page==="artikel"?`${ARTIKEL.find(x=>x.slug===parts[1]).judul} | 4Your Skin`:routeTitles[page];
  document.querySelectorAll(".menu-utama a").forEach(a=>{ const on=a.getAttribute("href")===`#/${base}`; a.classList.toggle("active",on); on?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current"); });
  closeMenu();
  window.scrollTo({ top:0, behavior:"instant" });
  setTimeout(()=>document.querySelector(".halaman.active h1")?.focus({ preventScroll:true }),20);
}

/* ---------- EVENT GLOBAL ---------- */
document.querySelector("#menu-toggle").onclick=()=>{
  const open=document.querySelector(".menu-utama").classList.toggle("open");
  document.querySelector("#menu-toggle").setAttribute("aria-expanded",String(open));
};
document.querySelector("#back-to-top").onclick=()=>window.scrollTo({ top:0, behavior:"smooth" });
window.addEventListener("scroll",()=>document.querySelector("#back-to-top").classList.toggle("show",scrollY>650),{ passive:true });
document.addEventListener("keydown",e=>{
  if(e.key!=="Escape") return;
  if(document.querySelector(".modal-backdrop")) closeModal();
  closeMenu();
  document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(b=>{ b.setAttribute("aria-expanded","false"); document.querySelector(`#${b.getAttribute("aria-controls")}`).hidden=true; });
});
// Tombol "Salin Nomor" rekening
document.addEventListener("click",e=>{
  const btn=e.target.closest(".btn-salin"); if(!btn) return;
  const ok=()=>{ btn.textContent="Tersalin ✓"; setTimeout(()=>btn.textContent="Salin Nomor",2000); };
  if(navigator.clipboard) navigator.clipboard.writeText(btn.dataset.salin).then(ok).catch(()=>{});
  else { const t=document.createElement("textarea"); t.value=btn.dataset.salin; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); ok(); }
});
document.querySelectorAll("[data-wa-link]").forEach(a=>{ a.href=waUrl("Halo 4Your Skin, saya ingin bertanya tentang layanan klinik."); a.target="_blank"; a.rel="noopener"; });
document.querySelector("#wa-floating").href=waUrl("Halo 4Your Skin, saya ingin bertanya tentang layanan klinik.");
document.querySelector("#year").textContent=new Date().getFullYear();
window.addEventListener("hashchange",route);
updateCartBadge();
if(!location.hash) location.replace("#/beranda"); else route();