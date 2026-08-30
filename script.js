window.addEventListener("load", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 50);
});
document.body.classList.add('no-scroll');
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer لظهور العناصر عند السكرول
  const reveals = document.querySelectorAll(".reveal");
  const observerOptions = { threshold: 0.15 };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  reveals.forEach((el) => revealObserver.observe(el));

  // العداد التنازلي
  const eventDate = new Date("August 21, 2026 18:00:00").getTime();
  function updateCountdown() {
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById("cd-days").innerText = days < 10 ? "0" + days : days;
      document.getElementById("cd-hours").innerText = hours < 10 ? "0" + hours : hours;
      document.getElementById("cd-minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
      document.getElementById("cd-seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    }
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // التحكم بزرار تشغيل/إيقاف الموسيقى يدويًا
  const musicToggle = document.getElementById("musicToggle");
  const audio = document.getElementById("bgMusic");

  if (musicToggle && audio) {
    musicToggle.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        musicToggle.classList.remove("paused");
      } else {
        audio.pause();
        musicToggle.classList.add("paused");
      }
    });
  }
});

// دالة فتح الظرف وتفعيل الأنيمشن والموسيقى
function openInvitation() {
  const envelopeScreen = document.getElementById("envelope-screen");
  const mainSite = document.getElementById("main-site");
  const audio = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  document.body.classList.remove('no-scroll');

  // 1. إضافة كلاس الفتح للظرف والموقع
  envelopeScreen.classList.add("opened");

  // 2. تأخير بسيط في ظهور الموقع ليعطي إحساس خروج الكارت ببطء ونعومة
  setTimeout(() => {
    mainSite.classList.add("active");
    createPetals(); // إنشاء تساقط الورد عند فتح الدعوة
  }, 600);

  // 3. تشغيل الموسيقى تلقائياً
  if (audio) {
    audio.play().then(() => {
      if (musicToggle) musicToggle.classList.remove("paused");
    }).catch(err => {
      console.log("Autoplay was prevented by browser:", err);
    });
  }
}

// دالة تساقط الورد الاحترافية
function createPetals() {
  const container = document.getElementById("petals");
  if (!container) return;

  const petalCount = 25; // زيادة عدد الورد لإعطاء منظر أجمل

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");

    const size = Math.random() * 14 + 10;
    const left = Math.random() * 100;
    const fallDuration = Math.random() * 6 + 7; // هبوط ناعم وبطيء
    const swayDuration = Math.random() * 3 + 2;
    const delay = Math.random() * 4;

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.left = `${left}%`;
    petal.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
    petal.style.animationDelay = `${delay}s, ${delay}s`;

    container.appendChild(petal);
  }
}

const RSVP_API =
  "https://script.google.com/macros/s/AKfycbz4QCkbpVDpDyWhy58QFT3smepKIu-2ovcD2eCN6IkzGTKGHNharwIEGdvOchPF8AS0FA/exec";
const invitationId =
  new URLSearchParams(window.location.search).get("id") || "AbdelrahmanNadaWedding2026";

const form = document.getElementById("rsvpForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  document.querySelectorAll(".err").forEach(err => err.textContent = "");

  const fullName = document.getElementById("guestName").value.trim();
  const message = document.getElementById("message").value.trim();

  if (fullName.length < 2) {

    document.querySelector('[data-for="guestName"]').textContent =
      "Please enter your full name.";

    return;
  }

  const submitButton = document.getElementById("submitBtn");

  submitButton.disabled = true;
  submitButton.innerHTML = "Sending...";

  try {

    await fetch(RSVP_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "no-cors",
      body: JSON.stringify({
        invitationId,
        name: fullName,
        message: message
      })
    });

    form.reset();

    document.getElementById("formSuccess").style.display = "block";

    submitButton.style.display = "none";

  } catch (error) {

    console.error(error);

    submitButton.disabled = false;
    submitButton.innerHTML = "Send RSVP Confirmation ✨";

    alert("Something went wrong.");
  }

});
gsap.utils.toArray(".timeline-item").forEach((item) => {

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: "top 82%",
      toggleActions: "play none none none"
    }
  });

  tl.from(item.querySelector(".timeline-dot"), {
    scale: 0,
    duration: 0.3,
    ease: "back.out(2)"
  })

    .from(item.querySelector(".timeline-time"), {
      x: -40,
      opacity: 0,
      duration: 0.4
    }, "-=0.15")

    .from(item.querySelector(".timeline-title"), {
      y: 20,
      opacity: 0,
      duration: 0.4
    }, "-=0.2")

    .from(item.querySelector("p"), {
      y: 20,
      opacity: 0,
      duration: 0.4
    }, "-=0.25");

});

