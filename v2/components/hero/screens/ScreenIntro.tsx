import s from "./ScreenIntro.module.css";

/**
 * State 0 — the "desk" mosaic: six mini window-cards, one per platform,
 * floating in a loose scatter. The hero scatters them apart when the story
 * dives into the first platform (handled by Motion in Hero.tsx via the
 * .m-card selector).
 */
const cards = [
  { id: "tally", name: "TallyPrime", accent: "#2f6fc1", light: true, x: 5, y: 9, r: -4 },
  { id: "qbo", name: "QuickBooks Online", accent: "#2ca01c", light: false, x: 40, y: 4, r: 3 },
  { id: "qbd", name: "QuickBooks Desktop", accent: "#5588a3", light: true, x: 72, y: 13, r: -2 },
  { id: "zoho", name: "Zoho Books", accent: "#2f7af5", light: false, x: 9, y: 51, r: 3 },
  { id: "xero", name: "Xero", accent: "#13b5ea", light: false, x: 43, y: 46, r: -3 },
  { id: "emaratax", name: "EmaraTax", accent: "#b68a35", light: true, x: 73, y: 55, r: 4 },
];

export default function ScreenIntro({ active }: { active: boolean }) {
  return (
    <div className={`screen ${s.root} ${active ? "is-active" : ""}`} data-screen="intro">
      <div className={s.field}>
        {cards.map((c) => (
          <div
            key={c.id}
            className={`m-card ${s.card} ${c.light ? s.light : ""}`}
            style={
              {
                left: `${c.x}%`,
                top: `${c.y}%`,
                rotate: `${c.r}deg`,
                "--accent": c.accent,
              } as React.CSSProperties
            }
          >
            <div className={s.titlebar}>
              <span className={s.dot} />
              <span className={s.name}>{c.name}</span>
            </div>
            <div className={s.skeleton}>
              <i style={{ width: "72%" }} />
              <i style={{ width: "52%" }} />
              <div className={s.blocks}>
                <b />
                <b />
                <b />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className={s.caption}>The systems your business already runs on</p>
    </div>
  );
}
