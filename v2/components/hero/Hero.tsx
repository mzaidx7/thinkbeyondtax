"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
  useVelocity,
  useSpring,
  useTransform,
} from "motion/react";
import DeviceFrame from "./DeviceFrame";
import PlatformDock from "./PlatformDock";
import HeroCopy from "./HeroCopy";
import Altimeter from "./Altimeter";
import GoldDust from "./GoldDust";
import LiquidMetalBackdrop from "./LiquidMetalBackdrop";
import ScreenIntro from "./screens/ScreenIntro";
import ScreenTally from "./screens/ScreenTally";
import ScreenQbo from "./screens/ScreenQbo";
import ScreenQbd from "./screens/ScreenQbd";
import ScreenZoho from "./screens/ScreenZoho";
import ScreenXero from "./screens/ScreenXero";
import ScreenEmaraTax from "./screens/ScreenEmaraTax";
import MagneticButton from "@/components/MagneticButton";
import { heroStates, SEGMENTS } from "@/lib/platforms";
import { WHATSAPP_URL, TRADEMARK_DISCLAIMER } from "@/lib/site";
import s from "./Hero.module.css";

const screenComponents = [
  ScreenIntro,
  ScreenTally,
  ScreenQbo,
  ScreenQbd,
  ScreenZoho,
  ScreenXero,
  ScreenEmaraTax,
];

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [current, setCurrent] = useState(0);
  const [hintHidden, setHintHidden] = useState(false);
  const [desktop, setDesktop] = useState(true);
  const idleTimer = useRef<number | undefined>(undefined);
  const touched = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // scroll-velocity skew on the monitor (settles to 0 when scrolling stops)
  const scrollVel = useVelocity(scrollYProgress);
  const smoothVel = useSpring(scrollVel, { stiffness: 200, damping: 40, mass: 0.6 });
  const skewY = useTransform(smoothVel, [-4, 0, 4], [1.3, 0, -1.3], { clamp: true });
  const scaleY = useTransform(smoothVel, [-4, 0, 4], [0.98, 1, 0.98], { clamp: true });

  // detect desktop (drives scroll-story vs swipe-deck behaviour)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // scroll target (px) for a given state index
  const scrollToState = useCallback(
    (i: number) => {
      const sec = sectionRef.current;
      if (!sec) return;
      const dist = sec.offsetHeight - window.innerHeight;
      const y = sec.offsetTop + (i / SEGMENTS) * dist;
      window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce],
  );

  // desktop: scroll progress → state index, with snap-on-idle
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    progressRef.current = p;
    if (!desktop) return;
    if (p > 0.01) setHintHidden(true);
    const idx = Math.min(SEGMENTS, Math.max(0, Math.round(p * SEGMENTS)));
    setCurrent((c) => (c === idx ? c : idx));

    if (reduce) return;
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => {
      const cur = scrollYProgress.get();
      const nearest = Math.round(cur * SEGMENTS);
      const targetP = nearest / SEGMENTS;
      if (Math.abs(cur - targetP) > 0.012) scrollToState(nearest);
    }, 170);
  });

  // dock / swipe / altimeter select
  const selectState = useCallback(
    (i: number) => {
      setHintHidden(true);
      touched.current = true;
      if (desktop) scrollToState(i);
      else setCurrent(i);
    },
    [desktop, scrollToState],
  );

  // dev contract: ?jump=<y> lands pre-scrolled + settled; __ready gates the harness
  useEffect(() => {
    const jump = new URLSearchParams(window.location.search).get("jump");
    const finish = () => {
      (window as unknown as { __ready?: boolean }).__ready = true;
    };
    if (jump !== null) {
      history.scrollRestoration = "manual";
      const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: object) => void } }).__lenis;
      const y = parseInt(jump, 10) || 0;
      requestAnimationFrame(() => {
        if (lenis) lenis.scrollTo(y, { immediate: true });
        else window.scrollTo(0, y);
        const idx = Math.min(SEGMENTS, Math.max(0, Math.round((progressRef.current || 0) * SEGMENTS)));
        setCurrent(idx);
        requestAnimationFrame(finish);
      });
    } else {
      const fonts = (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts;
      if (fonts?.ready) fonts.ready.then(finish);
      else finish();
    }
  }, []);

  // mobile: auto-advance + swipe
  useEffect(() => {
    if (desktop || reduce) return;
    const stage = document.getElementById("hero-stage");
    if (!stage) return;

    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !touched.current && !timer) {
          timer = window.setInterval(() => {
            setCurrent((c) => (c >= SEGMENTS ? 1 : c + 1));
          }, 5500);
        } else if ((!entry.isIntersecting || touched.current) && timer) {
          window.clearInterval(timer);
          timer = undefined;
        }
      },
      { threshold: 0.35 },
    );
    io.observe(stage);

    let startX = 0;
    let startY = 0;
    const onDown = (e: PointerEvent) => {
      startX = e.clientX;
      startY = e.clientY;
    };
    const onUp = (e: PointerEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) < 42 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      touched.current = true;
      if (timer) {
        window.clearInterval(timer);
        timer = undefined;
      }
      setHintHidden(true);
      setCurrent((c) => {
        if (dx < 0) return c >= SEGMENTS ? 1 : c + 1;
        return c <= 1 ? SEGMENTS : c - 1;
      });
    };
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointerup", onUp);

    return () => {
      io.disconnect();
      if (timer) window.clearInterval(timer);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointerup", onUp);
    };
  }, [desktop, reduce]);

  const state = heroStates[current];

  return (
    <>
      <section className={`hex-bg ${s.section}`} ref={sectionRef}>
        <div className={s.sticky}>
          <LiquidMetalBackdrop />
          <GoldDust progressRef={progressRef} />

          <div className={`container ${s.grid}`}>
            <div className={s.copyCol}>
              <span className={s.badge}>
                <span className={s.badgeDot} />
                Think Beyond Tax · Independent UAE accounting &amp; tax professionals
              </span>

              <HeroCopy current={current} />

              <div className={s.ctas}>
                <MagneticButton
                  className="btn btn-gold"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discuss Your Requirements
                </MagneticButton>
                <a className="btn btn-ghost" href="/services">
                  Explore Our Services
                </a>
              </div>
            </div>

            <div className={s.dockArea}>
              <PlatformDock
                current={current}
                onSelect={selectState}
                hintText={desktop ? "Scroll to explore the platforms" : "Swipe the screen to explore"}
                hintHidden={hintHidden}
              />
              <span className={s.srOnly} aria-live="polite">
                {state.dockLabel ?? "Overview of all supported platforms"}
              </span>
            </div>

            <div className={s.stage} id="hero-stage">
              <motion.div
                className={s.skewer}
                style={reduce ? undefined : { skewY, scale: scaleY }}
              >
                <DeviceFrame facts={state.floatFacts} accent={state.accent}>
                  {screenComponents.map((Screen, i) => (
                    <motion.div
                      key={i}
                      className={s.slot}
                      animate={{
                        opacity: current === i ? 1 : 0,
                        scale: current === i ? 1 : 0.985,
                      }}
                      transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                      style={{ pointerEvents: current === i ? "auto" : "none", zIndex: current === i ? 2 : 1 }}
                    >
                      <Screen active={current === i} />
                    </motion.div>
                  ))}
                </DeviceFrame>
              </motion.div>
            </div>
          </div>

          <Altimeter current={current} onSelect={selectState} />
        </div>
      </section>

      <p className={`container ${s.disclaimer}`}>{TRADEMARK_DISCLAIMER}</p>
    </>
  );
}
