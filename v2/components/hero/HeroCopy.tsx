"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { heroStates } from "@/lib/platforms";
import s from "./HeroCopy.module.css";

export default function HeroCopy({ current }: { current: number }) {
  const reduce = useReducedMotion();
  const state = heroStates[current];
  const words = state.headline.split(" ");
  const isIntro = current === 0;

  // one metallic sheen sweep ~260ms after the headline settles
  const [sheen, setSheen] = useState(false);
  useEffect(() => {
    if (reduce) return;
    setSheen(false);
    const t1 = window.setTimeout(() => setSheen(true), 260);
    const t2 = window.setTimeout(() => setSheen(false), 260 + 1200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [current, reduce]);

  const wordVariants = {
    hidden: { y: "105%", opacity: 0, rotateX: reduce ? 0 : -55 },
    show: (i: number) => ({
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: { delay: reduce ? 0 : i * 0.035, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    }),
    exit: { y: "-60%", opacity: 0, transition: { duration: 0.25 } },
  };

  const fade = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
  };

  const Headline = isIntro ? motion.h1 : motion.p;
  const wordClass = `${s.word} metal-text ${sheen ? "metal-sheen" : ""}`;

  return (
    <div className={s.copy}>
      <AnimatePresence mode="wait">
        <Headline
          key={`h-${current}`}
          className={s.headline}
          role={isIntro ? undefined : "heading"}
          aria-level={isIntro ? undefined : 2}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {words.map((w, i) => (
            <span key={i} className={s.wordMask}>
              <motion.span className={wordClass} custom={i} variants={wordVariants}>
                {w}
              </motion.span>
            </span>
          ))}
        </Headline>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={`s-${current}`}
          className={s.support}
          variants={fade}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {state.support}
        </motion.p>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.ul
          key={`c-${current}`}
          className={s.chips}
          variants={fade}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {state.chips.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
