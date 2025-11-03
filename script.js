// ANIMASI SAAT LOAD
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const boxes = document.querySelectorAll(".name, .hobby, .fullname, .myhobby, .description");

  container.style.opacity = "0";
  container.style.transform = "translateY(40px)";
  container.style.transition = "all 1s ease-out";

  requestAnimationFrame(() => {
    setTimeout(() => {
      container.style.opacity = "1";
      container.style.transform = "translateY(0)";
    }, 200);
  });

  boxes.forEach((box, i) => {
    box.style.opacity = "0";
    box.style.transform = "translateY(20px)";
    box.style.transition = `all 0.6s ease-out ${i * 0.2}s`;

    requestAnimationFrame(() => {
      setTimeout(() => {
        box.style.opacity = "1";
        box.style.transform = "translateY(0)";
      }, i * 150);
    });
  });
});

// PARALLAX BACKGROUND
document.addEventListener("mousemove", (e) => {
  const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
  const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
  document.body.style.backgroundPosition = `${50 - moveX / 2}% ${50 - moveY / 2}%`;
});

// HOVER 3D + RIPPLE EFEK
document.querySelectorAll(".name, .hobby, .fullname, .myhobby").forEach((box) => {
  box.style.cursor = "pointer";

  box.addEventListener("mousemove", (e) => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    box.style.transform = `rotateX(${-y / 15}deg) rotateY(${x / 15}deg) scale(1.05)`;
    box.style.boxShadow = "0 15px 30px rgba(0,0,0,0.3)";
  });

  box.addEventListener("mouseleave", () => {
    box.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    box.style.boxShadow = "none";
  });

  box.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.classList.add("ripple");
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// DARK MODE TOGGLE
const body = document.body;
const container = document.querySelector(".container");
const darkModeBtn = document.createElement("button");

darkModeBtn.textContent = "🌙";
darkModeBtn.className = "dark-mode-btn";
document.body.appendChild(darkModeBtn);

darkModeBtn.style.cssText = `
  position: fixed;
  top: 20px;
  right: 20px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 26px;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(118, 75, 162, 0.5);
  transition: all 0.4s ease;
  z-index: 1000;
`;

darkModeBtn.addEventListener("mouseenter", () => {
  darkModeBtn.style.transform = "scale(1.15)";
  darkModeBtn.style.boxShadow = "0 0 25px rgba(118,75,162,0.8)";
});
darkModeBtn.addEventListener("mouseleave", () => {
  darkModeBtn.style.transform = "scale(1)";
  darkModeBtn.style.boxShadow = "0 0 15px rgba(118,75,162,0.5)";
});

let isDarkMode = localStorage.getItem("darkMode") === "true";
applyTheme();

darkModeBtn.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  localStorage.setItem("darkMode", isDarkMode);
  applyTheme();
  triggerConfetti();
});

function applyTheme() {
  if (isDarkMode) {
    body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
    container.style.backgroundColor = "#2d3748";
    darkModeBtn.textContent = "☀️";
    setColors("#4a5568", "#2c7a7b", "#2b6cb0", "#fff");
  } else {
    body.style.background = "linear-gradient(135deg, #f5f7fa, #c3cfe2)";
    container.style.backgroundColor = "lightgrey";
    darkModeBtn.textContent = "🌙";
    setColors("lightcoral", "lightseagreen", "lightskyblue", "#222");
  }
}

function setColors(primary, secondary, desc, textColor) {
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

// CONFETTI
function triggerConfetti() {
  for (let i = 0; i < 20; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti";
    document.body.appendChild(conf);
    const size = Math.random() * 10 + 6;
    conf.style.width = conf.style.height = `${size}px`;
    conf.style.left = Math.random() * 100 + "vw";
    conf.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
    conf.style.animation = `fall ${1.5 + Math.random()}s linear forwards`;
    setTimeout(() => conf.remove(), 2500);
  }
}

// TYPING EFFECT
const descText = document.querySelector(".description p");
const text = descText.textContent.trim();
descText.textContent = "";
let idx = 0;
(function type() {
  if (idx < text.length) {
    descText.textContent += text[idx++];
    setTimeout(type, 25);
  }
})();

// STYLE TAMBAHAN
const style = document.createElement("style");
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }
  @keyframes ripple {
    to { transform: scale(2.5); opacity: 0; }
  }

  .confetti {
    position: fixed;
    top: -10px;
    border-radius: 50%;
    opacity: 0.8;
  }
  @keyframes fall {
    to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
`;
document.head.appendChild(style);
