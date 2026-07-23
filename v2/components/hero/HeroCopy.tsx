"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { heroStates } from "@/lib/platforms";
import s from "./HeroCopy.module.css";

export default function HeroCopy({ current }: { current: number }) {
  const reduce = useReducedMotion();
  const state = heroStates[current];
  const words = state.headline.split(" ");
  const isIntro = current === 0;

  const Headline = isIntro ? "h1" : "p";
  const transition = reduce
    ? { duration: 0 }
    : { duration: 0.36, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className={s.copy}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className={s.state}
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -8 }}
          transition={transition}
        >
          <Headline
            className={s.headline}
            role={isIntro ? undefined : "heading"}
            aria-level={isIntro ? undefined : 2}
          >
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className={s.wordMask}>
                <span className={`${s.word} metal-text`}>{word}</span>
              </span>
            ))}
          </Headline>

          <p className={s.support}>{state.support}</p>

          <ul className={s.chips}>
            {state.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
