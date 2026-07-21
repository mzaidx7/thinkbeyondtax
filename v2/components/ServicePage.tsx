import CtaBand from "./CtaBand";
import { platformStates } from "@/lib/platforms";
import s from "./ServicePage.module.css";

interface Props {
  title: string;
  overline?: string;
  intro: string;
  covers: string[];
  children?: React.ReactNode;
}

export default function ServicePage({ title, overline = "Services", intro, covers, children }: Props) {
  return (
    <>
      <section className={`hex-bg ${s.hero}`}>
        <div className="container">
          <p className="overline">{overline}</p>
          <h1 className={s.h1}>{title}</h1>
          <p className={s.intro}>{intro}</p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.body}`}>
          <div>
            <h2 className={s.bodyH2}>What this covers</h2>
            <ul className={s.covers}>
              {covers.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            {children}
          </div>
          <aside className={s.aside}>
            <p className="overline">Systems we work in</p>
            <ul className={s.platforms}>
              {platformStates.map((p) => (
                <li key={p.id}>{p.dockLabel}</li>
              ))}
            </ul>
            <p className={s.note}>
              Every engagement is led by a named independent professional who remains responsible for
              the work.
            </p>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
