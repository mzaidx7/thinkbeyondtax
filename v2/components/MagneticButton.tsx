"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

interface Props {
  href: string;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

/**
 * Magnetic hover: the button is gently pulled toward the cursor and springs
 * back on leave. Applied to a single focal CTA only (per the motion guidance).
 * Disabled under reduced-motion.
 */
export default function MagneticButton({ href, className, children, target, rel }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.a>
  );
}
