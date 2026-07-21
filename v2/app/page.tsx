import Link from "next/link";
import Hero from "@/components/hero/Hero";
import CtaBand from "@/components/CtaBand";
import { platformStates } from "@/lib/platforms";
import s from "./page.module.css";

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
    desc: "Day-to-day entries, reconciliations and clean books — in the software you already run.",
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
];

const values = [
  {
    title: "Senior attention",
    desc: "Your work is handled by the experienced professional you speak with — not passed down a chain of juniors.",
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
};

export default function Home() {
  return (
    <>
      <Hero />

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

      <section className="section" id="services">
        <div className="container">
          <div className="section-head">
            <p className="overline">Services</p>
            <h2>Practical support, end to end</h2>
            <p>
              From the first voucher entry to the final tax return — support that fits how your
              business already operates.
            </p>
          </div>
          <div className={s.svcGrid}>
            {services.map((svc) => (
              <Link key={svc.href} className={s.svcCard} href={svc.href}>
                <span className={s.svcIcon} aria-hidden="true">
                  {icons[svc.icon]}
                </span>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <span className={s.svcMore}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section hex-bg" id="about">
        <div className={`container ${s.aboutGrid}`}>
          <div>
            <p className="overline">About Think Beyond Tax</p>
            <h2 className={s.aboutH2}>A collective, not a corporation</h2>
            <p className={s.aboutCopy}>
              Think Beyond Tax is a shared professional identity for a small group of independent,
              UAE-based accounting, bookkeeping and tax professionals. More organised and consistent
              than a lone freelancer — more personal and accessible than a large firm.
            </p>
            <p className={s.aboutCopy}>
              We deliberately stay transparent about how this works: the brand coordinates, but every
              engagement is led and delivered by a named, appropriately authorised professional who
              remains responsible for the work from start to finish.
            </p>
            <Link className={`btn btn-ghost ${s.aboutBtn}`} href="/about">
              More about how we work
            </Link>
          </div>
          <ol className={s.steps}>
            <li>
              <span className={s.stepNum}>01</span>
              <h3>Discuss your requirements</h3>
              <p>Tell us how your records are kept, what software you use and where you need support.</p>
            </li>
            <li>
              <span className={s.stepNum}>02</span>
              <h3>Meet the right professional</h3>
              <p>We connect you with the member of the collective whose experience fits your situation.</p>
            </li>
            <li>
              <span className={s.stepNum}>03</span>
              <h3>A named provider leads your engagement</h3>
              <p>The responsible professional is named in your proposal and stays accountable throughout.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="overline">Why independent professionals</p>
            <h2>Big-firm discipline, without the big-firm distance</h2>
          </div>
          <div className={s.whyGrid}>
            {values.map((v) => (
              <div key={v.title} className={s.whyCard}>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
