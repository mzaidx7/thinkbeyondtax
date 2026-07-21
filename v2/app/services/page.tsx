import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import s from "./services.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Independent UAE professionals supporting businesses with bookkeeping, accounting, financial reporting, VAT and Corporate Tax.",
};

const groups = [
  {
    label: "Core",
    items: [
      { title: "Accounting", href: "/services/accounting", desc: "Accurate records, closings and management reporting." },
      { title: "Bookkeeping", href: "/services/bookkeeping", desc: "Day-to-day entries, reconciliations and clean books." },
    ],
  },
  {
    label: "Tax Services",
    items: [
      { title: "VAT", href: "/services/tax/vat", desc: "Registration, VAT-ready records and return support." },
      { title: "Corporate Tax", href: "/services/tax/corporate-tax", desc: "Registration, readiness and return preparation support." },
    ],
  },
];

export default function ServicesHub() {
  return (
    <>
      <section className={`hex-bg ${s.hero}`}>
        <div className="container">
          <p className="overline">Services</p>
          <h1 className={s.h1}>Support that fits how your business already operates</h1>
          <p className={s.intro}>
            Independent UAE professionals supporting businesses with bookkeeping, accounting,
            financial reporting, VAT and Corporate Tax — inside TallyPrime, QuickBooks, Zoho Books,
            Xero and EmaraTax.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {groups.map((g) => (
            <div key={g.label} className={s.group}>
              <p className="overline">{g.label}</p>
              <div className={s.grid}>
                {g.items.map((item) => (
                  <Link key={item.href} className={s.card} href={item.href}>
                    <h2>{item.title}</h2>
                    <p>{item.desc}</p>
                    <span>Learn more →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
