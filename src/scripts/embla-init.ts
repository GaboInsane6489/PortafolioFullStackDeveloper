import EmblaCarousel from "embla-carousel";
import type { EmblaCarouselType } from "embla-carousel";

export function initEmbla(): void {
  const wrappers = document.querySelectorAll<HTMLElement>(".embla-wrapper");

  wrappers.forEach((wrapper) => {
    const viewport = wrapper.querySelector<HTMLElement>(".embla");
    if (!viewport) return;

    const progressBar =
      wrapper.querySelector<HTMLElement>(".embla-progress");
    const prevBtn =
      wrapper.querySelector<HTMLButtonElement>(".embla-prev");
    const nextBtn =
      wrapper.querySelector<HTMLButtonElement>(".embla-next");

    const autoplayEnabled = wrapper.dataset.autoplay === "true";
    const interval = Number(wrapper.dataset.interval) || 4000;

    const embla: EmblaCarouselType = EmblaCarousel(viewport, {
      loop: true,
      align: "start",
    });

    let autoplayTimer: number | null = null;
    let animationFrame: number | null = null;
    let startTime: number | null = null;

    /* =========================
       PROGRESS ANIMATION
    ========================== */

    const animate = (timestamp: number): void => {
      if (startTime === null) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / interval, 1);

      if (progressBar) {
        progressBar.style.width = `${progress * 100}%`;
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const startProgress = (): void => {
      stopProgress();
      startTime = null;

      if (progressBar) {
        progressBar.style.width = "0%";
      }

      animationFrame = requestAnimationFrame(animate);
    };

    const stopProgress = (): void => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    const resetProgress = (): void => {
      if (!autoplayEnabled) return;
      startProgress();
    };

    /* =========================
       AUTOPLAY
    ========================== */

    const startAutoplay = (): void => {
      if (!autoplayEnabled) return;
      if (autoplayTimer !== null) return; // evita duplicados

      startProgress();

      autoplayTimer = window.setInterval(() => {
        embla.scrollNext();
        startProgress();
      }, interval);
    };

    const stopAutoplay = (): void => {
      if (autoplayTimer !== null) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }

      stopProgress();
    };

    /* =========================
       EVENTS
    ========================== */

    prevBtn?.addEventListener("click", () => {
      embla.scrollPrev();
      resetProgress();
    });

    nextBtn?.addEventListener("click", () => {
      embla.scrollNext();
      resetProgress();
    });

    wrapper.addEventListener("mouseenter", stopAutoplay);

    wrapper.addEventListener("mouseleave", () => {
      if (autoplayEnabled) startAutoplay();
    });

    embla.on("select", resetProgress);

    /* =========================
       INIT
    ========================== */

    if (autoplayEnabled) {
      startAutoplay();
    }
  });
}
