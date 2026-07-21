import Chrome from "./Chrome";
import s from "./ScreenXero.module.css";

const topNav = [
  { label: "Dashboard", active: true },
  { label: "Accounts" },
  { label: "Payroll" },
  { label: "Reports" },
  { label: "Advisor" },
  { label: "Contacts" },
  { label: "Settings" },
];

const watchlist = [
  ["Advertising (600)", "2,500.00", "10,453.75"],
  ["Entertainment (620)", "0.00", "53.60"],
  ["Inventory (140)", "0.00", "0.00"],
  ["Sales (400)", "7,654.10", "29,250.85"],
];

export default function ScreenXero({ active }: { active: boolean }) {
  return (
    <div className={`screen ${s.root} ${active ? "is-active" : ""}`} data-screen="xero">
      <Chrome variant="browser" title="Xero | Dashboard" url="go.xero.com/Dashboard" accent="#13b5ea" />

      <div className={s.topnav} data-depth="1.1">
        <span className={s.org}>
          <i className={s.hamburger} />
          Al Sarh Trading (AE) <b>▾</b>
        </span>
        <nav>
          {topNav.map((n) => (
            <span key={n.label} className={n.active ? s.linkActive : s.link}>
              {n.label}
            </span>
          ))}
        </nav>
        <span className={s.topIcons}>
          <i>＋</i>
          <i>▤</i>
          <i className={s.mail}>✉<b>1</b></i>
          <i>⌕</i>
          <i>?</i>
        </span>
      </div>

      <div className={`screen-body ${s.body}`}>
        <div className={s.colL}>
          <div className={s.card} data-depth="1.5">
            <div className={s.bankHead}>
              <div>
                <p className={s.acctName}>Checking Account</p>
                <p className={s.acctNo}>13-2435-465</p>
              </div>
              <span className={s.manage}>Manage ▾</span>
            </div>
            <button className={s.reconcile} type="button" tabIndex={-1}>
              Reconcile <b id="xero-rec-count">12</b> items
            </button>
            <div className={s.bankBal}>
              <p>Balance in Xero <b className={s.neg}>(4,946.33)</b></p>
              <p>Statement balance <b>1,608.77</b></p>
            </div>
            <svg className={s.spark} viewBox="0 0 300 54" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 30 C30 26 45 32 70 24 S120 22 150 26 S210 30 250 34" fill="none" stroke="#2196ce" strokeWidth="2" />
              <path d="M0 30 C30 26 45 32 70 24 S120 22 150 26 S210 30 250 34 L250 50 L0 50 Z" fill="rgba(33,150,206,0.12)" />
              <path d="M250 34 C265 40 280 44 300 46" fill="none" stroke="#d9534f" strokeWidth="2" strokeDasharray="3 3" />
            </svg>
            <div className={s.sparkLabels}>
              <span>Sep 4</span><span>Sep 11</span><span>Sep 18</span><span>Sep 25</span>
            </div>
          </div>

          <div className={s.card} data-depth="1.35">
            <p className={s.cardTitle}>Savings Account</p>
            <p className={s.acctNoSm}>98-7654-321</p>
            <p className={s.noTx}>No transactions imported</p>
            <p className={s.importLink}>Import a bank statement to get started</p>
          </div>

          <div className={s.card} data-depth="1.4">
            <p className={s.cardTitle}>Total cash in and out</p>
            <svg className={s.cashChart} viewBox="0 0 300 90" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const ins = [22, 30, 20, 44, 38, 30][i];
                const outs = [16, 22, 14, 30, 40, 52][i];
                const x = 14 + i * 48;
                return (
                  <g key={i}>
                    <rect x={x} y={82 - ins} width="14" height={ins} rx="1" fill="#2196ce" />
                    <rect x={x + 17} y={82 - outs} width="14" height={outs} rx="1" fill="#c3ccd6" />
                  </g>
                );
              })}
              <line x1="0" y1="82" x2="300" y2="82" stroke="#e3e6ec" />
            </svg>
            <div className={s.cashLabels}>
              <span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
            </div>
          </div>
        </div>

        <div className={s.colR}>
          <div className={s.card} data-depth="1.45">
            <p className={s.cardTitle}>Account watchlist</p>
            <table className={s.watch}>
              <thead>
                <tr>
                  <th>Account</th>
                  <th>This month</th>
                  <th>YTD</th>
                </tr>
              </thead>
              <tbody>
                {watchlist.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={s.card} data-depth="1.3">
            <div className={s.owedHead}>
              <p className={s.cardTitle}>Invoices owed to you</p>
              <button className={s.newBtn} type="button" tabIndex={-1}>
                New sales invoice
              </button>
            </div>
            <div className={s.owedRows}>
              <p><span>2 Draft</span><b>1,100.00</b></p>
              <p><span>9 Awaiting payment</span><b>9,172.63</b></p>
              <p><span className={s.overdueLabel}>5 Overdue</span><b>6,978.08</b></p>
            </div>
            <svg className={s.owedChart} viewBox="0 0 300 56" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => {
                const h = [30, 48, 18, 26, 14][i];
                const red = i < 2;
                const x = 20 + i * 56;
                return <rect key={i} x={x} y={50 - h} width="26" height={h} rx="1" fill={red ? "#d9534f" : "#2196ce"} />;
              })}
              <line x1="0" y1="50" x2="300" y2="50" stroke="#e3e6ec" />
            </svg>
          </div>

          <div className={s.card} data-depth="1.35">
            <p className={s.cardTitle}>Bills you need to pay</p>
            <div className={s.owedRows}>
              <p><span>0 Draft</span><b>0.00</b></p>
              <p><span>17 Awaiting payment</span><b>10,291.84</b></p>
              <p><span className={s.overdueLabel}>4 Overdue</span><b>4,692.56</b></p>
            </div>
          </div>
        </div>

        <span className={`g-cursor ${s.cursor}`} />
      </div>
    </div>
  );
}
