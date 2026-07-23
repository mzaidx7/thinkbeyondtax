"use client";

import { useRef, useState } from "react";
import type { ServicePageConfig } from "@/lib/services";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import s from "./ServicePage.module.css";

interface Props {
  config: ServicePageConfig;
}

type LenisWindow = Window & {
  __lenis?: {
    scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => void;
  };
};

function SourceArrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export default function ServiceExperience({ config }: Props) {
  const root = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(config.offerings[0]?.id ?? "");

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 901px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const conditions = context.conditions as { desktop: boolean; reduceMotion: boolean };
          const sections = gsap.utils.toArray<HTMLElement>("[data-service-section]");

          sections.forEach((section) => {
            const id = section.dataset.serviceSection;
            if (!id) return;

            ScrollTrigger.create({
              trigger: section,
              start: conditions.desktop ? "top 38%" : "top 44%",
              end: conditions.desktop ? "bottom 38%" : "bottom 44%",
              onEnter: () => setActiveId(id),
              onEnterBack: () => setActiveId(id),
            });

            if (!conditions.reduceMotion) {
              gsap.from(section.querySelectorAll("[data-reveal]"), {
                opacity: 0,
                y: 24,
                duration: 0.66,
                stagger: 0.07,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: section,
                  start: "top 82%",
                  once: true,
                },
              });
            }
          });

          if (!conditions.reduceMotion) {
            gsap.from("[data-process-step]", {
              opacity: 0,
              y: 20,
              duration: 0.58,
              stagger: 0.1,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: "[data-process]",
                start: "top 80%",
                once: true,
              },
            });
          }
        },
      );

      return () => media.revert();
    },
    { scope: root, dependencies: [config.route], revertOnUpdate: true },
  );

  function handleAnchor(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const lenis = (window as LenisWindow).__lenis;
    if (!lenis) return;

    event.preventDefault();
    window.history.replaceState(null, "", `#${id}`);
    lenis.scrollTo(`#${id}`, { offset: -96, duration: 1.05 });
  }

  return (
    <section className={s.experience} ref={root}>
      <div className="container">
        <header className={s.sectionHead}>
          <p className="overline">Scope</p>
          <h2>{config.sectionTitle}</h2>
          <p>{config.sectionIntro}</p>
        </header>

        <div className={s.explorer}>
          <aside className={s.navWrap} aria-label={`${config.title} page sections`}>
            <p className={s.navLabel}>Explore this service</p>
            <ol className={s.serviceNav}>
              {config.offerings.map((offering, index) => (
                <li key={offering.id}>
                  <a
                    href={`#${offering.id}`}
                    aria-current={activeId === offering.id ? "location" : undefined}
                    onClick={(event) => handleAnchor(event, offering.id)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {offering.navLabel ?? offering.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className={s.offerings}>
            {config.offerings.map((offering, index) => (
              <article
                className={s.offering}
                id={offering.id}
                key={offering.id}
                data-service-section={offering.id}
              >
                <div className={s.offeringNumber} data-reveal>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className={s.offeringBody}>
                  <h3 data-reveal>{offering.title}</h3>
                  <p className={s.offeringSummary} data-reveal>
                    {offering.summary}
                  </p>
                  <ul data-reveal>
                    {offering.inclusions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {offering.note ? (
                    <p className={s.offeringNote} data-reveal>
                      {offering.note}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>

        <section className={s.process} data-process>
          <div className={s.processHead}>
            <p className="overline">How the work moves</p>
            <h2>{config.processTitle}</h2>
            <p>{config.processIntro}</p>
          </div>
          <ol className={s.processRail}>
            {config.process.map((step, index) => (
              <li key={step.title} data-process-step>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={s.systems} aria-labelledby="service-systems-title">
          <div>
            <p className="overline">Systems and source formats</p>
            <h2 id="service-systems-title">We work in the client&apos;s operating environment</h2>
            <p className={s.systemsNote}>{config.systemsNote}</p>
          </div>
          <ul>
            {config.systems.map((system) => (
              <li key={system}>{system}</li>
            ))}
          </ul>
        </section>

        {config.regulatoryFacts?.length ? (
          <section className={s.regulatory} aria-labelledby="service-facts-title">
            <div className={s.regulatoryHead}>
              <div>
                <p className="overline">Current official context</p>
                <h2 id="service-facts-title">Key dates and thresholds</h2>
              </div>
              {config.lastReviewed ? <p>Last reviewed {config.lastReviewed}</p> : null}
            </div>

            <div className={s.factStrip}>
              {config.regulatoryFacts.map((fact) => (
                <div className={s.fact} key={`${fact.value}-${fact.label}`}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                  <p>{fact.detail}</p>
                </div>
              ))}
            </div>

            {config.boundaryNote ? <p className={s.boundary}>{config.boundaryNote}</p> : null}

            {config.sources?.length ? (
              <div className={s.sources}>
                <p>Official sources</p>
                <ul>
                  {config.sources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href} target="_blank" rel="noopener noreferrer">
                        {source.label}
                        <SourceArrow />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </section>
  );
}
