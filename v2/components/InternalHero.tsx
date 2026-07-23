"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import s from "./InternalHero.module.css";

/*
 * Direction contract
 * Goal: give every internal destination one recognisable, premium opening.
 * Atmosphere: quiet confidence, dark precision and restrained gold energy.
 * Composition: left-aligned copy with layered light moving behind, never through, the type.
 * Motion: one slow ambient drift plus scroll parallax, disabled for reduced motion.
 * Avoid: gradient text, ornamental clutter, fast loops and homepage property ownership.
 */

interface Props {
  overline: string;
  title: string;
  intro: string;
}

export default function InternalHero({ overline, title, intro }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-copy] > *", {
          opacity: 0,
          y: 22,
          duration: 0.72,
          stagger: 0.09,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });

        const ambient = gsap.timeline({ repeat: -1, yoyo: true });
        ambient
          .to("[data-hero-orbit='one']", {
            xPercent: 10,
            yPercent: -8,
            scale: 1.08,
            duration: 13,
            ease: "sine.inOut",
          })
          .to(
            "[data-hero-orbit='two']",
            {
              xPercent: -12,
              yPercent: 10,
              scale: 0.94,
              duration: 16,
              ease: "sine.inOut",
            },
            0,
          );

        gsap.to("[data-hero-field]", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section className={s.hero} ref={root}>
      <div className={s.field} data-hero-field aria-hidden="true">
        <span className={`${s.orbit} ${s.orbitOne}`} data-hero-orbit="one" />
        <span className={`${s.orbit} ${s.orbitTwo}`} data-hero-orbit="two" />
        <span className={s.horizon} />
        <span className={s.grid} />
      </div>
      <div className={`container ${s.inner}`} data-hero-copy>
        <p className="overline">{overline}</p>
        <h1>{title}</h1>
        <p className={s.intro}>{intro}</p>
      </div>
    </section>
  );
}
