declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
    Lenis?: any;
  }
}

export function setupMotion(): void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sections = document.querySelectorAll<HTMLElement>(".section-observe");

  sections.forEach((section) => section.classList.add("is-visible"));

  if (reduceMotion) {
    setupCounters(false);
    return;
  }

  if (window.Lenis && window.ScrollTrigger) {
    const lenis = new window.Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on("scroll", window.ScrollTrigger.update);
    window.gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    window.gsap.ticker.lagSmoothing(0);
  }

  // Automatic 4-Second Hero Background Slideshow (3 images)
  const slides = document.querySelectorAll<HTMLElement>(".hero-slide");
  if (slides && slides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove("is-active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("is-active");
    }, 4000);
  }

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    window.gsap.from(".hero-top-container > *", {
      y: 35,
      opacity: 0,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.12
    });
    window.gsap.from(".division-card", {
      opacity: 0,
      scale: 0.96,
      duration: 0.85,
      ease: "expo.out",
      stagger: 0.14,
      delay: 0.2,
      clearProps: "transform"
    });
    // Hero Parallax Effects
    window.gsap.to(".ocean-layer", {
      yPercent: 18,
      scale: 1.12,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
    window.gsap.to(".hero-top-container", {
      yPercent: -15,
      opacity: 0.7,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });

    // Truck Driving Scroll Animation - Always visible inside viewport
    const truckContainer = document.querySelector<HTMLElement>(".truck-animation-container");
    const truckWrapper = document.querySelector<HTMLElement>(".animated-truck-wrapper");
    if (truckContainer && truckWrapper) {
      const getDistance = (): number => Math.max(0, window.innerWidth - 360);
      window.gsap.fromTo(truckWrapper,
        { x: 0 },
        {
          x: (): number => getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".truck-animation-container",
            start: "top 90%",
            end: "bottom 10%",
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        }
      );
    }

    // Vessel Sailing Scroll Animation - Realistic Ocean Voyage
    const vesselSection = document.querySelector<HTMLElement>(".vessel-voyage-section");
    const vesselWrapper = document.querySelector<HTMLElement>(".animated-vessel-wrapper");
    if (vesselSection && vesselWrapper) {
      const getVesselDist = (): number => Math.max(0, window.innerWidth - 380);
      window.gsap.fromTo(vesselWrapper,
        { x: 0 },
        {
          x: (): number => getVesselDist(),
          ease: "none",
          scrollTrigger: {
            trigger: ".vessel-voyage-section",
            start: "top 90%",
            end: "bottom 10%",
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        }
      );
    }

    // Native Scroll Listener for Mobile Touch Devices
    window.addEventListener("scroll", () => {
      if (window.ScrollTrigger) window.ScrollTrigger.update();
    }, { passive: true });

    window.addEventListener("resize", () => {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    });

    // RAK Profile Parallax Effects
    window.gsap.to(".profile-wordmark", {
      xPercent: -10,
      ease: "none",
      scrollTrigger: { trigger: ".rak-profile", start: "top bottom", end: "bottom top", scrub: true }
    });
    window.gsap.to(".rak-photo-frame img", {
      yPercent: 15,
      scale: 1.06,
      ease: "none",
      scrollTrigger: { trigger: ".rak-profile", start: "top bottom", end: "bottom top", scrub: true }
    });

    // RAT Profile Parallax Effects
    window.gsap.to(".rat-image", {
      yPercent: 22,
      scale: 1.1,
      ease: "none",
      scrollTrigger: { trigger: ".rat-profile", start: "top bottom", end: "bottom top", scrub: true }
    });

    // Operations Port Map Parallax Effect
    window.gsap.to(".port-map", {
      yPercent: 6,
      ease: "none",
      scrollTrigger: { trigger: ".operations", start: "top bottom", end: "bottom top", scrub: true }
    });

    window.gsap.from(".timeline-list li", {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.16,
      scrollTrigger: { trigger: ".timeline", start: "top 70%" }
    });
  }

  setupCounters(true);
}

function setupCounters(animated: boolean): void {
  const counters = document.querySelectorAll<HTMLElement>("[data-counter]");

  const runCounter = (counter: HTMLElement): void => {
    const target = Number(counter.dataset.target ?? "0");
    if (!animated) {
      counter.textContent = String(target);
      return;
    }

    const startedAt = performance.now();
    const duration = 1100;
    const tick = (time: number): void => {
      const progress = Math.min((time - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = String(Math.round(target * eased));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.7 });

  counters.forEach((counter) => observer.observe(counter));
}
