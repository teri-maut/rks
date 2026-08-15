/**
 * Cinematic Raksha Bandhan Gift Engine
 * Pure Vanilla JavaScript - 100% Standalone
 */

(function () {
  "use strict";

  const TOTAL_FRAMES = 120;
  const FRAME_PREFIX = "./frames/ezgif-frame-";
  const FRAME_EXT = ".jpg";
  const SCHOOL_PHOTO_SRC = "./images/school-memory.jpg";

  // Story Chapters & Ranges
  const STORY_SECTIONS = [
    { id: "hero-scene", range: [0.0, 0.08] },
    { id: "mem-1", range: [0.08, 0.21] },
    { id: "mem-2", range: [0.22, 0.35] },
    { id: "mem-3", range: [0.36, 0.49] },
    { id: "mem-4", range: [0.50, 0.63] },
    { id: "mem-5", range: [0.64, 0.76] },
    { id: "photo-card", range: [0.77, 0.89] },
    { id: "climax-scene", range: [0.90, 0.95] },
    { id: "finale-scene", range: [0.95, 1.0] },
  ];

  const loadedFrames = [];
  let currentFrame = 0;
  let targetFrame = 0;
  let scrollProgress = 0;
  let isPlayingAudio = false;

  // DOM Elements
  const preloader = document.getElementById("preloader");
  const preloaderText = document.getElementById("preloader-pct");
  const preloaderCircle = document.getElementById("preloader-circle");
  const danceCanvas = document.getElementById("dance-canvas");
  const particleCanvas = document.getElementById("particle-canvas");
  const audioEl = document.getElementById("audio-player");
  const audioBtn = document.getElementById("audio-toggle");
  const audioLabel = document.getElementById("audio-label");
  const sendBlessingBtn = document.getElementById("send-blessing-btn");
  const replayBtn = document.getElementById("replay-btn");
  const dockPills = document.querySelectorAll(".dock-pill");

  // =========================================================================
  // 1. PRELOADER & ASSET CACHING
  // =========================================================================
  function initPreloader() {
    let loadedCount = 0;
    const totalAssets = TOTAL_FRAMES + 1; // 120 frames + 1 school photo

    function updateProgress() {
      loadedCount++;
      const pct = Math.round((loadedCount / totalAssets) * 100);
      if (preloaderText) preloaderText.textContent = pct + "%";
      if (preloaderCircle) {
        const offset = 326.7 - (326.7 * pct) / 100;
        preloaderCircle.style.strokeDashoffset = offset;
      }

      if (loadedCount >= totalAssets) {
        setTimeout(() => {
          if (preloader) {
            preloader.style.opacity = "0";
            setTimeout(() => {
              preloader.style.display = "none";
            }, 800);
          }
        }, 300);
      }
    }

    // Preload dance frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const numStr = String(i).padStart(3, "0");
      const img = new Image();
      img.src = `${FRAME_PREFIX}${numStr}${FRAME_EXT}`;
      img.onload = () => {
        loadedFrames[i - 1] = img;
        updateProgress();
      };
      img.onerror = () => {
        loadedFrames[i - 1] = img;
        updateProgress();
      };
    }

    // Preload school photo
    const schoolImg = new Image();
    schoolImg.src = SCHOOL_PHOTO_SRC;
    schoolImg.onload = updateProgress;
    schoolImg.onerror = updateProgress;
  }

  // =========================================================================
  // 2. DANCE CANVAS ANIMATION ENGINE
  // =========================================================================
  function initDanceCanvas() {
    if (!danceCanvas) return;
    const ctx = danceCanvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (danceCanvas.width !== w * dpr || danceCanvas.height !== h * dpr) {
        danceCanvas.width = w * dpr;
        danceCanvas.height = h * dpr;
      }
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function renderDance() {
      // Sub-pixel smooth lerp interpolation
      const diff = targetFrame - currentFrame;
      currentFrame += diff * 0.16;

      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrame))
      );
      const img = loadedFrames[frameIdx];

      const width = danceCanvas.width;
      const height = danceCanvas.height;

      if (img && img.complete && img.naturalWidth > 0) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Clear with pure cinematic black
        ctx.fillStyle = "#020204";
        ctx.fillRect(0, 0, width, height);

        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
        const imgRatio = imgWidth / imgHeight;
        const screenRatio = width / height;

        let renderWidth, renderHeight, offsetX, offsetY;

        if (screenRatio > imgRatio) {
          renderHeight = height * 0.98;
          renderWidth = renderHeight * imgRatio;
          offsetX = (width - renderWidth) / 2;
          offsetY = (height - renderHeight) / 2;
        } else {
          renderWidth = width;
          renderHeight = renderWidth / imgRatio;
          offsetX = 0;
          offsetY = (height - renderHeight) / 2;
        }

        // Draw enhanced dance frame
        ctx.filter = "contrast(1.05) brightness(1.02) saturate(1.08)";
        ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
        ctx.filter = "none";

        // Feathered edge-vignette ONLY at the outer perimeter (>70% radius)
        const radial = ctx.createRadialGradient(
          width / 2,
          height / 2,
          Math.min(width, height) * 0.45,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.65
        );
        radial.addColorStop(0, "rgba(2, 2, 4, 0)");
        radial.addColorStop(0.7, "rgba(2, 2, 4, 0.3)");
        radial.addColorStop(1, "rgba(2, 2, 4, 0.96)");

        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, width, height);

        // Top and bottom edge gradient blends
        const topGrad = ctx.createLinearGradient(0, 0, 0, height * 0.12);
        topGrad.addColorStop(0, "rgba(2, 2, 4, 0.98)");
        topGrad.addColorStop(1, "rgba(2, 2, 4, 0)");
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, 0, width, height * 0.12);

        const botGrad = ctx.createLinearGradient(0, height * 0.88, 0, height);
        botGrad.addColorStop(0, "rgba(2, 2, 4, 0)");
        botGrad.addColorStop(1, "rgba(2, 2, 4, 0.98)");
        ctx.fillStyle = botGrad;
        ctx.fillRect(0, height * 0.88, width, height * 0.12);
      }

      requestAnimationFrame(renderDance);
    }

    renderDance();
  }

  // =========================================================================
  // 3. GOLDEN EMBER PARTICLE CANVAS
  // =========================================================================
  function initParticleCanvas() {
    if (!particleCanvas) return;
    const ctx = particleCanvas.getContext("2d");
    if (!ctx) return;

    let width = (particleCanvas.width = window.innerWidth);
    let height = (particleCanvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = particleCanvas.width = window.innerWidth;
      height = particleCanvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.6,
        baseAlpha: Math.random() * 0.4 + 0.15,
        alpha: 0.2,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.45 - 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.3 ? 43 : 38,
      });
    }

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      const currentScrollY = window.scrollY;
      const rawVelocity = Math.abs(currentScrollY - lastScrollY);
      scrollVelocity = scrollVelocity * 0.9 + rawVelocity * 0.1;
      lastScrollY = currentScrollY;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.15;
        p.x += p.speedX;
        p.y += p.speedY - scrollVelocity * 0.08;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
        grad.addColorStop(0, `hsla(${p.hue}, 85%, 70%, ${Math.max(0, p.alpha)})`);
        grad.addColorStop(1, `hsla(${p.hue}, 85%, 60%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(renderParticles);
    }

    renderParticles();
  }

  // =========================================================================
  // 4. SCROLL ORCHESTRATION & STORY CARDS
  // =========================================================================
  function updateScrollStory() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
    targetFrame = Math.min(TOTAL_FRAMES - 1, Math.max(0, scrollProgress * (TOTAL_FRAMES - 1)));

    // Update each story card with smooth fade & transform
    STORY_SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return;

      const [start, end] = sec.range;
      const fadeInWindow = (end - start) * 0.15;
      const fadeOutWindow = (end - start) * 0.15;

      if (scrollProgress < start || scrollProgress > end) {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        el.classList.remove("active");
        return;
      }

      let opacity = 1;
      let translateY = 0;

      if (scrollProgress < start + fadeInWindow) {
        const localP = (scrollProgress - start) / fadeInWindow;
        opacity = localP;
        translateY = (1 - localP) * 24;
      } else if (scrollProgress > end - fadeOutWindow) {
        const localP = (end - scrollProgress) / fadeOutWindow;
        opacity = localP;
        translateY = (1 - localP) * -24;
      }

      el.style.opacity = Math.max(0, Math.min(1, opacity)).toString();
      el.style.transform = `translateY(${translateY}px)`;

      if (opacity > 0.35) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });

    // Update bottom dock active state
    dockPills.forEach((pill) => {
      const rangeStart = parseFloat(pill.dataset.start || "0");
      const rangeEnd = parseFloat(pill.dataset.end || "1");

      if (scrollProgress >= rangeStart && scrollProgress < rangeEnd) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });
  }

  // =========================================================================
  // 5. AUDIO CONTROLLER
  // =========================================================================
  function initAudio() {
    if (!audioEl || !audioBtn) return;
    audioEl.volume = 0.6;
    audioEl.loop = true;

    audioBtn.addEventListener("click", () => {
      if (isPlayingAudio) {
        // Fade out
        let vol = audioEl.volume;
        const fade = setInterval(() => {
          if (vol > 0.05) {
            vol -= 0.05;
            audioEl.volume = Math.max(0, vol);
          } else {
            clearInterval(fade);
            audioEl.pause();
            isPlayingAudio = false;
            audioBtn.classList.remove("playing");
            if (audioLabel) audioLabel.textContent = "Music";
            audioEl.volume = 0.6;
          }
        }, 30);
      } else {
        audioEl.volume = 0;
        audioEl.play().then(() => {
          isPlayingAudio = true;
          audioBtn.classList.add("playing");
          if (audioLabel) audioLabel.textContent = "Music On";

          let vol = 0;
          const fade = setInterval(() => {
            if (vol < 0.6) {
              vol += 0.05;
              audioEl.volume = Math.min(0.6, vol);
            } else {
              clearInterval(fade);
            }
          }, 30);
        }).catch((err) => console.warn("Audio play error:", err));
      }
    });
  }

  // =========================================================================
  // 6. INTERACTIVE CELEBRATION SPARKS & REPLAY
  // =========================================================================
  let blessingCount = 0;

  function triggerBlessingSparks() {
    blessingCount++;
    if (sendBlessingBtn) {
      sendBlessingBtn.innerHTML = `<span>✨</span><span>Blessed ${blessingCount} ${blessingCount === 1 ? "Time" : "Times"} ❤️</span>`;
    }

    const colors = ["#ffd700", "#f3e5ab", "#ff6b6b", "#ffa07a"];
    for (let i = 0; i < 18; i++) {
      const spark = document.createElement("div");
      const size = Math.random() * 12 + 6;
      const duration = Math.random() * 1.5 + 1.2;
      const color = colors[Math.floor(Math.random() * colors.length)];

      spark.style.position = "fixed";
      spark.style.left = `${Math.random() * 80 + 10}%`;
      spark.style.top = `${Math.random() * 40 + 50}%`;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.borderRadius = "50%";
      spark.style.backgroundColor = color;
      spark.style.boxShadow = `0 0 16px ${color}`;
      spark.style.pointerEvents = "none";
      spark.style.zIndex = "90";
      spark.style.animation = `floatUpAndFade ${duration}s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`;

      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), duration * 1000);
    }
  }

  // =========================================================================
  // 7. EVENT BINDINGS & INIT
  // =========================================================================
  window.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    initDanceCanvas();
    initParticleCanvas();
    initAudio();

    window.addEventListener("scroll", updateScrollStory, { passive: true });
    updateScrollStory();

    // Bottom dock click jumps
    dockPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const target = parseFloat(pill.dataset.target || "0");
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({
          top: target * maxScroll,
          behavior: "smooth",
        });
      });
    });

    if (sendBlessingBtn) {
      sendBlessingBtn.addEventListener("click", triggerBlessingSparks);
    }

    if (replayBtn) {
      replayBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  });
})();
