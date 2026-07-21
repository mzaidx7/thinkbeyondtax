"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import s from "./LiquidMetalBackdrop.module.css";

// shader is client-only + WebGL — never SSR it
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

export default function LiquidMetalBackdrop() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [allowed, setAllowed] = useState(false); // desktop + motion-ok
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    setAllowed(mq.matches);
    const onChange = () => setAllowed(mq.matches);
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

  return (
    <div className={s.backdrop} ref={ref} aria-hidden="true">
      {showShader ? (
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
          />
        </ShaderBoundary>
      ) : (
        <div className={s.poster} />
      )}
      <div className={s.scrim} />
    </div>
  );
}
