/* ==========================================================================
   Klinik Sehat Lestari
   Satu file, tanpa dependency. Semua interaksi tetap jalan tanpa JS:
   HTML sudah memuat jadwal lengkap; JS hanya menambah status "buka sekarang"
   dan penyaringan tampilan.
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     Data jadwal (data demo — lihat README)
     Sumber tunggal supaya kartu "Jadwal hari ini" dan status buka tidak
     pernah berbeda dengan tabel di halaman kontak.
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

    judul.textContent = "Jadwal " + HARI[hariIni].toLowerCase();

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
      el.classList.add(el.tagName === "TR" ? "is-today" : "is-today");
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
     4. Tab (filter dokter & jadwal per poli)
     ---------------------------------------------------------------------- */
  document.querySelectorAll("[data-tabs]").forEach(function (grup) {
    var tombol = grup.querySelectorAll('[role="tab"]');

    function pilih(target) {
      tombol.forEach(function (t) {
        var aktif = t === target;
        t.setAttribute("aria-selected", String(aktif));
        t.tabIndex = aktif ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !aktif;
      });
    }

    tombol.forEach(function (t) {
      t.addEventListener("click", function () { pilih(t); });
      t.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        var daftar = Array.prototype.slice.call(tombol);
        var i = daftar.indexOf(t);
        var berikut = e.key === "ArrowRight" ? (i + 1) % daftar.length : (i - 1 + daftar.length) % daftar.length;
        daftar[berikut].focus();
        pilih(daftar[berikut]);
        e.preventDefault();
      });
    });
  });

  /* ----------------------------------------------------------------------
     5. Akordeon jadwal (tampilan mobile)
     ---------------------------------------------------------------------- */
  document.querySelectorAll(".acc__btn").forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      var terbuka = tombol.getAttribute("aria-expanded") === "true";
      tombol.setAttribute("aria-expanded", String(!terbuka));
      var panel = document.getElementById(tombol.getAttribute("aria-controls"));
      if (panel) panel.hidden = terbuka;
    });
  });
})();
