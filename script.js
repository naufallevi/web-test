// Animasi saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const boxes = document.querySelectorAll(
    ".name, .hobby, .fullname, .myhobby, .description"
  );

  // Fade in animation untuk container
  container.style.opacity = "0";
  container.style.transform = "translateY(20px)";
  container.style.transition = "all 0.8s ease";

  setTimeout(() => {
    container.style.opacity = "1";
    container.style.transform = "translateY(0)";
  }, 100);

  // Animasi stagger untuk setiap box
  boxes.forEach((box, index) => {
    box.style.opacity = "0";
    box.style.transform = "scale(0.9)";
    box.style.transition = "all 0.5s ease";

    setTimeout(() => {
      box.style.opacity = "1";
      box.style.transform = "scale(1)";
    }, 200 + index * 100);
  });
});

// Efek hover yang lebih interaktif
const interactiveBoxes = document.querySelectorAll(
  ".name, .hobby, .fullname, .myhobby"
);

interactiveBoxes.forEach((box) => {
  box.style.cursor = "pointer";
  box.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";

  box.addEventListener("mouseenter", () => {
    box.style.transform = "translateY(-5px)";
    box.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
  });

  box.addEventListener("mouseleave", () => {
    box.style.transform = "translateY(0)";
    box.style.boxShadow = "none";
  });

  // Efek klik dengan ripple
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

// Toggle dark mode
let isDarkMode = false;
const body = document.body;
const container = document.querySelector(".container");

// Buat tombol dark mode
const darkModeBtn = document.createElement("button");
darkModeBtn.textContent = "🌙";
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 1000;
`;

darkModeBtn.addEventListener("mouseenter", () => {
  darkModeBtn.style.transform = "scale(1.1) rotate(15deg)";
  darkModeBtn.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
});

darkModeBtn.addEventListener("mouseleave", () => {
  darkModeBtn.style.transform = "scale(1) rotate(0deg)";
  darkModeBtn.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
});

darkModeBtn.addEventListener("click", () => {
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    body.style.background = "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)";
    container.style.backgroundColor = "#2d3748";
    darkModeBtn.textContent = "☀️";

    document.querySelectorAll(".name, .hobby").forEach((el) => {
      el.style.backgroundColor = "#4a5568";
      el.style.color = "#fff";
    });

    document.querySelectorAll(".fullname, .myhobby").forEach((el) => {
      el.style.backgroundColor = "#2c7a7b";
      el.style.color = "#fff";
    });

    document.querySelector(".description").style.backgroundColor = "#2b6cb0";
    document.querySelector(".description").style.color = "#fff";
  } else {
    body.style.background = "white";
    container.style.backgroundColor = "lightgrey";
    darkModeBtn.textContent = "🌙";

    document.querySelectorAll(".name, .hobby").forEach((el) => {
      el.style.backgroundColor = "lightcoral";
      el.style.color = "black";
    });

    document.querySelectorAll(".fullname, .myhobby").forEach((el) => {
      el.style.backgroundColor = "lightseagreen";
      el.style.color = "black";
    });

    document.querySelector(".description").style.backgroundColor =
      "lightskyblue";
    document.querySelector(".description").style.color = "black";
  }
});

body.appendChild(darkModeBtn);

// Animasi teks typing effect untuk description
const descText = document.querySelector(".description p");
const originalText = descText.textContent;
descText.textContent = "";
let charIndex = 0;

function typeText() {
  if (charIndex < originalText.length) {
    descText.textContent += originalText.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 30);
  }
}

// Mulai typing setelah 1 detik
setTimeout(typeText, 1000);

// CSS untuk ripple effect
const style = document.createElement("style");
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
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
