import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import InternalHero from "@/components/InternalHero";
import { serviceNavigation } from "@/lib/services";
import s from "./services.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Independent UAE professional support for accounting, bookkeeping, VAT, Corporate Tax, e-invoicing readiness and EmaraTax administration.",
};

const groups = ["Core", "Tax and compliance"] as const;

function Arrow() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 9h10M10 5l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export default function ServicesHub() {
  return (
    <>
      <InternalHero
        overline="Services"
        title="Support that fits how your business already operates"
        intro="Independent UAE professionals helping businesses keep records current, close difficult periods, prepare tax work, navigate EmaraTax and get ready for structured e-invoicing."
      />

      <section className={`section ${s.index}`}>
        <div className="container">
          {groups.map((group) => {
            const items = serviceNavigation.filter((item) => item.group === group);
            return (
              <div key={group} className={s.group}>
                <div className={s.groupHead}>
                  <p className="overline">{group}</p>
                  <p>{group === "Core" ? "Records, systems and recurring delivery" : "Tax preparation and portal administration"}</p>
                </div>
                <div className={s.grid}>
                  {items.map((item, index) => (
                    <Link key={item.href} className={s.card} href={item.href}>
                      <span className={s.number}>{String(index + 1).padStart(2, "0")}</span>
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                      <span className={s.linkLabel}>
                        View full scope
                        <Arrow />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
