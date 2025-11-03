// ================================
// 🌟 Animasi Halaman Saat Dimuat
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const boxes = document.querySelectorAll(
    ".name, .hobby, .fullname, .myhobby, .description"
  );

  // Fade + Slide-in untuk container
  container.style.opacity = "0";
  container.style.transform = "translateY(30px)";
  container.style.transition = "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)";

  requestAnimationFrame(() => {
    setTimeout(() => {
      container.style.opacity = "1";
      container.style.transform = "translateY(0)";
    }, 100);
  });

  // Staggered animation untuk tiap box
  let lastBoxDelay = 0;
  boxes.forEach((box, i) => {
    box.style.opacity = "0";
    box.style.transform = "scale(0.9)";
    box.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";

    const delay = 250 + i * 120;
    setTimeout(() => {
      box.style.opacity = "1";
      box.style.transform = "scale(1)";
    }, delay);
    lastBoxDelay = delay;
  });

  // =========================================================
  // PENYESUAIAN 1: Menunda Efek Mengetik
  // Kita mulai efek mengetik HANYA SETELAH animasi kotak terakhir
  // selesai (delay + durasi animasi 600ms)
  // =========================================================
  const typingEffectDelay = lastBoxDelay + 600; // Mulai setelah box terakhir muncul
  setTimeout(() => {
    initTypeEffect();
  }, typingEffectDelay);
});

// =====================================
// 🎨 Efek Hover Interaktif dengan 3D tilt
// =====================================
document.querySelectorAll(".name, .hobby, .fullname, .myhobby").forEach((box) => {
  box.style.cursor = "pointer";
  box.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
  box.style.perspective = "1000px";

  box.addEventListener("mousemove", (e) => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    box.style.transform = `rotateX(${-y / 20}deg) rotateY(${x / 20}deg) scale(1.03)`;
    box.style.boxShadow = "0 12px 25px rgba(0,0,0,0.25)";
  });

  box.addEventListener("mouseleave", () => {
    box.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    box.style.boxShadow = "none";
  });

  // Ripple effect saat klik
  box.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// ================================
// 🌗 Dark Mode Toggle + LocalStorage
// ================================
const body = document.body;
const container = document.querySelector(".container");

const darkModeBtn = document.createElement("button");
darkModeBtn.textContent = "🌙";
darkModeBtn.className = "dark-mode-btn";
document.body.appendChild(darkModeBtn);

// Gaya tombol dark mode
darkModeBtn.style.cssText = `
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  z-index: 1000;
`;

darkModeBtn.addEventListener("mouseenter", () => {
  darkModeBtn.style.transform = "scale(1.15) rotate(15deg)";
});
darkModeBtn.addEventListener("mouseleave", () => {
  darkModeBtn.style.transform = "scale(1) rotate(0deg)";
});

// Cek preferensi tersimpan
let isDarkMode = localStorage.getItem("darkMode") === "true";
applyTheme();

darkModeBtn.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  localStorage.setItem("darkMode", isDarkMode);
  applyTheme();
  // =========================================================
  // PENYESUAIAN 2: Memanggil fungsi confetti yang baru
  // =========================================================
  launchImprovedConfetti(); // Mengganti launchConfetti()
});

function applyTheme() {
  if (isDarkMode) {
    body.style.background = "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)";
    container.style.backgroundColor = "#2d3748";
    darkModeBtn.textContent = "☀️";
    setElementStyles("#4a5568", "#2c7a7b", "#2b6cb0", "#fff");
  } else {
    body.style.background = "white";
    container.style.backgroundColor = "lightgrey";
    darkModeBtn.textContent = "🌙";
    setElementStyles("lightcoral", "lightseagreen", "lightskyblue", "black");
  }
}

function setElementStyles(primary, secondary, desc, textColor) {
  document.querySelectorAll(".name, .hobby").forEach((el) => {
    el.style.backgroundColor = primary;
    el.style.color = textColor;
  });
  document.querySelectorAll(".fullname, .myhobby").forEach((el) => {
    el.style.backgroundColor = secondary;
    el.style.color = textColor;
  });
  const descEl = document.querySelector(".description");
  descEl.style.backgroundColor = desc;
  descEl.style.color = textColor;
}

