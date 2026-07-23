"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { platformStates } from "@/lib/platforms";
import s from "./HomeSections.module.css";

const services = [
  {
    title: "Accounting",
    href: "/services/accounting",
    desc: "Accurate records, month-end closing and management reporting you can actually rely on.",
    icon: "ledger",
  },
  {
    title: "Bookkeeping",
    href: "/services/bookkeeping",
    desc: "Day-to-day entries, reconciliations and clean books, in the software you already run.",
    icon: "book",
  },
  {
    title: "VAT",
    href: "/services/tax/vat",
    desc: "Registration support, VAT-ready records and return preparation aligned with FTA requirements.",
    icon: "percent",
  },
  {
    title: "Corporate Tax",
    href: "/services/tax/corporate-tax",
    desc: "UAE Corporate Tax registration, readiness and return support for your first periods and beyond.",
    icon: "hex",
  },
  {
    title: "E-Invoicing",
    href: "/services/e-invoicing",
    desc: "Data readiness, system mapping and a clear bridge to the Accredited Service Provider you select.",
    icon: "invoice",
  },
  {
    title: "EmaraTax Support",
    href: "/services/tax/emaratax-support",
    desc: "Amendments, access recovery guidance, penalty applications, inquiries and tracked follow-up.",
    icon: "portal",
  },
];

const values = [
  {
    title: "Senior attention",
    desc: "Your work is handled by the experienced professional you speak with, not passed down a chain of juniors.",
  },
  {
    title: "Named accountability",
    desc: "Before any engagement begins, the responsible professional is identified by name and stays responsible for the work.",
  },
  {
    title: "Right-sized fees",
    desc: "Independent professionals carry no corporate overhead, so fees stay proportionate to the actual work involved.",
  },
  {
    title: "Shared standards",
    desc: "One collective identity, common working standards and consistent quality across every member of the group.",
  },
];

const icons: Record<string, React.ReactNode> = {
  ledger: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="4" width="20" height="24" rx="2" />
      <path d="M11 11h10M11 16h10M11 21h6" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 7c-2.5-2-6.5-2-10-1v19c3.5-1 7.5-1 10 1 2.5-2 6.5-2 10-1V6c-3.5-1-7.5-1-10 1Z" />
      <path d="M16 7v19" />
    </svg>
  ),
  percent: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="10" r="3.5" />
      <circle cx="22" cy="22" r="3.5" />
      <path d="M24 8 8 24" />
    </svg>
  ),
  hex: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 3l11 6.5v13L16 29 5 22.5v-13L16 3Z" />
      <path d="M12 14h8M16 10v8" />
    </svg>
  ),
  invoice: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 4h13l4 4v20H8z" />
      <path d="M21 4v5h5M12 14h9M12 19h9M12 24h5" />
    </svg>
  ),
  portal: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="5" width="22" height="22" rx="3" />
      <path d="M5 11h22M11 16h10M11 21h6" />
      <circle cx="9" cy="8" r=".7" fill="currentColor" stroke="none" />
    </svg>
  ),
};

const EASE = [0.22, 1, 0.36, 1] as const;

const MotionLink = motion.create(Link);

export default function HomeSections() {
  const reduce = useReducedMotion();

  // motion props are stripped under reduced-motion so content renders static
  const group = reduce
    ? {}
    : ({
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: EASE },
        viewport: { once: true, margin: "-70px" },
      } as const);
  const item = {};

  return (
    <>
      {/* platform strip */}
      <section className={s.strip}>
        <div className={`container ${s.stripInner}`}>
          {platformStates.map((p) => (
            <span key={p.id} className={s.stripChip}>
              {p.dockLabel}
            </span>
          ))}
          <span className={s.stripMore}>…and the systems around them</span>
        </div>
      </section>

      {/* services overview */}
      <section className="section" id="services">
        <div className="container">
          <motion.div className="section-head" {...group}>
            <motion.p className="overline" {...item}>
              Services
            </motion.p>
            <motion.h2 {...item}>Practical support, end to end</motion.h2>
            <motion.p {...item}>
              From the first voucher entry to the final tax return, support that fits how your
              business already operates.
            </motion.p>
          </motion.div>
          <motion.div className={s.svcGrid} {...group}>
            {services.map((svc) => (
              <MotionLink key={svc.href} className={s.svcCard} href={svc.href} {...item}>
                <span className={s.svcIcon} aria-hidden="true">
                  {icons[svc.icon]}
                </span>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <span className={s.svcMore}>Learn more →</span>
              </MotionLink>
            ))}
          </motion.div>
        </div>
      </section>

      {/* about */}
      <section className="section hex-bg" id="about">
        <div className={`container ${s.aboutGrid}`}>
          <motion.div {...group}>
            <motion.p className="overline" {...item}>
              About Think Beyond Tax
            </motion.p>
            <motion.h2 className={s.aboutH2} {...item}>
              A collective, not a corporation
            </motion.h2>
            <motion.p className={s.aboutCopy} {...item}>
              Think Beyond Tax is a shared professional identity for a small group of independent,
              UAE-based accounting, bookkeeping and tax professionals. More organised and consistent
              than a lone freelancer, more personal and accessible than a large firm.
            </motion.p>
            <motion.p className={s.aboutCopy} {...item}>
              We deliberately stay transparent about how this works: the brand coordinates, but every
              engagement is led and delivered by a named, appropriately authorised professional who
              remains responsible for the work from start to finish.
            </motion.p>
            <motion.div {...item}>
              <Link className={`btn btn-ghost ${s.aboutBtn}`} href="/about">
                More about how we work
              </Link>
            </motion.div>
          </motion.div>
          <motion.ol className={s.steps} {...group}>
            <motion.li {...item}>
              <span className={s.stepNum}>01</span>
              <h3>Discuss your requirements</h3>
              <p>Tell us how your records are kept, what software you use and where you need support.</p>
            </motion.li>
            <motion.li {...item}>
              <span className={s.stepNum}>02</span>
              <h3>Meet the right professional</h3>
              <p>We connect you with the member of the collective whose experience fits your situation.</p>
            </motion.li>
            <motion.li {...item}>
              <span className={s.stepNum}>03</span>
              <h3>A named provider leads your engagement</h3>
              <p>The responsible professional is named in your proposal and stays accountable throughout.</p>
            </motion.li>
          </motion.ol>
        </div>
      </section>

      {/* why independent professionals */}
      <section className="section">
        <div className="container">
          <motion.div className="section-head" {...group}>
            <motion.p className="overline" {...item}>
              Why independent professionals
            </motion.p>
            <motion.h2 {...item}>Big-firm discipline, without the big-firm distance</motion.h2>
          </motion.div>
          <motion.div className={s.whyGrid} {...group}>
            {values.map((v) => (
              <motion.div key={v.title} className={s.whyCard} {...item}>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
