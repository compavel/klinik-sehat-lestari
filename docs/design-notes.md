# Catatan Desain — Klinik Sehat Lestari

Dokumen ini menjelaskan alasan di balik keputusan visual dan teknis. Bukan panduan memakai website, melainkan bahan untuk menjelaskan project saat interview dan catatan kalau nanti dilanjutkan.

## 1. Brief dan batasan

- Klien fiktif: klinik keluarga di Beji, Depok, dengan empat poli dan lima dokter.
- Target pengguna: keluarga muda usia 25–45 yang membuka dari HP.
- Output: empat halaman utama, style guide singkat, dan wireframe low-fidelity.
- Teknologi: HTML, CSS, dan JavaScript statis. Tanpa backend, database, atau form booking.
- Data dokter, jadwal, alamat, dan kontak adalah demo dan harus ditandai jelas.
- Di luar scope: notifikasi, pembayaran, rekam medis, multi-bahasa, analytics.

Batasan ini penting. Tanpa backend, satu-satunya jalur konversi yang realistis adalah WhatsApp dan telepon. Jadi desain diarahkan ke sana, bukan membuat form yang tidak bisa diproses.

## 2. Pekerjaan pengguna

Pertanyaan yang paling sering muncul saat orang mencari klinik:

| Pertanyaan | Dijawab di mana |
| --- | --- |
| Buka sekarang? | Kartu status di beranda, jam operasional di kontak |
| Dokter X praktik kapan? | Halaman tim dokter, jadwal per poli |
| Bisa tangani keluhan ini? | Halaman layanan |
| Di mana dan parkir di mana? | Halaman kontak, peta, cara datang |
| Bagaimana menghubungi? | Action bar mobile, FAB desktop, tombol WhatsApp kontekstual |

Implikasi desain:

- Jawaban utama harus terlihat tanpa scroll di mobile: status buka, layanan, dan tombol WhatsApp.
- Teks harus bisa dipindai cepat; hindari carousel dan paragraf panjang di atas lipatan.
- Navigasi harus tetap sederhana meski ada empat halaman.
- Pengguna mungkin sedang buru-buru atau cemas. Nada visual tenang, bukan ramai.

## 3. Arah visual

Metafora yang dipakai: **meja pendaftaran**, bukan brosur digital.

- Rata kiri, bukan centered hero.
- Garis rambut sebagai pemisah, bukan tumpukan kartu dengan shadow.
- Banyak ruang kosong dan hierarki yang jelas.
- Satu objek khas: kartu jadwal hari ini dengan status buka.
- Warna hangat (krem) dipakai secukupnya untuk memberi kesan ramah, bukan untuk semua section.

Yang sengaja dihindari:

- Grid kartu bundar dengan ikon di tengah yang membuat semua klinik terlihat sama.
- Gradient ungu/biru dan ilustrasi 3D yang tidak berhubungan dengan layanan kesehatan.
- Foto stok dokter yang tersenyum. Untuk dokter fiktif, memakai wajah orang sungguhan justru menyesatkan. Avatar dibuat abstrak dari inisial dan siluet, sehingga jelas ini representasi, bukan foto.
- Font Inter/Poppins/Plus Jakarta yang jadi default banyak template.

## 4. Warna

Token utama:

| Token | Hex | Pemakaian | Kontras |
| --- | --- | --- | --- |
| `--tosca-700` | `#0B5D54` | Judul, tautan, tombol sekunder | 7,75:1 |
| `--tosca-600` | `#0E6E62` | Warna brand, tombol utama | 6,13:1 |
| `--ink` | `#12312E` | Judul dan teks utama | 13,96:1 |
| `--body` | `#3D5654` | Isi paragraf | 7,90:1 |
| `--muted` | `#5C7370` | Catatan kecil | 5,07:1 |
| `--wa` | `#25D366` | Hanya tombol WhatsApp | 6,50:1 dengan teks `#063A1B` |
| `--sand` | `#FBF6EE` | Latar kartu jadwal dan section hangat | — |

