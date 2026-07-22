"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
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

/**
 * `onSettle` fires once: either immediately (shader will never mount here:
 * reduced motion / mobile / WebGL failed) or ~2 frames after the shader mounts,
 * which is enough for its one-time GL program compile (a genuine ~1s stall on
 * modest iGPUs, confirmed via the jank harness) to have already happened.
 * Hero uses this to hold `window.__ready` until the compile is done, so that
 * cost lands during initial page settle instead of colliding with the user's
 * first scroll input.
 */
export default function LiquidMetalBackdrop({ onSettle }: { onSettle?: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [allowed, setAllowed] = useState(false); // desktop + motion-ok
  const [failed, setFailed] = useState(false);
  const settledRef = useRef(false);

  const settle = () => {
    if (settledRef.current) return;
    settledRef.current = true;
    onSettle?.();
  };

  useEffect(() => {
    if (reduce) {
      settle(); // reduced motion: shader never mounts
      return;
    }
    const mq = window.matchMedia("(min-width: 1024px)");
    const applyAllowed = (matches: boolean) => {
      setAllowed(matches);
      if (!matches) settle(); // below 1024px the shader never mounts (display:none), independent of IO
    };
    applyAllowed(mq.matches);
    const onChange = (e: MediaQueryListEvent) => applyAllowed(e.matches);
    mq.addEventListener("change", onChange);
    const el = ref.current;
    let io: IntersectionObserver | undefined;
    if (el) {
      io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.01 });
      io.observe(el);
    }
    return () => {
      mq.removeEventListener("change", onChange);
      io?.disconnect();
    };
  }, [reduce]);

  const showShader = allowed && inView && !failed && !reduce;

  useEffect(() => {
    if (!showShader) {
      if (failed) settle(); // WebGL threw: shader never paints
      return;
    }
    // the GL context/program setup can span a handful of frames, not just one,
    // poll frame time and settle once it's actually back to normal, instead of
    // guessing a fixed frame count (capped so a persistently slow GPU still settles)
    let raf = 0;
    let last = performance.now();
    let stableStreak = 0;
    let frames = 0;
    const MAX_FRAMES = 90;
    const tick = () => {
      const now = performance.now();
      const delta = now - last;
      last = now;
      frames++;
      stableStreak = delta < 18 ? stableStreak + 1 : 0;
      if (stableStreak >= 5 || frames >= MAX_FRAMES) {
        settle();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [showShader, failed]);

  return (
    <div className={s.backdrop} ref={ref} aria-hidden="true">
      <div className={s.poster} />
      {showShader && (
        <ShaderBoundary onError={() => setFailed(true)}>
          <LiquidMetal
            colorBack="#050505"
            colorTint="#cf982f"
            speed={0.38}
            scale={1.05}
            softness={0.85}
            contour={0.68}
            distortion={0.32}
            repetition={2.4}
            shiftRed={0.35}
            shiftBlue={0.28}
            shape="none"
            maxPixelCount={900_000}
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