// =========================================================
// PENYESUAIAN 2: Fungsi Confetti Baru yang Lebih Baik
// =========================================================
function launchImprovedConfetti() {
  const confettiCount = 60; // Jumlah partikel
  const colors = ["#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1", "#f368e0", "#ff9f43"];
  
  // Dapatkan posisi tombol sebagai titik awal ledakan
  const btnRect = darkModeBtn.getBoundingClientRect();
  const startX = btnRect.left + btnRect.width / 2;
  const startY = btnRect.top + btnRect.height / 2;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti"; // Kita akan gunakan kelas .confetti yang ada
    
    // Properti acak untuk setiap partikel
    const velocityX = (Math.random() - 0.5) * 700; // Kecepatan horizontal (kiri/kanan)
    const velocityY = (Math.random() - 0.7) * 700; // Kecepatan vertikal (lebih ke atas)
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = Math.random() > 0.5 ? '50%' : '0%'; // Bulat atau kotak
    const scale = Math.random() * 0.5 + 0.5; // Ukuran 0.5x sampai 1.0x

    // Terapkan gaya langsung ke elemen
    confetti.style.position = "fixed"; // Pastikan position fixed
    confetti.style.left = `${startX}px`;
    confetti.style.top = `${startY}px`;
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor = color;
    confetti.style.borderRadius = shape;
    confetti.style.opacity = "1";
    confetti.style.transform = "scale(0.5)"; // Mulai dari kecil
    confetti.style.pointerEvents = "none";
    
    // Simpan properti unik di CSS variables agar bisa diakses di @keyframes
    confetti.style.setProperty("--velocity-x", `${velocityX}px`);
    confetti.style.setProperty("--velocity-y", `${velocityY}px`);
    confetti.style.setProperty("--rotation-end", `${Math.random() * 720}deg`);
    confetti.style.setProperty("--scale-end", scale);

    // Gunakan animasi 'confetti-fall' yang akan kita definisikan ulang
    confetti.style.animation = "confetti-fall 1.5s ease-out forwards";

    document.body.appendChild(confetti);

    // Hapus partikel setelah animasi selesai
    setTimeout(() => confetti.remove(), 1500); 
  }
}
// Hapus fungsi launchConfetti() yang lama
/*
function launchConfetti() {
  const confetti = document.createElement("div");
  confetti.className = "confetti";
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 1200);
}
*/

// ================================
// ⌨️ Efek Mengetik untuk Deskripsi
// ================================
const descText = document.querySelector(".description p");
const originalText = descText.textContent.trim();
descText.textContent = "";
let charIndex = 0;

// Kita ubah ini menjadi fungsi agar bisa dipanggil nanti
function initTypeEffect() {
  if (charIndex > 0) return; // Jangan jalankan lagi jika sudah berjalan

  (function typeEffect() {
    if (charIndex < originalText.length) {
      descText.textContent += originalText[charIndex++];
      setTimeout(typeEffect, 25);
    }
  })();
}

// Hapus pemanggilan fungsi otomatis di sini
// (function typeEffect() { ... })(); // INI DIHAPUS

// ================================
// 💧 CSS Ripple + Confetti
// ================================
const style = document.createElement("style");
// =========================================================
// PENYESUAIAN 3: Memperbarui CSS yang Di-Inject
// =========================================================
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  @keyframes ripple-animation {
    to { transform: scale(2); opacity: 0; }
  }

  /* CSS .confetti yang lama dihapus dan diganti dengan ini */
  /* Kita tidak perlu lagi style .confetti di sini karena gayanya */
  /* diatur langsung di JS, TAPI kita perlu @keyframes-nya */

  /* Animasi baru untuk ledakan confetti */
  @keyframes confetti-fall {
    0% {
      /* Mulai dari tombol, skala kecil, opacity penuh */
      transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
      opacity: 1;
    }
    100% {
      /* Bergerak ke tujuan acak, jatuh ke bawah (gravitasi), */
      /* berputar, membesar/mengecil, dan menghilang */
      transform: translate(
          calc(-50% + var(--velocity-x)), 
          calc(-50% + var(--velocity-y) + 400px) /* Tambah 'gravitasi' 400px */
        ) 
        scale(var(--scale-end)) 
        rotate(var(--rotation-end));
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
