"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import s from "./GoldDust.module.css";

/**
 * Ambient gold-pollen canvas over the hero (engine.md recipe):
 * one offscreen radial sprite, ~40 particles blitted with drawImage (never
 * shadowBlur), per-particle depth + sin twinkle. Fades out across the first
 * ~7% of the hero story and stops rendering at alpha 0. Off under reduced-motion.
 */
export default function GoldDust({ progressRef }: { progressRef: React.RefObject<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(1.5, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // offscreen radial sprite (soft gold dot)
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 32;
    const sctx = sprite.getContext("2d")!;
    const g = sctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,240,205,0.95)");
    g.addColorStop(0.4, "rgba(239,196,81,0.5)");
    g.addColorStop(1, "rgba(239,196,81,0)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, 32, 32);

    const N = 42;
    const parts = Array.from({ length: N }, () => {
      const depth = 0.4 + Math.random() * 0.9; // near = bigger/faster
      return {
        x: Math.random(),
        y: Math.random(),
        r: (2 + Math.random() * 4) * depth,
        vy: (0.02 + Math.random() * 0.05) * depth,
        vx: (Math.random() - 0.5) * 0.03,
        depth,
        phase: Math.random() * Math.PI * 2,
        tw: 0.6 + Math.random() * 1.6,
      };
    });

    let raf = 0;
    let t = 0;
    const render = () => {
      const p = progressRef.current ?? 0;
      const fade = 1 - Math.min(1, p / 0.07); // gone by 7% of story
      if (fade <= 0) {
        ctx.clearRect(0, 0, w, h);
        raf = requestAnimationFrame(render);
        return;
      }
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const pt of parts) {
        pt.y -= pt.vy * 0.01;
        pt.x += pt.vx * 0.01;
        if (pt.y < -0.05) pt.y = 1.05;
        if (pt.x < -0.05) pt.x = 1.05;
        if (pt.x > 1.05) pt.x = -0.05;
        const twinkle = 0.5 + 0.5 * Math.sin(t * pt.tw + pt.phase);
        const a = fade * pt.depth * (0.3 + 0.7 * twinkle);
        const size = pt.r * 2;
        ctx.globalAlpha = a;
        ctx.drawImage(sprite, pt.x * w - size / 2, pt.y * h - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduce, progressRef]);

  if (reduce) return null;
  return <canvas ref={canvasRef} className={s.dust} aria-hidden="true" />;
}
