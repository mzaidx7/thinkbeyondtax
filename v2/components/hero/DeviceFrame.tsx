"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import s from "./DeviceFrame.module.css";

interface Props {
  children: React.ReactNode;
  facts: string[];
  accent: string;
}

const SPRING = { stiffness: 120, damping: 22, mass: 0.8 };

/** A single glass chip floating around the monitor at its own parallax depth. */
function FloatChip({
  sx,
  sy,
  mult,
  className,
  accent,
  label,
}: {
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  mult: number;
  className: string;
  accent: string;
  label: string;
}) {
  const x = useTransform(sx, (v) => v * mult);
  const y = useTransform(sy, (v) => v * mult * 0.7);
  return (
    <motion.div className={`${s.chip} ${className}`} style={{ x, y }}>
      <span className={s.chipDot} style={{ background: accent }} />
      {label}
    </motion.div>
  );
}

export default function DeviceFrame({ children, facts, accent }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // scale the fixed 1200×750 screen canvas to fit the monitor
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const apply = () => {
      el.style.setProperty("--screen-scale", String(el.clientWidth / 1200));
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // normalized pointer position (-1..1) and hover zoom target
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const zoom = useMotionValue(1);

  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);
  const sz = useSpring(zoom, { stiffness: 140, damping: 24 });

  // write pan/zoom/drift as CSS vars on the device root so the screen stack
  // and depth layers can read them (composes on GPU-friendly properties)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const write = () => {
      const x = sx.get();
      const y = sy.get();
      // pan-to-explore: content shifts opposite the cursor
      el.style.setProperty("--pan-x", (-x * 16).toFixed(2) + "px");
      el.style.setProperty("--pan-y", (-y * 12).toFixed(2) + "px");
      el.style.setProperty("--zoom", sz.get().toFixed(3));
      // scene drift: monitor + glow move with the cursor
      el.style.setProperty("--drift-x", (x * 10).toFixed(2) + "px");
      el.style.setProperty("--drift-y", (y * 8).toFixed(2) + "px");
      el.style.setProperty("--glow-x", (-x * 18).toFixed(2) + "px");
      el.style.setProperty("--tilt", (x * 1.2).toFixed(2) + "deg");
    };
    const unsubs = [sx.on("change", write), sy.on("change", write), sz.on("change", write)];
    write();
    return () => unsubs.forEach((u) => u());
  }, [sx, sy, sz]);

  // pointer handlers (desktop pointer only)
  useEffect(() => {
    if (reduce) return;
    const el = rootRef.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    if (!mq.matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      px.set(Math.max(-1, Math.min(1, nx)));
      py.set(Math.max(-1, Math.min(1, ny)));
      zoom.set(1.12);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
      zoom.set(1);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [px, py, zoom, reduce]);

  return (
    <div className={s.device} ref={rootRef} aria-hidden="true">
      <div className={s.glow} />

      <div className={s.tilt}>
        <div className={s.frame}>
          <div className={s.screen} ref={screenRef}>
            <div className={`${s.stack} screen-stack`}>{children}</div>
            <div className={s.glare} />
          </div>
          <span className={s.led} />
        </div>

        <div className={s.stand} />
        <div className={s.base} />
      </div>

      <div className={s.reflection} />

      {!reduce && (
        <div className={s.chips}>
          <FloatChip sx={sx} sy={sy} mult={34} className={s.chip1} accent={accent} label={facts[0]} />
          <FloatChip sx={sx} sy={sy} mult={-28} className={s.chip2} accent={accent} label={facts[1]} />
          <FloatChip sx={sx} sy={sy} mult={40} className={s.chip3} accent={accent} label={facts[2]} />
        </div>
      )}
    </div>
  );
}
