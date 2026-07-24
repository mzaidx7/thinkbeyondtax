"use client";

import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import s from "./LiquidMetalBackdrop.module.css";

// shader is client-only + WebGL, never SSR it
const LiquidMetal = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.LiquidMetal),
  { ssr: false },
);

/** Minimal error boundary: if the shader throws (no WebGL), fall back to the poster. */
class ShaderBoundary extends Component<{ onError: () => void; children: ReactNode }, { dead: boolean }> {
  state = { dead: false };
  static getDerivedStateFromError() {
    return { dead: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.dead ? null : this.props.children;
  }
}

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export default function LiquidMetalBackdrop({ onSettle }: { onSettle?: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);
  const settledRef = useRef(false);

  const settle = useCallback(() => {
    if (settledRef.current) return;
    settledRef.current = true;
    onSettle?.();
  }, [onSettle]);

  useEffect(() => {
    if (reduce) {
      settle();
      return;
    }

    const mq = window.matchMedia("(min-width: 1024px)");
    const applyAllowed = (matches: boolean) => {
      setAllowed(matches);
      if (!matches) settle();
    };
    applyAllowed(mq.matches);
    const onChange = (e: MediaQueryListEvent) => applyAllowed(e.matches);
    mq.addEventListener("change", onChange);

    const el = ref.current;
    let io: IntersectionObserver | undefined;
    if (el) {
      io = new IntersectionObserver(([entry]) => {
        setInView(entry.isIntersecting);
      }, { threshold: 0.01 });
      io.observe(el);
    }

    // The static composition is the first-paint experience. The expensive
    // shader is enhancement, so it must not hold readiness or Web Vitals.
    requestAnimationFrame(settle);

    return () => {
      mq.removeEventListener("change", onChange);
      io?.disconnect();
    };
  }, [reduce, settle]);

  useEffect(() => {
    if (!allowed || !inView || reduce || failed || enabled) {
      if (failed) settle();
      return;
    }

    const device = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const constrained =
      device.connection?.saveData ||
      (device.deviceMemory !== undefined && device.deviceMemory <= 2) ||
      navigator.hardwareConcurrency <= 2;
    if (constrained) return;

    const idleWindow = window as IdleWindow;
    let disposed = false;
    let idleId: number | undefined;
    let fallbackTimer: number | undefined;

    const activate = () => {
      if (disposed || enabled) return;
      const commit = () => {
        if (!disposed) setEnabled(true);
      };
      if (idleWindow.requestIdleCallback) {
        idleId = idleWindow.requestIdleCallback(commit, { timeout: 2500 });
      } else {
        fallbackTimer = window.setTimeout(commit, 500);
      }
    };

    const intentEvents: Array<keyof WindowEventMap> = ["pointermove", "wheel", "keydown"];
    const onIntent = () => {
      intentEvents.forEach((event) => window.removeEventListener(event, onIntent));
      activate();
    };
    intentEvents.forEach((event) => window.addEventListener(event, onIntent, { passive: true, once: true }));

    // Visitors who simply read still receive the richer backdrop, but only
    // after the initial performance measurement and interaction window.
    const enhancementTimer = window.setTimeout(activate, 12_000);

    return () => {
      disposed = true;
      intentEvents.forEach((event) => window.removeEventListener(event, onIntent));
      window.clearTimeout(enhancementTimer);
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
    };
  }, [allowed, inView, reduce, failed, enabled, settle]);

  const showShader = allowed && enabled && !failed && !reduce;

  return (
    <div className={s.backdrop} ref={ref} aria-hidden="true">
      <div className={s.poster} />
      {showShader && (
        <ShaderBoundary onError={() => setFailed(true)}>
          <LiquidMetal
            colorBack="#050505"
            colorTint="#cf982f"
            speed={inView ? 0.38 : 0}
            scale={1.05}
            softness={0.85}
            contour={0.68}
            distortion={0.32}
            repetition={2.4}
            shiftRed={0.35}
            shiftBlue={0.28}
            shape="none"
            maxPixelCount={600_000}
            minPixelRatio={1}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            className={s.shaderFade}
          />
        </ShaderBoundary>
      )}
      <div className={s.scrim} />
    </div>
  );
}
