import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect, useRef } from "react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Defer initialization to reduce initial load impact
    const initSmooth = () => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(initSmooth);
    } else {
      setTimeout(initSmooth, 1);
    }

    // Scroll to top on Astro View Transitions navigation
    const onPageSwap = () => {
      lenisRef.current?.scrollTo(0, { immediate: true });
    };

    document.addEventListener("astro:after-swap", onPageSwap);

    return () => {
      document.removeEventListener("astro:after-swap", onPageSwap);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return null;
};

export default SmoothScroll;
