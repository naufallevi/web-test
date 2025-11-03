// PAGE LOAD ANIMATION
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const boxes = document.querySelectorAll(".name, .hobby, .fullname, .myhobby, .description");

  // CONTAINER FADE + SLIDE IN
  container.style.opacity = "0";
  container.style.transform = "translateY(30px)";
  container.style.transition = "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)";

  requestAnimationFrame(() => {
    setTimeout(() => {
      container.style.opacity = "1";
      container.style.transform = "translateY(0)";
    }, 100);
  });

  // STAGGERED BOX ANIMATION
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

  // START TYPING EFFECT AFTER BOXES DONE
  const typingEffectDelay = lastBoxDelay + 600;
  setTimeout(() => {
    initTypeEffect();
  }, typingEffectDelay);
});

// PARALLAX BACKGROUND
document.addEventListener("mousemove", (e) => {
  const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
  const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
  document.body.style.backgroundPosition = `${50 - moveX / 2}% ${50 - moveY / 2}%`;
});

// 3D HOVER + RIPPLE EFFECT
document.querySelectorAll(".name, .hobby, .fullname, .myhobby").forEach((box) => {
  box.style.cursor = "pointer";
  box.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";

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

  // RIPPLE CLICK EFFECT
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

// DARK MODE TOGGLE + SAVE TO LOCALSTORAGE
const body = document.body;
const container = document.querySelector(".container");
const darkModeBtn = document.createElement("button");
darkModeBtn.textContent = "🌙";
darkModeBtn.className = "dark-mode-btn";
document.body.appendChild(darkModeBtn);

// BUTTON STYLE
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

// CHECK SAVED THEME
let isDarkMode = localStorage.getItem("darkMode") === "true";
applyTheme();

// CLICK EVENT
darkModeBtn.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  localStorage.setItem("darkMode", isDarkMode);
  applyTheme();
  launchImprovedConfetti();
});

// APPLY THEME COLORS
function applyTheme() {
  if (isDarkMode) {
    body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
    container.style.backgroundColor = "#2d3748";
    darkModeBtn.textContent = "☀️";
    setElementStyles("#4a5568", "#2c7a7b", "#2b6cb0", "#fff");
  } else {
    body.style.background = "linear-gradient(135deg, #f5f7fa, #c3cfe2)";
    container.style.backgroundColor = "lightgrey";
    darkModeBtn.textContent = "🌙";
    setElementStyles("lightcoral", "lightseagreen", "lightskyblue", "black");
  }
}

// CHANGE ELEMENT COLORS
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

// CONFETTI EXPLOSION FROM BUTTON
function launchImprovedConfetti() {
  const confettiCount = 60;
  const colors = ["#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1", "#f368e0", "#ff9f43"];
  const btnRect = darkModeBtn.getBoundingClientRect();
  const startX = btnRect.left + btnRect.width / 2;
  const startY = btnRect.top + btnRect.height / 2;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    const velocityX = (Math.random() - 0.5) * 700;
    const velocityY = (Math.random() - 0.7) * 700;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = Math.random() > 0.5 ? "50%" : "0%";
    const scale = Math.random() * 0.5 + 0.5;

    confetti.style.position = "fixed";
    confetti.style.left = `${startX}px`;
    confetti.style.top = `${startY}px`;
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor = color;
    confetti.style.borderRadius = shape;
    confetti.style.opacity = "1";
    confetti.style.pointerEvents = "none";
    confetti.style.setProperty("--velocity-x", `${velocityX}px`);
    confetti.style.setProperty("--velocity-y", `${velocityY}px`);
    confetti.style.setProperty("--rotation-end", `${Math.random() * 720}deg`);
    confetti.style.setProperty("--scale-end", scale);
    confetti.style.animation = "confetti-fall 1.5s ease-out forwards";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1500);
  }
}

// TYPING EFFECT
const descText = document.querySelector(".description p");
const originalText = descText.textContent.trim();
descText.textContent = "";
let charIndex = 0;

function initTypeEffect() {
  if (charIndex > 0) return;
  (function typeEffect() {
    if (charIndex < originalText.length) {
      descText.textContent += originalText[charIndex++];
      setTimeout(typeEffect, 25);
    }
  })();
}

// EXTRA CSS (RIPPLE + CONFETTI ANIMATION)
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
  @keyframes confetti-fall {
    0% {
      transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translate(
        calc(-50% + var(--velocity-x)),
        calc(-50% + var(--velocity-y) + 400px)
      ) scale(var(--scale-end)) rotate(var(--rotation-end));
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);