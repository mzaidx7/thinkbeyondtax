"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide inertia-smoothed scrolling (the scroll-film "butter").
 * Skipped entirely under reduced-motion or on coarse-pointer (touch) devices,
 * where native scroll is better. Lenis animates the real window scroll, so
 * Motion's useScroll continues to track normally.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // let other code opt out of smoothing (e.g. the ?jump dev contract)
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
