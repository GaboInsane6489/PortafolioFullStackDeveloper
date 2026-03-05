import EmblaCarousel from "embla-carousel";
import type { EmblaCarouselType } from "embla-carousel";

export function initEmbla(): void {
  const wrappers = document.querySelectorAll<HTMLElement>(".embla-wrapper");

  wrappers.forEach((wrapper) => {
    const viewport = wrapper.querySelector<HTMLElement>(".embla");
    if (!viewport) return;

    const progressBar = wrapper.querySelector<HTMLElement>(".embla-progress");
    const prevBtn = wrapper.querySelector<HTMLButtonElement>(".embla-prev");
    const nextBtn = wrapper.querySelector<HTMLButtonElement>(".embla-next");

    const autoplayEnabled = wrapper.dataset.autoplay === "true";
    const interval = Number(wrapper.dataset.interval) || 4000;

    const embla: EmblaCarouselType = EmblaCarousel(viewport, {
      loop: true,
      align: "center",
      skipSnaps: false,
    });

    let autoplayTimer: number | null = null;
    let animationFrame: number | null = null;
    let startTime: number | null = null;

    /* =========================
       PROGRESS ANIMATION (Dots Pagination)
    ========================== */
    const dotsContainer = wrapper.querySelector<HTMLElement>(".embla__dots");
    let dots: HTMLElement[] = [];

    // Create dots based on slide count
    if (dotsContainer) {
      const snapList = embla.scrollSnapList();
      snapList.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className =
          "embla__dot relative h-1 w-8 overflow-hidden rounded-full bg-white/20 transition-all duration-300 md:w-12 lg:hover:bg-white/40 cursor-pointer";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Slide ${index + 1}`);
        dot.setAttribute("aria-selected", index === 0 ? "true" : "false");

        const progress = document.createElement("div");
        progress.className =
          "embla__dot__progress absolute left-0 top-0 h-full w-0 bg-blue-400";

        dot.appendChild(progress);
        dot.addEventListener("click", () => embla.scrollTo(index));
        dotsContainer.appendChild(dot);
        dots.push(dot);
      });
    }

    const updateDotsAria = () => {
      const selectedIndex = embla.selectedScrollSnap();
      dots.forEach((dot, index) => {
        dot.setAttribute(
          "aria-selected",
          index === selectedIndex ? "true" : "false",
        );
        // Reset progress on non-selected dots
        if (index !== selectedIndex) {
          const progress = dot.querySelector<HTMLElement>(
            ".embla__dot__progress",
          );
          if (progress) progress.style.width = "0%";
        }
      });
    };

    embla.on("select", updateDotsAria);
    embla.on("init", updateDotsAria);

    const animate = (timestamp: number): void => {
      if (startTime === null) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / interval, 1);

      // --- NEW PROGRESS LOGIC (Update Active Dot) ---
      const selectedIndex = embla.selectedScrollSnap();
      if (dots[selectedIndex]) {
        const activeProgress = dots[selectedIndex].querySelector<HTMLElement>(
          ".embla__dot__progress",
        );
        if (activeProgress) {
          activeProgress.style.width = `${progress * 100}%`;
        }
      }

      // --- OLD PROGRESS BAR KEEP AROUND JUST IN CASE ---
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

      const selectedIndex = embla.selectedScrollSnap();
      if (dots[selectedIndex]) {
        const activeProgress = dots[selectedIndex].querySelector<HTMLElement>(
          ".embla__dot__progress",
        );
        if (activeProgress) activeProgress.style.width = "0%";
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
