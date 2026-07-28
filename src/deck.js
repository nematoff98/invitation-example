// The cinematic scene deck: full-screen scenes pinned in place, cross-dissolving
// as the guest scrolls — the story swaps rather than the page scrolling away.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { loadDeferredImages } from "./ui.js";

gsap.registerPlugin(ScrollTrigger);

// Scroll distance (in viewport heights) allotted to each scene transition.
const PACE = 0.85;

export function initDeck(scenes, progress) {
  const deck = document.getElementById("deck");
  if (!deck || scenes.length === 0) return;

  document.documentElement.classList.add("is-deck");

  const media = scenes.map((s) => s.querySelector("[data-media]"));
  const risers = scenes.map((s) => [...s.querySelectorAll("[data-rise]")]);

  // Initial state: only the first scene shows.
  gsap.set(scenes, { autoAlpha: 0 });
  gsap.set(scenes[0], { autoAlpha: 1 });
  gsap.set(media, { scale: 1.05 });

  // Opening scene rises on load (already-visible default is preserved: if JS
  // fails before this line, CSS shows the scene in flow).
  gsap.from(risers[0], {
    autoAlpha: 0,
    y: 28,
    duration: 0.9,
    stagger: 0.09,
    ease: "power3.out",
    delay: 0.2,
  });

  const tl = gsap.timeline({
    defaults: { ease: "power1.inOut" },
    scrollTrigger: {
      trigger: deck,
      start: "center center",
      end: () => "+=" + (scenes.length - 1) * window.innerHeight * PACE,
      scrub: 0.6,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (progress) progress.setActive(Math.round(self.progress * (scenes.length - 1)));
      },
    },
  });

  for (let i = 1; i < scenes.length; i++) {
    const at = i - 1;
    tl.to(scenes[i - 1], { autoAlpha: 0, duration: 1 }, at)
      .to(media[i - 1], { scale: 1.12, duration: 1.1, ease: "power1.in" }, at)
      .fromTo(scenes[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, at)
      .fromTo(
        media[i],
        { scale: 1.14, yPercent: 3 },
        { scale: 1.05, yPercent: 0, duration: 1.15, ease: "power2.out" },
        at,
      )
      .fromTo(
        risers[i],
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "power3.out" },
        at + 0.42,
      );
  }

  // Rail navigation maps a dot to its scroll position within the pinned range.
  if (progress) {
    progress.items.forEach((li, i) => {
      li.firstElementChild.addEventListener("click", () => {
        const st = tl.scrollTrigger;
        if (!st) return;
        const p = scenes.length > 1 ? i / (scenes.length - 1) : 0;
        const y = st.start + p * (st.end - st.start);
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
  }

  // Load the deferred (below-the-fold) scene images while idle, then re-measure.
  const preload = () => {
    loadDeferredImages(deck);
    ScrollTrigger.refresh();
  };
  if ("requestIdleCallback" in window) {
    requestIdleCallback(preload, { timeout: 2500 });
  } else {
    setTimeout(preload, 1200);
  }

  // Keep the pin math correct once fonts/images settle and on rotation.
  window.addEventListener("load", () => ScrollTrigger.refresh());

  // If the user flips reduced-motion on, reload into the flow experience.
  const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
  rm.addEventListener?.("change", (e) => {
    if (e.matches) window.location.reload();
  });
}
