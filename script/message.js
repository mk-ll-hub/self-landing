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

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch("https://formspree.io/f/xkovagrw", {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    alert("Сообщение отправлено!");
    form.reset();
  } else {
    alert("Ошибка отправки");
  }
});
});