gsap.utils.toArray("section").forEach((section) => {

  gsap.from(section, {

    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",

    scrollTrigger: {
      trigger: section,
      start: "top 82%",
      toggleActions: "play none none none"
    }

  });

});
(function initSongPlayer() {
  const section = document.getElementById('song');
  if (!section) return; // section not on this page, skip safely

  const audio = document.getElementById('songAudio');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const waveContainer = document.getElementById('songWaveBars');
  const playBtn = document.getElementById('songPlay');
  const prevBtn = document.getElementById('songPrev');
  const nextBtn = document.getElementById('songNext');
  const scrubber = document.getElementById('songScrubber');
  const fill = document.getElementById('songFill');
  const thumb = document.getElementById('songThumb');
  const elapsedLabel = document.getElementById('songElapsed');
  const remainingLabel = document.getElementById('songRemaining');
  const iconPlay = playBtn.querySelector('.icon-play');
  const iconPause = playBtn.querySelector('.icon-pause');

  let scrubbing = false;

  function formatTime(totalSeconds) {
    if (!isFinite(totalSeconds) || totalSeconds < 0) return '0:00';
    const m = Math.floor(totalSeconds / 60);
    const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function setPlayIcon(isPlaying) {
    iconPlay.style.display = isPlaying ? 'none' : '';
    iconPause.style.display = isPlaying ? '' : 'none';
    playBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
  }

  const BAR_COUNT = 28;
  const bars = [];
  let audioCtx = null;
  let analyser = null;
  let freqData = null;
  let rafId = null;
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (waveContainer) {
    for (let i = 0; i < BAR_COUNT; i++) {
      const bar = document.createElement('div');
      bar.className = 'song-wave-bar';
      waveContainer.appendChild(bar);
      bars.push(bar);
    }
  }

  function ensureAudioGraph() {
    if (audioCtx || !waveContainer) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      audioCtx = new AudioContextClass();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      freqData = new Uint8Array(analyser.frequencyBinCount);
      const source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    } catch (err) {
      console.warn('Waveform visualizer unavailable:', err);
      audioCtx = null;
      analyser = null;
    }
  }

  function renderBars() {
    if (!analyser) return;
    analyser.getByteFrequencyData(freqData);
    for (let i = 0; i < bars.length; i++) {
      const value = freqData[i] || 0; // 0-255
      const heightPercent = 10 + (value / 255) * 90;
      bars[i].style.height = heightPercent + '%';
    }
    rafId = requestAnimationFrame(renderBars);
  }

  function startWave() {
    if (!waveContainer) return;
    ensureAudioGraph();
    if (!analyser) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    if (rafId) return;
    if (prefersReducedMotion) {
      rafId = setInterval(() => {
        analyser.getByteFrequencyData(freqData);
        for (let i = 0; i < bars.length; i++) {
          bars[i].style.height = 10 + (freqData[i] / 255) * 60 + '%';
        }
      }, 350);
    } else {
      renderBars();
    }
  }

  function stopWave() {
    if (prefersReducedMotion) {
      clearInterval(rafId);
    } else {
      cancelAnimationFrame(rafId);
    }
    rafId = null;
    bars.forEach((bar) => {
      bar.style.height = '10%';
    });
  }

  function updateProgressUI() {
    if (scrubbing) return;
    const duration = audio.duration || 0;
    const percent = duration ? (audio.currentTime / duration) * 100 : 0;
    fill.style.width = percent + '%';
    thumb.style.left = percent + '%';
    elapsedLabel.textContent = formatTime(audio.currentTime);
    remainingLabel.textContent = '-' + formatTime(Math.max(duration - audio.currentTime, 0));
  }

  function pulse(el) {
    if (window.gsap) {
      gsap.fromTo(el, { scale: 0.88 }, { scale: 1, duration: 0.3, ease: 'back.out(3)' });
    }
  }

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      ensureAudioGraph();
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
      if (bgMusic && !bgMusic.paused) {
        bgMusic.pause();
        if (musicToggle) musicToggle.classList.add('paused');
      }
      audio.play();
    } else {
      audio.pause();
    }
    pulse(playBtn);
  });

  prevBtn.addEventListener('click', () => {
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
    pulse(prevBtn);
  });

  nextBtn.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.currentTime + 10, audio.duration || audio.currentTime + 10);
    pulse(nextBtn);
  });

  audio.addEventListener('play', () => {
    setPlayIcon(true);
    startWave();
  });
  audio.addEventListener('pause', () => {
    setPlayIcon(false);
    stopWave();
  });
  audio.addEventListener('timeupdate', updateProgressUI);
  audio.addEventListener('loadedmetadata', updateProgressUI);
  audio.addEventListener('ended', () => {
    setPlayIcon(false);
    stopWave();
  });

  setPlayIcon(false);

  function seekFromEvent(evt) {
    const rect = scrubber.getBoundingClientRect();
    const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    fill.style.width = ratio * 100 + '%';
    thumb.style.left = ratio * 100 + '%';
    elapsedLabel.textContent = formatTime(ratio * (audio.duration || 0));
    return ratio;
  }

  function startScrub(evt) {
    scrubbing = true;
    seekFromEvent(evt);
    window.addEventListener('mousemove', onScrubMove);
    window.addEventListener('mouseup', endScrub);
    window.addEventListener('touchmove', onScrubMove);
    window.addEventListener('touchend', endScrub);
  }

  function onScrubMove(evt) {
    if (!scrubbing) return;
    seekFromEvent(evt);
  }

  function endScrub(evt) {
    if (!scrubbing) return;
    const ratio = seekFromEvent(evt);
    audio.currentTime = ratio * (audio.duration || 0);
    scrubbing = false;
    window.removeEventListener('mousemove', onScrubMove);
    window.removeEventListener('mouseup', endScrub);
    window.removeEventListener('touchmove', onScrubMove);
    window.removeEventListener('touchend', endScrub);
  }

  scrubber.addEventListener('mousedown', startScrub);
  scrubber.addEventListener('touchstart', startScrub);

  // GSAP scroll-triggered entrance
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      defaults: { ease: 'power3.out' },
    })
      .from(section.querySelector('.song-eyebrow'), { y: 14, opacity: 0, duration: 0.5 })
      .from(section.querySelector('.song-initials'), { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
      .from(section.querySelector('.song-subtitle'), { y: 12, opacity: 0, duration: 0.5 }, '-=0.35')
      .from(section.querySelector('.song-wave-wrap'), { y: 30, opacity: 0, scale: 0.94, duration: 0.7 }, '-=0.3')
      .from(
        [
          section.querySelector('.song-caption'),
          section.querySelector('.song-scrubber'),
          section.querySelector('.song-controls'),
        ],
        { y: 14, opacity: 0, duration: 0.45, stagger: 0.08 },
        '-=0.35'
      );
  }
})();