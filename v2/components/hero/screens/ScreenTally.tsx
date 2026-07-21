import Chrome from "./Chrome";
import s from "./ScreenTally.module.css";

/** Gateway-of-Tally menu: [label, red-hotkey-splits] */
const menu = [
  { section: "Masters", items: [["", "C", "reate"], ["", "A", "lter"], ["C", "H", "art of Accounts"]] },
  { section: "Transactions", items: [["", "V", "ouchers"], ["Day Boo", "K", ""]] },
  { section: "Utilities", items: [["Ba", "N", "king"]] },
  {
    section: "Reports",
    items: [
      ["", "B", "alance Sheet"],
      ["", "P", "rofit & Loss A/c"],
      ["", "S", "tock Summary"],
      ["", "R", "atio Analysis"],
      ["", "D", "isplay More Reports"],
    ],
  },
];

export default function ScreenTally({ active }: { active: boolean }) {
  return (
    <div className={`screen ${s.root} ${active ? "is-active" : ""}`} data-screen="tally">
      <Chrome variant="windows" title="TallyPrime — Al Sarh Trading LLC" accent="#2f6fc1" />

      <div className={s.topbar} data-depth="1.1">
        <span className={s.logotype}>
          TallyPrime
          <b>SILVER</b>
        </span>
        <span className={s.manageGroup}>
          <i className={s.manageLabel}>Manage</i>
          <span className={s.menuRow}>
            <span><u>K</u>: Company</span>
            <span><u>Y</u>: Data</span>
            <span><u>Z</u>: Exchange</span>
          </span>
        </span>
        <span className={s.goTo}>
          <u>G</u>: Go To
        </span>
        <span className={s.menuRowRight}>
          <span><u>O</u>: Import</span>
          <span><u>E</u>: Export</span>
          <span><u>M</u>: E-mail</span>
          <span><u>P</u>: Print</span>
          <span>F1: Help</span>
        </span>
      </div>

      <div className={s.gwStrip} data-depth="1.1">
        <span>Gateway of Tally</span>
        <i>×</i>
      </div>

      <div className={`screen-body ${s.body}`}>
        <div className={s.leftPanel} data-depth="1.2">
          <div className={s.bandHead}>
            <span>Current Period</span>
            <span>Current Date</span>
          </div>
          <div className={s.bandVals}>
            <b>1-Jan-2026 to 31-Dec-2026</b>
            <b>Sunday, 20-Jul-2026</b>
          </div>
          <div className={s.bandHead}>
            <span>Name of Company</span>
            <span>Date of Last Entry</span>
          </div>
          <div className={s.bandVals}>
            <b className={s.coName}>Al Sarh Trading LLC</b>
            <b>19-Jul-2026</b>
          </div>
        </div>

        <div className={s.center}>
          <div className={s.gateway} data-depth="1.5">
            <div className={s.gwTitle}>Gateway of Tally</div>
            <div className={s.gwMenu}>
              <div className={s.hl} />
              {menu.map((group) => (
                <div key={group.section}>
                  <p className={s.gwLabel}>{group.section}</p>
                  {group.items.map(([pre, key, post]) => (
                    <span key={pre + key + post} className={s.gwItem}>
                      {pre}
                      <i>{key}</i>
                      {post}
                    </span>
                  ))}
                </div>
              ))}
              <span className={`${s.gwItem} ${s.quit}`}>
                <i>Q</i>uit
              </span>
            </div>
          </div>
        </div>

        <div className={s.sidebar} data-depth="1.3">
          <span className={s.sideBtn}>
            <b>F2</b>: Date
          </span>
          <span className={s.sideBtn}>
            <b>F3</b>: Company
          </span>
        </div>
      </div>
    </div>
  );
}
