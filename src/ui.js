// UI behaviors: countdown, copy-to-clipboard, music toggle, progress, image loading.
// All are progressive: the page is fully readable if any of this fails.

const pad = (n) => String(n).padStart(2, "0");

/* ---------- Countdown ---------- */
export function initCountdown() {
  const el = document.querySelector("[data-countdown]");
  const timeEl = document.querySelector("time[datetime]");
  if (!el || !timeEl) return;

  const target = new Date(timeEl.getAttribute("datetime")).getTime();
  if (Number.isNaN(target)) return;

  const done = document.querySelector("[data-cd-done]");
  const out = {
    days: el.querySelector('[data-cd="days"]'),
    hours: el.querySelector('[data-cd="hours"]'),
    mins: el.querySelector('[data-cd="mins"]'),
    secs: el.querySelector('[data-cd="secs"]'),
  };

  let timer;
  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      el.hidden = true;
      if (done) done.hidden = false;
      clearInterval(timer);
      return;
    }
    const s = Math.floor(diff / 1000);
    out.days.textContent = pad(Math.floor(s / 86400));
    out.hours.textContent = pad(Math.floor((s % 86400) / 3600));
    out.mins.textContent = pad(Math.floor((s % 3600) / 60));
    out.secs.textContent = pad(s % 60);
  };
  tick();
  timer = setInterval(tick, 1000);
}

/* ---------- Copy card number ---------- */
export function initCopy() {
  const btn = document.getElementById("copyCard");
  const hint = document.querySelector("[data-copy-hint]");
  if (!btn) return;
  const value = btn.dataset.copy || "";
  const DEFAULT = "Nusxalash uchun bosing";
  let reset;

  const flash = (msg) => {
    btn.classList.add("is-copied");
    if (hint) {
      hint.classList.add("is-copied");
      hint.textContent = msg;
    }
    clearTimeout(reset);
    reset = setTimeout(() => {
      btn.classList.remove("is-copied");
      if (hint) {
        hint.classList.remove("is-copied");
        hint.textContent = DEFAULT;
      }
    }, 2200);
  };

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(value);
      flash("Nusxalandi ✓");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {
        /* noop */
      }
      ta.remove();
      flash(ok ? "Nusxalandi ✓" : "Nusxalab bo'lmadi");
    }
  });
}

/* ---------- Music toggle (default OFF; loads only on demand) ---------- */
export function initMusic() {
  const btn = document.getElementById("musicBtn");
  if (!btn) return;
  const src = document.body.dataset.music;
  const label = btn.querySelector(".music__label");

  if (!src) {
    btn.setAttribute("data-unavailable", "");
    return;
  }

  const audio = new Audio();
  audio.loop = true;
  audio.preload = "none";
  audio.src = src;

  const setLabel = (t) => {
    if (label) label.textContent = t;
  };

  audio.addEventListener("error", () => {
    btn.setAttribute("data-unavailable", "");
    setLabel("Musiqa yo'q");
    btn.setAttribute("aria-label", "Musiqa fayli qo'shilmagan");
  });

  btn.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        btn.setAttribute("aria-pressed", "true");
        btn.setAttribute("aria-label", "Musiqani o'chirish");
        btn.removeAttribute("data-unavailable");
        setLabel("Musiqa");
      } catch {
        btn.setAttribute("data-unavailable", "");
        setLabel("Musiqa yo'q");
        btn.setAttribute("aria-label", "Musiqa fayli qo'shilmagan");
      }
    } else {
      audio.pause();
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", "Musiqani yoqish");
    }
  });

  // Pause when the tab is hidden; resume state stays user-controlled.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !audio.paused) audio.pause();
  });
}

/* ---------- Progress rail ---------- */
export function buildProgress(scenes) {
  const nav = document.querySelector(".progress");
  const list = document.getElementById("progressDots");
  if (!nav || !list || scenes.length === 0) return null;

  const items = scenes.map((_, i) => {
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.index = String(i);
    b.setAttribute("aria-label", `${i + 1}-sahnaga o'tish`);
    li.appendChild(b);
    list.appendChild(li);
    return li;
  });

  nav.hidden = false;

  let current = -1;
  const setActive = (i) => {
    i = Math.max(0, Math.min(scenes.length - 1, i));
    if (i === current) return;
    current = i;
    items.forEach((li, idx) => li.classList.toggle("is-active", idx === i));
  };
  setActive(0);

  return { items, setActive };
}

/* ---------- Deferred image loading ---------- */
export function loadDeferredImages(root = document) {
  const imgs = [...root.querySelectorAll("img[data-src]")];
  imgs.forEach((img) => {
    if (img.dataset.srcset) img.srcset = img.dataset.srcset;
    img.src = img.dataset.src;
    img.removeAttribute("data-src");
    img.removeAttribute("data-srcset");
  });
  return imgs;
}

/* ---------- Flow-mode reveal (reduced motion / no GSAP) ---------- */
export function initFlowReveal(scenes, progress) {
  // Content is visible by default; we only track position and wire the rail.
  if ("IntersectionObserver" in window && progress) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) progress.setActive(scenes.indexOf(e.target));
        });
      },
      { threshold: 0.5 },
    );
    scenes.forEach((s) => io.observe(s));
  }

  if (progress) {
    progress.items.forEach((li, i) => {
      li.firstElementChild.addEventListener("click", () => {
        scenes[i].scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  // Lazy-load images as they approach the viewport.
  const deferred = [...document.querySelectorAll("img[data-src]")];
  if ("IntersectionObserver" in window && deferred.length) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          loadDeferredImages(e.target.closest(".scene") || document);
          obs.unobserve(e.target);
        });
      },
      { rootMargin: "300px 0px" },
    );
    deferred.forEach((img) => io.observe(img));
  } else {
    loadDeferredImages();
  }
}
