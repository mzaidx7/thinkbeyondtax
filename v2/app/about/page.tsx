import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import InternalHero from "@/components/InternalHero";
import { COLLECTIVE_DISCLAIMER } from "@/lib/site";
import s from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Think Beyond Tax is a collaborative identity for a small group of independent, UAE-based accounting, bookkeeping and tax professionals.",
};

export default function AboutPage() {
  return (
    <>
      <InternalHero
        overline="About"
        title="Independent professionals, one shared standard"
        intro="Think Beyond Tax is a collaborative identity for a small group of independent, UAE-based accounting, bookkeeping and tax professionals."
      />

      <section className="section">
        <div className={`container ${s.cols}`}>
          <div>
            <h2 className={s.h2}>Why a collective?</h2>
            <p className={s.copy}>
              Small and medium businesses in the UAE often face an awkward choice: large firms that
              feel distant and expensive, or individual freelancers whose availability and
              consistency can vary. Think Beyond Tax exists in the space between: experienced
              independent professionals working under one shared brand, with common working standards
              and a consistent way of engaging.
            </p>
            <h2 className={s.h2}>How engagements work</h2>
            <p className={s.copy}>
              The brand coordinates enquiries and connects you with the right member of the
              collective. Before any paid engagement begins, the responsible professional or licensed
              provider is identified by name, in your proposal, your engagement letter and your
              invoices. That person remains accountable for the work throughout.
            </p>
            <h2 className={s.h2}>What we value</h2>
            <p className={s.copy}>
              Clear records over clever shortcuts. Practical explanations over jargon. Transparency
              about who does the work and what it costs. And software-first delivery: we work inside
              the systems your business already uses rather than forcing you into ours.
            </p>
          </div>
          <aside className={s.trustBox}>
            <p className="overline">Transparency</p>
            <p>{COLLECTIVE_DISCLAIMER}</p>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