Prinsipnya:

- Hijau WhatsApp tidak dipakai untuk dekorasi. Kalau semua tombol hijau, tidak ada yang menonjol.
- Status buka tidak mengandalkan warna saja; ada teks “Buka sekarang” atau “Tutup” dan titik penanda.
- Krem dipakai sebagai aksen, bukan latar seluruh halaman, supaya kesan bersih tetap terjaga.
- Semua pasangan teks utama diuji terhadap WCAG AA. Angkanya juga ditulis di `style-guide.html`.

## 5. Tipografi

- **Gabarito** untuk judul. Bentuknya geometris tapi tidak kaku, terasa ramah untuk klinik keluarga.
- **Figtree** untuk isi. Termasuk nyaman di ukuran kecil dan tidak terlalu lebar di layar HP.
- Skala judul memakai `clamp()`, jadi tidak perlu banyak breakpoint manual.
- Lebar baris dijaga pendek; paragraf panjang dipecah menjadi beberapa bagian.
- Tidak memakai font display dekoratif karena target pembaca bukan audiens fashion/agency.

## 6. Layout dan komponen

- Shell maksimal 1120 px, gutter `clamp(1.25rem, 4vw, 2rem)`.
- Hero dua kolom: teks di kiri, kartu jadwal di kanan. Di bawah 980 px menjadi satu kolom.
- Section bergantian putih, tint tosca, dan krem. Pemisahnya garis, bukan bayangan.
- Baris layanan memakai grid: ikon, judul + deskripsi + tag jadwal, tombol di kanan. Di mobile tombol turun ke bawah.
- Kartu dokter memakai avatar 150 px, nama, poli, jam, dan tombol WhatsApp. Tombol berada di bawah agar mudah dijangkau.
- Jadwal mingguan di desktop berupa baris nama dan jam. Di mobile, jadwal per poli memakai akordeon supaya tidak menjadi tabel sempit.
- Tombol punya empat varian: utama (tosca), WhatsApp (hijau), ghost (outline), dan kecil. Target sentuh minimal 44 px.
- Navbar sticky di atas, tetapi tidak terlalu tinggi. Di mobile, nav berubah menjadi drawer.

Breakpoint:

- 980 px: hero dan grid dua kolom mengecil.
- 900 px: nav desktop disembunyikan, burger muncul.
- 760 px: action bar mobile muncul, tabel jadwal berubah menjadi tampilan akordeon.
- `prefers-reduced-motion`: animasi dan transisi dimatikan.

## 7. WhatsApp sebagai jalur utama

Klinik kecil biasanya memang bekerja lewat WhatsApp. Karena itu WhatsApp diperlakukan sebagai aksi utama, bukan pelengkap.

- **Mobile:** action bar sticky di bawah berisi Telepon dan Chat WhatsApp. Ini selalu terlihat tanpa harus scroll ke atas.
- **Desktop:** floating button di kanan bawah, karena action bar bawah terasa aneh di layar lebar.
- **Pesan otomatis:** setiap tombol mengirim konteks yang berbeda. Tombol di kartu dokter mengisi nama dokter dan poli; tombol di halaman layanan mengisi nama layanan. Petugas tidak perlu bertanya “mau tanya apa?”.
- **Tidak memakai widget chat pihak ketiga:** berat, menambah request, dan biasanya memasang cookie/tracking. Untuk mockup statis, tautan `wa.me` sudah cukup.

Trade-off: floating button bisa menutupi konten di pojok kanan bawah. Body diberi padding bawah di mobile supaya konten terakhir tidak tertutup action bar. Untuk screenshot, elemen sticky disembunyikan agar tidak menjadi artefak.

## 8. Data dan logika status

Data jam operasional dan jadwal praktik ada di `js/main.js`:

