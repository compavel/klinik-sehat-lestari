/* ==========================================================================
   Klinik Sehat Lestari
   Satu file, tanpa dependency. Navigasi, halaman layanan, dan jadwal mingguan
   tetap terbaca tanpa JS. JS hanya menambah status "buka sekarang", jadwal
   hari ini di beranda, menu mobile, dan akordeon.
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     Data jadwal untuk kartu beranda dan status buka (data demo — lihat README).
     Tabel jadwal mingguan di halaman layanan/kontak masih statis di HTML;
     kalau jadwal berubah, samakan keduanya.
     ---------------------------------------------------------------------- */
  var HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  /* jam operasional keseluruhan per hari (indeks sama dengan Date.getDay) */
  var JAM_BUKA = {
    0: ["08.00", "12.00"],
    1: ["07.00", "21.00"],
    2: ["07.00", "21.00"],
    3: ["07.00", "21.00"],
    4: ["07.00", "21.00"],
    5: ["07.00", "21.00"],
    6: ["08.00", "13.00"]
  };

  /* baris praktik per hari */
  var PRAKTIK = {
    0: [["Poli Umum", "dr. Dimas Ardhana", "08.00", "12.00"]],
    1: [
      ["Laboratorium", "dr. Endah Kusumastuti, Sp.PK", "07.00", "12.00"],
      ["Poli Umum", "dr. Anindita Prameswari", "08.00", "14.00"],
      ["Poli Umum", "dr. Dimas Ardhana", "14.00", "21.00"],
      ["Poli Gigi", "drg. Bagas Nugraha", "15.00", "20.00"]
    ],
    2: [
      ["Laboratorium", "dr. Endah Kusumastuti, Sp.PK", "07.00", "12.00"],
      ["Poli Umum", "dr. Anindita Prameswari", "08.00", "14.00"],
      ["Poli Umum", "dr. Dimas Ardhana", "14.00", "21.00"],
      ["Poli Anak", "dr. Cahya Wulandari, Sp.A", "16.00", "20.00"]
    ],
    3: [
      ["Laboratorium", "dr. Endah Kusumastuti, Sp.PK", "07.00", "12.00"],
      ["Poli Umum", "dr. Anindita Prameswari", "08.00", "14.00"],
      ["Poli Umum", "dr. Dimas Ardhana", "14.00", "21.00"],
      ["Poli Gigi", "drg. Bagas Nugraha", "15.00", "20.00"]
    ],
    4: [
      ["Laboratorium", "dr. Endah Kusumastuti, Sp.PK", "07.00", "12.00"],
      ["Poli Umum", "dr. Anindita Prameswari", "08.00", "14.00"],
      ["Poli Umum", "dr. Dimas Ardhana", "14.00", "21.00"],
      ["Poli Anak", "dr. Cahya Wulandari, Sp.A", "16.00", "20.00"]
    ],
    5: [
      ["Laboratorium", "dr. Endah Kusumastuti, Sp.PK", "07.00", "12.00"],
      ["Poli Umum", "dr. Anindita Prameswari", "08.00", "14.00"],
      ["Poli Umum", "dr. Dimas Ardhana", "14.00", "21.00"],
      ["Poli Gigi", "drg. Bagas Nugraha", "15.00", "20.00"]
    ],
    6: [
      ["Poli Umum", "dr. Anindita Prameswari", "08.00", "13.00"],
      ["Poli Gigi", "drg. Bagas Nugraha", "09.00", "13.00"],
      ["Poli Anak", "dr. Cahya Wulandari, Sp.A", "09.00", "13.00"]
    ]
  };

  /* ----------------------------------------------------------------------
     Bantu: bandingkan jam "08.00" dengan waktu sekarang
     ---------------------------------------------------------------------- */
  function keMenit(teks) {
    var bagian = teks.split(".");
    return parseInt(bagian[0], 10) * 60 + parseInt(bagian[1], 10);
  }

  function statusSekarang(sekarang) {
    var hari = sekarang.getDay();
    var menit = sekarang.getHours() * 60 + sekarang.getMinutes();
    var jam = JAM_BUKA[hari];
    var buka = keMenit(jam[0]);
    var tutup = keMenit(jam[1]);

    if (menit >= buka && menit < tutup) {
      return { buka: true, teks: "Buka sekarang", detail: "tutup pukul " + jam[1] };
    }

    if (menit < buka) {
      return { buka: false, teks: "Belum buka", detail: "buka pukul " + jam[0] };
    }

    /* sudah tutup: cari hari berikutnya yang punya jam praktik */
    for (var i = 1; i <= 7; i++) {
      var berikut = (hari + i) % 7;
      if (PRAKTIK[berikut] && PRAKTIK[berikut].length) {
        return {
          buka: false,
          teks: "Tutup",
          detail: (i === 1 ? "besok" : HARI[berikut]) + " buka pukul " + JAM_BUKA[berikut][0]
        };
      }
    }
    return { buka: false, teks: "Tutup", detail: "" };
  }

  /* ----------------------------------------------------------------------
     1. Kartu "Jadwal hari ini" di beranda
     ---------------------------------------------------------------------- */
  var kartuHariIni = document.querySelector("[data-today-card]");
  if (kartuHariIni) {
    var sekarang = new Date();
    var hariIni = sekarang.getDay();
    var status = statusSekarang(sekarang);

    var judul = kartuHariIni.querySelector("[data-today-title]");
    var lencana = kartuHariIni.querySelector("[data-today-status]");
    var daftar = kartuHariIni.querySelector("[data-today-list]");
    var catatan = kartuHariIni.querySelector("[data-today-foot]");

    judul.textContent = "Jadwal " + HARI[hariIni];

    lencana.className = "status " + (status.buka ? "status--open" : "status--closed");
    lencana.innerHTML =
      '<span class="status__dot" aria-hidden="true"></span>' +
      status.teks +
      (status.detail ? " — " + status.detail : "");

    var baris = PRAKTIK[hariIni] || [];
    if (!baris.length) {
      daftar.innerHTML = '<li class="today__row"><span>Hari ini tidak ada jadwal praktik.</span></li>';
    } else {
      daftar.innerHTML = baris
        .map(function (b) {
          return (
            '<li class="today__row">' +
            '<span><span class="today__poli">' + b[0] + "</span>" +
            '<br><span class="today__who">' + b[1] + "</span></span>" +
            '<span class="today__hours">' + b[2] + " – " + b[3] + "</span>" +
            "</li>"
          );
        })
        .join("");
    }

    catatan.textContent =
      "Jam laboratorium berbeda. Jadwal dapat berubah pada hari libur nasional — konfirmasi lewat WhatsApp.";
  }

  /* ----------------------------------------------------------------------
     2. Tandai baris "hari ini" pada tabel jadwal
     ---------------------------------------------------------------------- */
  var hariSekarang = new Date().getDay();
  document.querySelectorAll("[data-day]").forEach(function (el) {
    if (parseInt(el.getAttribute("data-day"), 10) === hariSekarang) {
      el.classList.add("is-today");
    }
  });

  /* ----------------------------------------------------------------------
     3. Menu mobile
     ---------------------------------------------------------------------- */
  var tombolMenu = document.querySelector("[data-menu-toggle]");
  var laci = document.querySelector("[data-drawer]");

  if (tombolMenu && laci) {
    tombolMenu.addEventListener("click", function () {
      var terbuka = tombolMenu.getAttribute("aria-expanded") === "true";
      tombolMenu.setAttribute("aria-expanded", String(!terbuka));
      laci.classList.toggle("is-open", !terbuka);
    });

    laci.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        tombolMenu.setAttribute("aria-expanded", "false");
        laci.classList.remove("is-open");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && laci.classList.contains("is-open")) {
        tombolMenu.setAttribute("aria-expanded", "false");
        laci.classList.remove("is-open");
        tombolMenu.focus();
      }
    });
  }

  /* ----------------------------------------------------------------------
     4. Akordeon jadwal (tampilan mobile)
     ---------------------------------------------------------------------- */
  document.querySelectorAll(".acc__btn").forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      var terbuka = tombol.getAttribute("aria-expanded") === "true";
      tombol.setAttribute("aria-expanded", String(!terbuka));
      var panel = document.getElementById(tombol.getAttribute("aria-controls"));
      if (panel) panel.hidden = terbuka;
    });
  });

  /* ----------------------------------------------------------------------
     5. Dialog demo WhatsApp
     Nomor WhatsApp di situs ini fiktif. Kalau link wa.me nomor demo
     diklik, browser bisa menyerahkan tab ke aplikasi WhatsApp lalu
     meninggalkan halaman kosong. Dialog ini menjelaskan situasinya dan
     tetap menyediakan tautan keluar kalau pengunjung ingin mencoba.
     ---------------------------------------------------------------------- */
  var NOMOR_WA_DEMO = "6281234567890";
  var dialogWa = null;

  function buatDialogWa() {
    if (!("showModal" in document.createElement("dialog"))) return null;

    var dialog = document.createElement("dialog");
    dialog.className = "wa-demo";
    dialog.setAttribute("aria-labelledby", "wa-demo-judul");
    dialog.setAttribute("aria-describedby", "wa-demo-deskripsi");
    dialog.innerHTML =
      '<div class="wa-demo__body">' +
        '<p class="wa-demo__eyebrow">Mode demo</p>' +
        '<h2 class="wa-demo__title" id="wa-demo-judul">WhatsApp belum tersambung</h2>' +
        '<p class="wa-demo__text" id="wa-demo-deskripsi">Nomor 0812-3456-7890 di situs ini fiktif, jadi pesan tidak akan sampai ke klinik. Di versi produksi, tombol ini langsung membuka WhatsApp dengan pesan yang sudah terisi.</p>' +
        '<p class="wa-demo__label">Pesan yang akan terisi</p>' +
        '<p class="wa-demo__message" data-wa-message></p>' +
        '<div class="wa-demo__actions">' +
          '<button class="btn btn--ghost" type="button" data-wa-close>Tutup</button>' +
          '<a class="btn btn--wa" data-wa-continue href="#" target="_blank" rel="noopener noreferrer">Buka WhatsApp (demo)</a>' +
        '</div>' +
      '</div>';

    document.body.appendChild(dialog);

    dialog.querySelector("[data-wa-close]").addEventListener("click", function () {
      dialog.close();
    });

    dialog.addEventListener("click", function (e) {
      if (e.target !== dialog) return;
      var kotak = dialog.getBoundingClientRect();
      var diLuar =
        e.clientX < kotak.left ||
        e.clientX > kotak.right ||
        e.clientY < kotak.top ||
        e.clientY > kotak.bottom;
      if (diLuar) dialog.close();
    });

    dialog.addEventListener("close", function () {
      document.documentElement.classList.remove("is-dialog-open");
    });

    return dialog;
  }

  function nomorWaDemo(href) {
    try {
      var url = new URL(href);
      if (url.hostname !== "wa.me" && url.hostname !== "www.wa.me") return false;
      return url.pathname.replace(/\D/g, "") === NOMOR_WA_DEMO;
    } catch (e) {
      return false;
    }
  }

  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href*="wa.me/"]');
    if (!link) return;

    /* Tautan di dalam dialog dibiarkan membuka WhatsApp seperti biasa. */
    if (link.closest(".wa-demo")) {
      if (dialogWa) dialogWa.close();
      return;
    }

    if (!nomorWaDemo(link.href)) return;
    if (!dialogWa) dialogWa = buatDialogWa();
    if (!dialogWa) return;

    e.preventDefault();

    var pesan = "";
    try {
      pesan = new URL(link.href).searchParams.get("text") || "";
    } catch (err) {
      pesan = "";
    }

    dialogWa.querySelector("[data-wa-message]").textContent = pesan;
    dialogWa.querySelector("[data-wa-continue]").href = link.href;
    document.documentElement.classList.add("is-dialog-open");
    if (!dialogWa.open) dialogWa.showModal();
    dialogWa.querySelector("[data-wa-close]").focus();
  });
})();
