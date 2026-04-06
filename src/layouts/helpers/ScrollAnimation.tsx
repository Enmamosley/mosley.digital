import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import React, { type ReactNode, useRef } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  animation?:
  | "fade"
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scale"
  | "slideUp"
  | "slideDown";
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
  stagger?: number;
  className?: string;
}

export default function ScrollAnimation({
  children,
  animation = "fadeUp",
  duration = 0.8,
  delay = 0,
  ease = "power2.out",
  start = "top 95%",
  end = "bottom 20%",
  scrub = false,
  markers = false,
  once = false,
  stagger = 0,
  className = "",
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const element = ref.current;
    const targets = stagger > 0 ? element.children : element;

    // Animation configurations
    const animations = {
      fade: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      fadeUp: {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
      },
      fadeDown: {
        from: { opacity: 0, y: -50 },
        to: { opacity: 1, y: 0 },
      },
      fadeLeft: {
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0 },
      },
      fadeRight: {
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0 },
      },
      scale: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
      },
      slideUp: {
        from: { y: 100 },
        to: { y: 0 },
      },
      slideDown: {
        from: { y: -100 },
        to: { y: 0 },
      },
    };

    const selectedAnimation = animations[animation];

    // Set initial state
    gsap.set(targets, { ...selectedAnimation.from, force3D: true });

    // Create animation
    gsap.to(targets, {
      ...selectedAnimation.to,
      duration,
      delay,
      ease,
      force3D: true,
      stagger: stagger > 0 ? stagger : 0,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        markers,
        once,
        fastScrollEnd: true,
      },
    });
  }, [animation, duration, delay, ease, start, end, scrub, markers, once, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
