document.addEventListener("DOMContentLoaded", () => {

document.querySelectorAll("[data-scroll-to]").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const target = btn.getAttribute("data-scroll-to");
    lenis.scrollTo(target, {
      offset: -80,   // если есть фикс-хедер
      duration: 3,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  });
});


  const toTopBtn = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    toTopBtn.classList.add("show");
  } else {
    toTopBtn.classList.remove("show");
  }
});

  /* ================= TEXT ================= */

  const text = "{ Вебсайты работающие на вас }";
  const el = document.getElementById("typing");

  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, 45);
    }
  }
  type();

  let textMouseX = 0;
  let textMouseY = 0;
  let textX = 0;
  let textY = 0;
  let t = 0;

  function animateText() {
    t += 0.01;

    const floatX = Math.sin(t) * 4;
    const floatY = Math.cos(t * 0.8) * 6;

    textX += (textMouseX - textX) * 0.08;
    textY += (textMouseY - textY) * 0.08;

    el.style.transform = `translate(${textX + floatX}px, ${textY + floatY}px)`;

    requestAnimationFrame(animateText);
  }

  animateText();

  const subtitle = document.querySelector(".l2");
  const subtitle1 = document.querySelector(".l3");

setTimeout(() => {
  subtitle.classList.add("show");
}, 1700);
setTimeout(() => {
  subtitle1.classList.add("show");
}, 1800);





  /* ================= CANVAS ================= */

  const canvas = document.getElementById("bg");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  resize();
  addEventListener("resize", resize);

  const mouse = { x: 0, y: 0 };

  addEventListener("mousemove", e => {
    mouse.x = (e.clientX / innerWidth - 0.5) * 15;
    mouse.y = (e.clientY / innerHeight - 0.5) * 15;

    textMouseX = mouse.x * 0.6;
    textMouseY = mouse.y * 0.6;
  });

  const MIN_FADE = 0.001;
  const MAX_FADE = 0.004;
const NUM_TRIANGLES = window.innerWidth <= 768 ? 14 : 24;
  class Triangle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = window.innerWidth <= 768
  ? 10 + Math.random() * 40
  : 20 + Math.random() * 80;
      this.opacity = 0;
      this.fade = Math.random() * (MAX_FADE - MIN_FADE) + MIN_FADE;
      this.rotation = Math.random() * Math.PI;
      this.rotationSpeed = (Math.random() - 0.5) * 0.002;
      this.vx = (Math.random() - 0.5) * 0.15;
      this.vy = (Math.random() - 0.5) * 0.15;
      this.depth = 0.3 + Math.random() * 0.7;
    }

    update() {
      this.opacity += this.fade;
      if (this.opacity >= 1) this.fade = -this.fade;
      if (this.opacity <= 0) this.reset();

      this.x += this.vx;
      this.y += this.vy;

      const px = mouse.x * this.depth;
      const py = mouse.y * this.depth;

      this.rotation += this.rotationSpeed;

      this.draw(px, py);
    }

    draw(px, py) {
      ctx.save();
      ctx.translate(this.x + px, this.y + py);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity * 0.15;

      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.lineTo(this.size * 0.9, this.size);
      ctx.lineTo(-this.size * 0.9, this.size);
      ctx.closePath();

      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.restore();
    }
  }

  const triangles = Array.from({ length: NUM_TRIANGLES }, () => new Triangle());

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    triangles.forEach(t => t.update());
    requestAnimationFrame(animateCanvas);
  }

  animateCanvas();


function highlightJS(code) {
  return code
    // комментарии
    .replace(/(\/\/.*)/g, '<span class="code-comment">$1</span>')
    // строки
    .replace(/(["'`].*?["'`])/g, '<span class="code-string">$1</span>')
    // ключевые слова
    .replace(
      /\b(const|let|var|function|return|if|else|for|while|import|from|export|class|new|useEffect)\b/g,
      '<span class="code-keyword">$1</span>'
    )
    // числа
    .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>')
    // функции
    .replace(/\b([a-zA-Z_$][\w$]*)\s*(?=\()/g, '<span class="code-function">$1</span>');
}

    /* ================= CODE STREAM ================= */

  const jsCode = `
import { useEffect } from "react";

function useParallax(strength = 0.15) {
  const pos = { x: 0, y: 0 };

  document.addEventListener("mousemove", e => {
    pos.x += (e.clientX - pos.x) * strength;
    pos.y += (e.clientY - pos.y) * strength;
  });

  return pos;
}

export function Hero() {
  const mouse = useParallax();

  useEffect(() => {
    console.log("render");
  }, []);

  return <section className="hero" />;
}
`;

  const codeEl = document.getElementById("js-stream");
  const codeContainer = codeEl?.parentElement;

  if (codeEl && codeContainer) {
    let index = 0;

    function streamCode() {
      codeEl.textContent += jsCode[index];
      index++;

      codeContainer.scrollTop = codeContainer.scrollHeight;

      if (index >= jsCode.length) {
        index = 0;
        codeEl.textContent += "\n\n";
      }

      setTimeout(streamCode, 25 + Math.random() * 30);
    }

    streamCode();
  }

  const lenis = new Lenis({
  duration: 1.2,        // плавность (1–1.5 как в Framer)
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const container = document.querySelector('.marquee-section');
let items = Array.from(document.querySelectorAll('.item'));

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateSequence() {

  // 🔹 1. Затухание по порядку (1 → 2 → 3)
  for (let i = 0; i < items.length; i++) {
    items[i].classList.add('fade');
    await delay(200);
  }

  await delay(400);

  // 🔹 2. Перемешиваем DOM
  items = shuffle(items);
  items.forEach(item => container.appendChild(item));

  await delay(100);

  // 🔹 3. Появление в обратном порядке (3 → 2 → 1)
  for (let i = items.length - 1; i >= 0; i--) {
    items[i].classList.remove('fade');
    await delay(200);
  }

  await delay(1500);

  animateSequence(); // запускаем снова
}

animateSequence();

document.querySelectorAll(".faq-item").forEach(item => {
  const question = item.querySelector(".question");
  const answer = item.querySelector(".answer");

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    // закрываем все (если нужен один открытый)
    document.querySelectorAll(".faq-item").forEach(i => {
      i.classList.remove("open");
      i.querySelector(".answer").style.height = "0px";
    });

    if (!isOpen) {
      item.classList.add("open");
      answer.style.height = answer.scrollHeight + 20 + "px";
    }
  });
});


});
