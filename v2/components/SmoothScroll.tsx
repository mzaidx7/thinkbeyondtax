"use client";

import { useEffect } from "react";

type LenisInstance = import("lenis").default;
type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

/**
 * Lenis and ScrollTrigger share GSAP's single animation loop on fine pointers.
 * Touch and reduced-motion users keep native scrolling. Lenis still animates
 * the real window position, so the existing Motion homepage remains isolated.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const idleWindow = window as IdleWindow;
    let disposed = false;
    let loading = false;
    let lenis: LenisInstance | undefined;
    let cleanupRuntime: (() => void) | undefined;
    let idleId: number | undefined;

    const setup = async () => {
      if (disposed || loading || lenis) return;
      loading = true;
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("@/lib/gsap"),
      ]);
      if (disposed) return;

      lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        autoRaf: false,
        anchors: { offset: -96 },
      });

      const updateScrollTrigger = () => ScrollTrigger.update();
      const tick = (time: number) => lenis?.raf(time * 1000);

      lenis.on("scroll", updateScrollTrigger);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
      (window as unknown as { __lenis?: LenisInstance }).__lenis = lenis;

      cleanupRuntime = () => {
        lenis?.off("scroll", updateScrollTrigger);
        gsap.ticker.remove(tick);
      };
    };

    const schedule = () => {
      if (idleId !== undefined || loading || lenis) return;
      if (idleWindow.requestIdleCallback) {
        idleId = idleWindow.requestIdleCallback(() => void setup(), { timeout: 2500 });
      } else {
        window.setTimeout(() => void setup(), 500);
      }
    };

    const intentEvents: Array<keyof WindowEventMap> = ["pointermove", "wheel", "keydown"];
    const onIntent = () => {
      intentEvents.forEach((event) => window.removeEventListener(event, onIntent));
      schedule();
    };
    intentEvents.forEach((event) => window.addEventListener(event, onIntent, { passive: true, once: true }));
    const fallbackTimer = window.setTimeout(schedule, 8000);

    return () => {
      disposed = true;
      intentEvents.forEach((event) => window.removeEventListener(event, onIntent));
      window.clearTimeout(fallbackTimer);
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      cleanupRuntime?.();
      lenis?.destroy();
      delete (window as unknown as { __lenis?: LenisInstance }).__lenis;
    };
  }, []);

  return null;
}
