import "./style.css";
import {
  initCountdown,
  initCopy,
  initMusic,
  buildProgress,
  initFlowReveal,
  loadDeferredImages,
} from "./ui.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

async function boot() {
  initCountdown();
  initCopy();
  initMusic();

  const scenes = [...document.querySelectorAll(".scene")];
  const progress = buildProgress(scenes);

  if (reduceMotion.matches) {
    // Calm path: content flows normally, gentle position tracking only.
    initFlowReveal(scenes, progress);
  } else {
    // Cinematic path: GSAP pinned scene deck (loaded on demand).
    try {
      const { initDeck } = await import("./deck.js");
      initDeck(scenes, progress);
    } catch (err) {
      console.error("Deck yuklanmadi, oddiy rejimga o'tildi:", err);
      loadDeferredImages();
      initFlowReveal(scenes, progress);
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
