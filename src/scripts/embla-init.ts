import EmblaCarousel from "embla-carousel";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";

// Registry to track active carousels for clean disposal
const activeEmblas = new Set<EmblaCarouselType>();

export function initEmbla(): void {
  // Cleanup any previously active instances before re-initializing (Astro swap safety)
  activeEmblas.forEach((embla) => {
    try {
      embla.destroy();
    } catch (e) {
      /* ignore */
    }
  });
  activeEmblas.clear();

  const wrappers = document.querySelectorAll<HTMLElement>(".embla-wrapper");

  wrappers.forEach((wrapper) => {
    const viewport = wrapper.querySelector<HTMLElement>(".embla");
    if (!viewport) return;

    const prevBtn = wrapper.querySelector<HTMLButtonElement>(".embla-prev");
    const nextBtn = wrapper.querySelector<HTMLButtonElement>(".embla-next");

    const autoplayEnabled = wrapper.dataset.autoplay === "true";
    const interval = Number(wrapper.dataset.interval) || 5000;

    const options: EmblaOptionsType = {
      loop: true,
      align: "center",
      skipSnaps: false,
      duration: 25, // Lower = Snappier
    };

    const embla = EmblaCarousel(viewport, options);
    activeEmblas.add(embla);

    let autoplayTimer: number | null = null;

    /* =========================
       CSS-BASED PROGRESS (High Performance)
    ========================== */
    const dotsContainer = wrapper.querySelector<HTMLElement>(".embla__dots");
    let dots: HTMLElement[] = [];

    if (dotsContainer) {
      dotsContainer.innerHTML = ''; // Clear previous dots
      const snapList = embla.scrollSnapList();
      snapList.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "embla__dot group relative h-1.5 w-10 overflow-hidden rounded-full bg-white/10 transition-all duration-300 md:w-14 cursor-pointer";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-selected", index === 0 ? "true" : "false");

        const progress = document.createElement("div");
        progress.className = "embla__dot__progress absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-lofi-accent to-lofi-pop";
        // Use CSS transition for zero-JS-overhead progress
        progress.style.transition = `width ${interval}ms linear`;

        dot.appendChild(progress);
        dot.addEventListener("click", () => embla.scrollTo(index));
        dotsContainer.appendChild(dot);
        dots.push(dot);
      });
    }

    const resetProgress = (): void => {
      dots.forEach((dot, index) => {
        const progress = dot.querySelector<HTMLElement>(".embla__dot__progress");
        const isSelected = index === embla.selectedScrollSnap();
        
        dot.setAttribute("aria-selected", isSelected ? "true" : "false");
        
        if (progress) {
          // Disable transition to reset instantly
          progress.style.transition = 'none';
          progress.style.width = '0%';
          
          if (isSelected && autoplayEnabled) {
            // Trigger reflow to apply 'none' before re-enabling transition
            void progress.offsetWidth;
            progress.style.transition = `width ${interval}ms linear`;
            progress.style.width = '100%';
          }
        }
      });
    };

    /* =========================
       AUTOPLAY & VISIBILITY (IntersectionObserver)
    ========================== */
    const startAutoplay = (): void => {
      if (!autoplayEnabled || autoplayTimer !== null) return;
      resetProgress();
      autoplayTimer = window.setInterval(() => {
        embla.scrollNext();
      }, interval);
    };

    const stopAutoplay = (): void => {
      if (autoplayTimer !== null) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
      // Pause progress bar graphically
      dots.forEach(dot => {
        const progress = dot.querySelector<HTMLElement>(".embla__dot__progress");
        if (progress) {
          const currentWidth = progress.offsetWidth;
          progress.style.transition = 'none';
          progress.style.width = `${currentWidth}px`;
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(wrapper);

    /* =========================
       EVENTS & CLEANUP
    ========================== */
    prevBtn?.addEventListener("click", () => embla.scrollPrev());
    nextBtn?.addEventListener("click", () => embla.scrollNext());

    wrapper.addEventListener("mouseenter", stopAutoplay);
    wrapper.addEventListener("mouseleave", () => {
      if (document.visibilityState === 'visible') startAutoplay();
    });

    embla.on("select", resetProgress);
    embla.on("pointerDown", stopAutoplay);
    embla.on("init", resetProgress);
  });
}
