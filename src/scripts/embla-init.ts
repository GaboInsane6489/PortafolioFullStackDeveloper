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
      align: "start",
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
       TWEEN PHYSICS (Scale & Opacity & Parallax)
    ========================== */
    const TWEEN_FACTOR = 0.8; // <-- LÍNEA QUE CONTROLA LA "FRICCIÓN" (Tensión del efecto al arrastrar)
    const PARALLAX_FACTOR = 30; // <-- LÍNEA QUE CONTROLA EL DEEP PARALLAX (Porcentaje de desplazamiento, ej: 30%)

    const applyTween = (): void => {
      const scrollProgress = embla.scrollProgress();
      const snapList = embla.scrollSnapList();
      const totalSlides = embla.slideNodes().length;

      embla.slideNodes().forEach((slideNode, index) => {
        // Obtenemos la distancia del slide actual respecto al centro de visión
        let diffToTarget = scrollProgress - snapList[index];

        // Compensación matemática para el Loop (Inercia infinita)
        if (diffToTarget > 0.5) diffToTarget -= 1;
        if (diffToTarget < -0.5) diffToTarget += 1;

        // Calculamos el valor de interpolación en base a la distancia y fricción
        const tweenValue =
          1 - Math.abs(diffToTarget * TWEEN_FACTOR * totalSlides);

        // Escala entre 0.85 y 1.0, Opacidad entre 0.4 y 1.0
        const scale = Math.max(0.85, Math.min(tweenValue, 1));
        const opacity = Math.max(0.4, Math.min(tweenValue, 1));

        slideNode.style.transform = `scale(${scale})`;
        slideNode.style.opacity = `${opacity}`;
        slideNode.style.transformOrigin = "center center";

        // --- DEEP PARALLAX LOGIC ---
        // Identificamos la imagen dentro del slide
        const imgNode = slideNode.querySelector("img");
        if (imgNode) {
          // Si el slide se mueve hacia la izquierda (diff negativo), la imagen se mueve a la derecha (parallax positivo)
          // Multiplicamos por totalSlides para normalizar la distancia (1 = un slide entero de distancia)
          const parallaxTranslate =
            diffToTarget * totalSlides * PARALLAX_FACTOR;
          imgNode.style.transform = `translate3d(${parallaxTranslate}%, 0, 0)`;
        }
      });
    };

    embla.on("scroll", applyTween);
    embla.on("reInit", applyTween);

    /* =========================
       INIT
    ========================== */

    applyTween();

    if (autoplayEnabled) {
      startAutoplay();
    }
  });
}