- `JAM_BUKA` menyimpan jam buka per hari.
- `PRAKTIK` menyimpan baris praktik per hari.
- `statusSekarang()` menentukan tiga keadaan: buka, belum buka, dan sudah tutup.
- Kalau sudah tutup, fungsi mencari hari berikutnya yang punya jadwal praktik.
- Baris “hari ini” di tabel jadwal ditandai dengan `data-day` dan class `is-today`.

Keterbatasan yang perlu disebut jujur:

- Tabel jadwal mingguan di halaman layanan dan kontak masih statis di HTML. Sumber data di JS hanya untuk kartu beranda dan status buka. Kalau jadwal berubah, keduanya harus disamakan. Untuk produksi, sebaiknya pakai satu JSON dan render kartu serta tabel dari data yang sama.
- Status memakai jam perangkat pengunjung. Pengunjung di luar WIB bisa melihat status yang berbeda dari jam klinik. Perbaikan berikutnya: hitung waktu dengan `Intl.DateTimeFormat` dan `timeZone: "Asia/Jakarta"`.
- Tanpa JavaScript, kartu status diganti pesan fallback dan tautan ke jadwal mingguan. Navigasi dan tabel tetap terbaca.

## 9. Peta

Tiga opsi diuji:

1. **Google Maps embed.** Sering gagal di lingkungan headless karena consent/API key, dan tidak deterministik untuk screenshot.
2. **Iframe OpenStreetMap.** Bisa dirender, tetapi tile lambat dan sering hanya muncul sebagian. Iframe juga menambah request dan berat.
3. **Peta statis dari tile OpenStreetMap.** Dipilih.

Cara membuat:

- Ambil tile OpenStreetMap zoom 16 di sekitar koordinat `-6.3787, 106.8309`.
- Gabungkan 4 × 3 tile, potong menjadi 960 × 640.
- Simpan sebagai JPEG kualitas 82 (182 KB).
- Tambahkan pin CSS di tengah dan atribusi “© OpenStreetMap contributors”.
- Seluruh peta bisa diklik dan membuka OpenStreetMap pada koordinat yang sama.

Trade-off: peta tidak bisa digeser atau di-zoom langsung. Kalau interaktivitas penting, produksi bisa memakai MapTiler/Mapbox dengan API key, atau Leaflet + tile. Untuk kebutuhan “di mana lokasinya”, peta statis sudah cukup dan jauh lebih cepat.

## 10. Aksesibilitas

Yang sudah diterapkan:

- Landmark: `header`, `nav`, `main`, `footer`.
- Satu `h1` per halaman, urutan heading tidak melompat.
- Skip link ke `#main`.
- Fokus terlihat dengan outline 3 px.
- Target sentuh minimal 44 px untuk tombol, tab, link nav, dan tombol akordeon.
- `aria-current="page"` pada nav aktif.
- `aria-expanded` dan `aria-controls` pada burger dan akordeon.
- `aria-live="polite"` pada kartu status, supaya perubahan tidak mengagetkan pembaca layar.
- Status tidak hanya dibedakan dengan warna.
- `prefers-reduced-motion` mematikan animasi dan transisi.
- Teks alternatif pada gambar peta; ikon dekoratif memakai `aria-hidden`.
- Pesan fallback saat JavaScript mati.

Hasil Lighthouse Chrome:

| Halaman | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- |
| Beranda | 100 | 100 | 100 |
| Layanan | 100 | 100 | 100 |
| Tim dokter | 100 | 100 | 100 |
| Kontak | 100 | 100 | 100 |
| Panduan gaya | 100 | 100 | 100 |
| Wireframe | 100 | 100 | 100 |

Kategori Performance tidak muncul di runner Lighthouse yang dipakai, jadi belum ada skor performa. Yang belum diuji: screen reader sungguhan (NVDA/VoiceOver), Safari, Firefox, dan perangkat fisik.

## 11. Performa

