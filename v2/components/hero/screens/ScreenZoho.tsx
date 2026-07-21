import Chrome from "./Chrome";
import s from "./ScreenZoho.module.css";

const navItems = [
  { label: "Home", active: true },
  { label: "Items" },
  { label: "Banking" },
  { label: "Sales", sub: ["Customers", "Estimates", "Retainer Invoices", "Sales Orders", "Invoices", "Credit Notes"] },
  { label: "Purchases" },
  { label: "Time Tracking" },
  { label: "Accountant" },
  { label: "Reports" },
  { label: "Documents" },
];

export default function ScreenZoho({ active }: { active: boolean }) {
  return (
    <div className={`screen ${s.root} ${active ? "is-active" : ""}`} data-screen="zoho">
      <Chrome variant="browser" title="Zoho Books" url="books.zoho.com/app/dashboard" accent="#2f7af5" />

      <div className={s.topbar} data-depth="1.1">
        <span className={s.logo}>
          <i className={s.logoMark} />
          Books
        </span>
        <span className={s.search}>⌕ Search</span>
        <span className={s.topRight}>
          <i className={s.plusTile}>＋</i>
          <i className={s.bell} />
          <b className={s.avatar}>A</b>
        </span>
      </div>

      <div className="screen-body">
        <aside className={s.side} data-depth="1.15">
          <p className={s.org}>Al Sarh Trading LLC</p>
          {navItems.map((item) => (
            <div key={item.label}>
              <span className={`${s.navItem} ${item.active ? s.navActive : ""}`}>
                <i className={s.navIco} />
                {item.label}
              </span>
              {item.sub && (
                <div className={s.subList}>
                  {item.sub.map((sl) => (
                    <span key={sl}>{sl}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>

        <div className={s.main}>
          <div className={s.topCards}>
            <div className={s.card} data-depth="1.45">
              <p className={s.cardTitle}>TOTAL RECEIVABLES</p>
              <p className={s.unpaid}>
                Total Unpaid Invoices <b>AED 96,320.00</b>
              </p>
              <div className={s.splitBar}>
                <i className={s.current} style={{ width: "64%" }} />
                <i className={s.overdue} style={{ width: "36%" }} />
              </div>
              <div className={s.splitLegend}>
                <p className={s.curLabel}>Current</p>
                <p className={s.overLabel}>Overdue</p>
              </div>
              <div className={s.splitVals}>
                <b>AED 61,200.00</b>
                <b>AED 35,120.00</b>
              </div>
            </div>

            <div className={s.card} data-depth="1.35">
              <p className={s.cardTitle}>TOTAL PAYABLES</p>
              <p className={s.unpaid}>
                Total Unpaid Bills <b>AED 42,780.00</b>
              </p>
              <div className={s.splitBar}>
                <i className={s.current} style={{ width: "78%" }} />
                <i className={s.overdue} style={{ width: "22%" }} />
              </div>
              <div className={s.splitLegend}>
                <p className={s.curLabel}>Current</p>
                <p className={s.overLabel}>Overdue</p>
              </div>
              <div className={s.splitVals}>
                <b>AED 33,400.00</b>
                <b>AED 9,380.00</b>
              </div>
            </div>
          </div>

          <div className={s.card} data-depth="1.55">
            <p className={s.cardTitle}>CASH FLOW</p>
            <div className={s.cashLayout}>
              <div className={s.chartWrap}>
                <svg viewBox="0 0 620 150" preserveAspectRatio="none" className={s.chart} aria-hidden="true">
                  <line x1="0" y1="120" x2="620" y2="120" stroke="#eceef2" />
                  <line x1="0" y1="80" x2="620" y2="80" stroke="#f2f3f6" />
                  <line x1="0" y1="40" x2="620" y2="40" stroke="#f2f3f6" />
                  <path
                    className={s.cashArea}
                    d="M8 108 C70 100 100 112 160 92 S260 56 320 64 S420 32 480 42 S580 20 612 26 L612 132 L8 132 Z"
                    fill="rgba(20,24,30,0.05)"
                  />
                  <path
                    className={s.cashLine}
                    d="M8 108 C70 100 100 112 160 92 S260 56 320 64 S420 32 480 42 S580 20 612 26"
                    fill="none"
                    stroke="#1c1c1e"
                    strokeWidth="2"
                  />
                </svg>
                <div className={s.months}>
                  <span>APR</span><span>JUN</span><span>AUG</span><span>OCT</span><span>DEC</span><span>FEB</span>
                </div>
              </div>
              <div className={s.cashRail}>
                <p className={s.railTop}>Cash as on 01-01-26</p>
                <p className={s.railVal}>AED 42,250.11</p>
                <p className={s.railTop}>Incoming</p>
                <p className={s.railIn}>AED 1,153,838.29 +</p>
                <p className={s.railTop}>Outgoing</p>
                <p className={s.railOut}>AED 1,059,118.12 −</p>
                <p className={s.railTop}>Cash as on 31-12-26</p>
                <p className={s.railVal}>AED 136,970.28 =</p>
              </div>
            </div>
          </div>

          <div className={s.bottomCards} data-depth="1.4">
            <div className={s.card}>
              <p className={s.cardTitle}>INCOME AND EXPENSE</p>
              <div className={s.barsMini}>
                <i style={{ height: "60%" }} className={s.barIn} />
                <i style={{ height: "38%" }} className={s.barEx} />
                <i style={{ height: "72%" }} className={s.barIn} />
                <i style={{ height: "44%" }} className={s.barEx} />
              </div>
            </div>
            <div className={s.card}>
              <p className={s.cardTitle}>TOP EXPENSES</p>
              <div className={s.donutRow}>
                <svg viewBox="0 0 42 42" className={s.donut} aria-hidden="true">
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="#eef0f4" strokeWidth="7" />
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="#2f7af5" strokeWidth="7" strokeDasharray="34 66" strokeDashoffset="25" />
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="#f5b622" strokeWidth="7" strokeDasharray="24 76" strokeDashoffset="-9" />
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="#53af50" strokeWidth="7" strokeDasharray="18 82" strokeDashoffset="-33" />
                </svg>
                <ul className={s.legend}>
                  <li><span style={{ background: "#2f7af5" }} />Salaries</li>
                  <li><span style={{ background: "#f5b622" }} />Rent</li>
                  <li><span style={{ background: "#53af50" }} />Marketing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
