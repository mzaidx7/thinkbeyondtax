import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { heroStates } from "../../data/platforms";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

const SEGMENTS = heroStates.length - 1; // 6 intervals between 7 states

export function initHero() {
  const pinEl = document.getElementById("hero-pin");
  const stack = document.getElementById("screen-stack");
  const deviceScreen = document.getElementById("device-screen");
  if (!pinEl || !stack || !deviceScreen) return;

  const screens = Array.from(stack.querySelectorAll<HTMLElement>(".screen"));
  const headlines = Array.from(
    document.querySelectorAll<HTMLElement>("#swap-headlines > *"),
  );
  const supports = Array.from(
    document.querySelectorAll<HTMLElement>("#swap-supports > *"),
  );
  const chips = Array.from(
    document.querySelectorAll<HTMLElement>("#swap-chips > *"),
  );
  const dockTabs = Array.from(
    document.querySelectorAll<HTMLElement>("#platform-dock .dock-tab"),
  );
  const announcer = document.getElementById("hero-announcer");
  const hint = document.getElementById("dock-hint");
  const tiltEl = document.getElementById("device-tilt");
  const glareEl = document.getElementById("device-glare");
  const stage = document.querySelector<HTMLElement>(".hero-stage");

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- screen scaling (1200×750 canvas → device size) ---------- */
  const applyScale = () => {
    const scale = deviceScreen.clientWidth / 1200;
    stack.style.setProperty("--screen-scale", String(scale));
  };
  applyScale();
  new ResizeObserver(applyScale).observe(deviceScreen);

  /* ---------- size the stacked swap regions to their tallest child ---------- */
  const sizeSwaps = () => {
    for (const id of ["swap-headlines", "swap-supports", "swap-chips"]) {
      const wrap = document.getElementById(id);
      if (!wrap) continue;
      let max = 0;
      for (const child of Array.from(wrap.children) as HTMLElement[]) {
        max = Math.max(max, child.offsetHeight);
      }
      if (max > 0) wrap.style.minHeight = `${max}px`;
    }
  };
  sizeSwaps();
  window.addEventListener("resize", sizeSwaps);
  // re-measure once webfonts settle
  (document as any).fonts?.ready?.then(sizeSwaps);

  /* ---------- split headlines into words for the mask reveal ---------- */
  let splits: (SplitText | null)[] = [];
  if (!reduced) {
    try {
      splits = headlines.map(
        (h) => new SplitText(h, { type: "words", wordsClass: "hero-word" }),
      );
    } catch {
      splits = headlines.map(() => null);
    }
  }

  /* ---------- parallax layer cache ---------- */
  interface Layer {
    el: HTMLElement;
    depth: number;
    toX: (v: number) => void;
    toY: (v: number) => void;
  }
  const layerCache: Layer[][] = screens.map((screen) =>
    Array.from(screen.querySelectorAll<HTMLElement>("[data-depth]")).map((el) => ({
      el,
      depth: parseFloat(el.dataset.depth || "1"),
      toX: gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" }),
      toY: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" }),
    })),
  );

  /* ---------- state machine ---------- */
  let current = -1;
  let transition: gsap.core.Timeline | null = null;

  const announce = (i: number) => {
    if (!announcer) return;
    announcer.textContent =
      heroStates[i].dockLabel ?? "Overview of all supported platforms";
  };

  const updateDock = (i: number) => {
    dockTabs.forEach((tab) => {
      const idx = Number(tab.dataset.stateIndex);
      const selected = idx === i;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected || (i === 0 && idx === 1) ? 0 : -1;
      gsap.to(tab.querySelector(".dock-progress"), {
        scaleX: idx <= i ? 1 : 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  };

  /** Instant swap (used for init + reduced motion). */
  const setStateInstant = (i: number) => {
    transition?.kill();
    transition = null;
    current = i;
    screens.forEach((s, idx) => {
      s.classList.toggle("is-active", idx === i);
      gsap.set(s, { clearProps: "all" });
      gsap.set(s.querySelectorAll("[data-depth]"), { clearProps: "transform,opacity" });
    });
    [headlines, supports, chips].forEach((group) =>
      group.forEach((el, idx) => el.classList.toggle("is-current", idx === i)),
    );
    updateDock(i);
    announce(i);
  };

  /** Animated transition between states. */
  const animateTo = (next: number) => {
    if (next === current || next < 0 || next >= heroStates.length) return;
    if (reduced) {
      setStateInstant(next);
      return;
    }
    const prev = current;
    current = next;
    transition?.kill();

    const dir = next > prev ? 1 : -1;
    const prevScreen = screens[prev];
    const nextScreen = screens[next];
    const nextLayers = nextScreen.querySelectorAll<HTMLElement>("[data-depth]");

    const tl = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => {
        prevScreen?.classList.remove("is-active");
        gsap.set(prevScreen, { clearProps: "all" });
        if (prevScreen)
          gsap.set(prevScreen.querySelectorAll("[data-depth]"), {
            clearProps: "transform,opacity",
          });
        transition = null;
      },
    });
    transition = tl;

    /* --- outgoing screen --- */
    if (prevScreen) {
      if (prev === 0) {
        // the intro mosaic scatters apart
        const cards = prevScreen.querySelectorAll<HTMLElement>(".m-card");
        tl.to(
          cards,
          {
            x: (idx) => (idx % 2 === 0 ? -1 : 1) * gsap.utils.random(120, 260),
            y: (idx) => (idx % 3 === 0 ? -1 : 1) * gsap.utils.random(60, 160),
            opacity: 0,
            scale: 1.08,
            duration: 0.55,
            ease: "power2.in",
            stagger: 0.04,
          },
          0,
        );
        tl.to(prevScreen, { opacity: 0, duration: 0.45, ease: "power2.in" }, 0.15);
      } else {
        tl.to(
          prevScreen,
          {
            opacity: 0,
            scale: 0.985,
            y: -14 * dir,
            duration: 0.4,
            ease: "power2.in",
          },
          0,
        );
      }
    }

    /* --- incoming screen assembles --- */
    nextScreen.classList.add("is-active");
    tl.fromTo(
      nextScreen,
      { opacity: 0, scale: 1.01, y: 18 * dir },
      { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "power3.out" },
      0.3,
    );
    if (nextLayers.length) {
      tl.fromTo(
        nextLayers,
        { y: 26 * dir, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.055,
          clearProps: "transform,opacity",
        },
        0.38,
      );
    }

    /* --- copy swap --- */
    const swapGroup = (
      group: HTMLElement[],
      inVars: gsap.TweenVars,
      outVars: gsap.TweenVars,
      pos: number,
    ) => {
      const out = group[prev];
      const inc = group[next];
      if (out) {
        tl.to(out, { ...outVars, duration: 0.32, ease: "power2.in" }, 0);
        tl.set(out, { clearProps: "all" }, 0.34);
        tl.add(() => out.classList.remove("is-current"), 0.34);
      }
      tl.add(() => inc.classList.add("is-current"), pos);
      tl.fromTo(inc, { opacity: 0, ...inVars }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        clearProps: "opacity,transform",
      }, pos);
    };

    // headline: word-stagger reveal when SplitText is available
    const outH = headlines[prev];
    const incH = headlines[next];
    if (outH) {
      tl.to(outH, { opacity: 0, y: -16, duration: 0.3, ease: "power2.in" }, 0);
      tl.set(outH, { clearProps: "all" }, 0.32);
      tl.add(() => outH.classList.remove("is-current"), 0.32);
    }
    tl.add(() => incH.classList.add("is-current"), 0.34);
    const words = splits[next]?.words;
    if (words && words.length) {
      tl.set(incH, { opacity: 1 }, 0.34);
      tl.fromTo(
        words,
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.04,
        },
        0.36,
      );
    } else {
      tl.fromTo(
        incH,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", clearProps: "opacity,transform" },
        0.36,
      );
    }

    swapGroup(supports, { y: 16 }, { opacity: 0, y: -10 }, 0.42);
    swapGroup(chips, { y: 12 }, { opacity: 0, y: -8 }, 0.5);

    updateDock(next);
    announce(next);
  };

  // initial state
  setStateInstant(0);

  /* ---------- media-dependent behaviour ---------- */
  const mm = gsap.matchMedia();
  let scrollTriggerRef: ScrollTrigger | null = null;

  /* ----- desktop: pinned scroll story + tilt/glare parallax ----- */
  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const st = ScrollTrigger.create({
        trigger: pinEl,
        start: "top top",
        end: `+=${SEGMENTS * 90}%`,
        pin: true,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / SEGMENTS,
          duration: { min: 0.25, max: 0.7 },
          ease: "power2.inOut",
          delay: 0.08,
        },
        onUpdate: (self) => {
          if (self.progress > 0.015) hint?.classList.add("hidden");
          const idx = Math.round(self.progress * SEGMENTS);
          if (idx !== current && !((self as any)._dockJump)) animateTo(idx);
        },
      });
      scrollTriggerRef = st;

      // dock click → tween scroll position (scroll stays the source of truth)
      const onDockClick = (e: Event) => {
        const tab = (e.target as HTMLElement).closest<HTMLElement>(".dock-tab");
        if (!tab) return;
        const idx = Number(tab.dataset.stateIndex);
        const target = st.start + (st.end - st.start) * (idx / SEGMENTS);
        gsap.to(window, {
          scrollTo: { y: target, autoKill: true },
          duration: 0.9,
          ease: "power2.inOut",
        });
      };
      const dock = document.getElementById("platform-dock");
      dock?.addEventListener("click", onDockClick);

      // keyboard support for the tablist
      const onDockKey = (e: KeyboardEvent) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        const delta = e.key === "ArrowRight" ? 1 : -1;
        const idx = Math.min(SEGMENTS, Math.max(1, current + delta));
        const target = st.start + (st.end - st.start) * (idx / SEGMENTS);
        gsap.to(window, {
          scrollTo: { y: target, autoKill: true },
          duration: 0.7,
          ease: "power2.inOut",
        });
        dockTabs[idx - 1]?.focus();
      };
      dock?.addEventListener("keydown", onDockKey);

      /* --- pointer tilt + glare + layered parallax --- */
      let hover = false;
      const rotX = tiltEl ? gsap.quickTo(tiltEl, "rotationX", { duration: 0.7, ease: "power3.out" }) : null;
      const rotY = tiltEl ? gsap.quickTo(tiltEl, "rotationY", { duration: 0.7, ease: "power3.out" }) : null;
      const glareX = glareEl ? gsap.quickTo(glareEl, "xPercent", { duration: 0.7, ease: "power3.out" }) : null;
      const glareO = glareEl ? gsap.quickTo(glareEl, "opacity", { duration: 0.5, ease: "power2.out" }) : null;

      const onMove = (e: PointerEvent) => {
        if (!stage) return;
        const r = stage.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
        const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
        hover = true;
        rotY?.(nx * 5.5);
        rotX?.(ny * -3.5);
        glareX?.(nx * 26);
        glareO?.(0.85);
        const layers = layerCache[current] ?? [];
        for (const l of layers) {
          l.toX(nx * 13 * (l.depth - 1));
          l.toY(ny * 9 * (l.depth - 1));
        }
      };
      const onLeave = () => {
        hover = false;
        rotY?.(0);
        rotX?.(0);
        glareO?.(0);
        for (const group of layerCache)
          for (const l of group) {
            l.toX(0);
            l.toY(0);
          }
      };
      stage?.addEventListener("pointermove", onMove);
      stage?.addEventListener("pointerleave", onLeave);

      return () => {
        st.kill();
        scrollTriggerRef = null;
        dock?.removeEventListener("click", onDockClick);
        dock?.removeEventListener("keydown", onDockKey);
        stage?.removeEventListener("pointermove", onMove);
        stage?.removeEventListener("pointerleave", onLeave);
        if (hover) onLeave();
      };
    },
  );

  /* ----- touch / narrow: swipe deck + auto-advance ----- */
  mm.add(
    "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
    () => {
      let timer: number | undefined;
      let interacted = false;

      const stop = () => {
        interacted = true;
        if (timer) window.clearInterval(timer);
        timer = undefined;
      };

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !interacted && !timer) {
            timer = window.setInterval(() => {
              animateTo(current >= SEGMENTS ? 1 : current + 1);
            }, 5500);
          } else if (!entry.isIntersecting && timer) {
            window.clearInterval(timer);
            timer = undefined;
          }
        },
        { threshold: 0.35 },
      );
      if (stage) io.observe(stage);

      // swipe between platforms
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
        stop();
        hint?.classList.add("hidden");
        if (dx < 0) animateTo(current >= SEGMENTS ? 1 : current + 1);
        else animateTo(current <= 1 ? SEGMENTS : current - 1);
      };
      stage?.addEventListener("pointerdown", onDown);
      stage?.addEventListener("pointerup", onUp);

      const onDockClick = (e: Event) => {
        const tab = (e.target as HTMLElement).closest<HTMLElement>(".dock-tab");
        if (!tab) return;
        stop();
        animateTo(Number(tab.dataset.stateIndex));
      };
      const dock = document.getElementById("platform-dock");
      dock?.addEventListener("click", onDockClick);

      if (hint) hint.querySelector("span")!.textContent = "Swipe the screen to explore";

      return () => {
        stop();
        io.disconnect();
        stage?.removeEventListener("pointerdown", onDown);
        stage?.removeEventListener("pointerup", onUp);
        dock?.removeEventListener("click", onDockClick);
      };
    },
  );

  /* ----- reduced motion: dock switches instantly ----- */
  mm.add("(prefers-reduced-motion: reduce)", () => {
    const onDockClick = (e: Event) => {
      const tab = (e.target as HTMLElement).closest<HTMLElement>(".dock-tab");
      if (!tab) return;
      setStateInstant(Number(tab.dataset.stateIndex));
    };
    const dock = document.getElementById("platform-dock");
    dock?.addEventListener("click", onDockClick);
    hint?.classList.add("hidden");
    return () => dock?.removeEventListener("click", onDockClick);
  });
}