- Tanpa framework dan tanpa build step.
- CSS sekitar 23 KB, JavaScript sekitar 8 KB.
- Hanya satu gambar raster: peta 182 KB. Avatar dokter adalah SVG inline, jadi tidak menambah request.
- Peta statis menghindari iframe dan request tile saat halaman dibuka.
- Font dari Google Fonts; ada fallback ke font sistem.
- Tidak ada analytics, cookie, atau script pihak ketiga.

Kalau project ini dilanjutkan, langkah pertama adalah mengukur dengan Lighthouse performance, lalu mempertimbangkan subset font atau self-host font.

## 12. QA

Diuji dengan Chrome desktop 1280 px, tablet 768 px, dan mobile 390 px. Pengecekan terakhir:

- 0 console error dan 0 request gagal di enam halaman.
- Tidak ada horizontal overflow pada 1280, 768, dan 390 px.
- Semua tautan internal dan anchor valid.
- Gambar peta termuat (960 × 640), tidak ada gambar rusak.
- Target sentuh minimum 44 px di mobile.
- Drawer: buka, tutup lewat Escape, fokus kembali ke tombol menu.
- Akordeon jadwal: toggle buka/tutup berfungsi.
- Fallback tanpa JavaScript berfungsi.
- Lighthouse Accessibility/Best Practices/SEO 100 di enam halaman.

QA dilakukan lewat skrip sementara berbasis Chrome DevTools Protocol dan inspeksi visual. Skrip QA belum di-commit sebagai test suite. Kalau project ini masuk tahap produksi, skrip tersebut sebaiknya dijadikan smoke test Playwright.

## 13. Trade-off dan keterbatasan

- Tidak ada form booking karena tidak ada backend. Aksi diarahkan ke WhatsApp.
- Data demo. Nama, nomor, alamat, dan koordinat harus diganti sebelum dipakai.
- Jadwal mingguan masih duplikat di HTML dan JS.
- Status buka memakai zona waktu perangkat.
- Peta statis tidak interaktif.
- Konten diedit langsung di HTML; belum ada CMS.
- Tidak ada analytics, jadi belum ada data konversi.
- Belum ada dark mode.
- Belum di-deploy.

## 14. Bahan interview

Beberapa pertanyaan yang mungkin muncul dan jawaban singkatnya:

**Kenapa tidak pakai React?**
Kebutuhannya statis: empat halaman, satu akordeon, satu drawer, dan satu kartu status. React akan menambah build step dan runtime tanpa manfaat yang sebanding. Kalau nanti ada booking, dashboard, atau data dinamis, baru pertimbangkan framework.

**Kenapa peta tidak pakai Google Maps?**
Google Maps embed tidak deterministik di lingkungan screenshot, butuh consent/API key, dan lebih berat. Peta statis OpenStreetMap cukup untuk menunjukkan lokasi, tetap punya atribusi, dan bisa diklik menuju peta penuh.

**Bagaimana memastikan tampilan tidak rusak di HP?**
Layout diuji pada 390 px dan 768 px, target sentuh diukur minimal 44 px, dan tidak ada overflow horizontal. Tabel jadwal diubah menjadi akordeon karena tabel lebar tidak nyaman di layar sempit.

**Bagaimana data jadwal dikelola?**
Saat ini jam buka dan jadwal kartu beranda ada di satu objek JavaScript, sementara tabel mingguan masih statis di HTML. Untuk produksi, saya akan memindahkan semuanya ke satu JSON atau endpoint, lalu merender kartu dan tabel dari sumber yang sama. Saya juga akan memakai zona waktu Asia/Jakarta.

**Apa keputusan desain yang paling penting?**
Menjadikan status buka dan WhatsApp sebagai jawaban utama di atas lipatan, bukan company profile yang panjang. Untuk klinik, orang datang dengan pertanyaan spesifik, bukan untuk membaca sejarah perusahaan.

**Apa yang belum selesai?**
Deploy, data nyata, form booking, pengujian screen reader, dan automated test. Semuanya dicatat di README supaya tidak terlihat lebih matang dari kenyataannya.
