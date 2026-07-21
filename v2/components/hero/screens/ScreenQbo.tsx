import Chrome from "./Chrome";
import s from "./ScreenQbo.module.css";

const navItems = [
  { label: "Dashboard", active: true },
  { label: "Banking" },
  { label: "Sales" },
  { label: "Customers & leads" },
  { label: "Cash flow" },
  { label: "Expenses" },
  { label: "Projects" },
  { label: "Payroll" },
  { label: "Reports" },
  { label: "Taxes" },
  { label: "Accounting" },
  { label: "My accountant" },
];

const tasks = [
  {
    overdue: true,
    title: "Remind your customers about 12 unpaid invoices",
    sub: "They're worth AED 38,550.00.",
  },
  {
    overdue: true,
    title: "Complete 2 overdue payroll tasks",
    sub: "Keep salaries and WPS records on schedule.",
  },
  {
    overdue: true,
    title: "Pay 5 overdue bills",
    sub: "They amount to AED 9,380.00.",
  },
  {
    overdue: false,
    title: "Pay 3 bills due in the next week",
    sub: "They amount to AED 6,200.00.",
  },
];

export default function ScreenQbo({ active }: { active: boolean }) {
  return (
    <div className={`screen ${s.root} ${active ? "is-active" : ""}`} data-screen="qbo">
      <Chrome
        variant="browser"
        title="QuickBooks Online"
        url="app.qbo.intuit.com/app/homepage"
        accent="#2ca01c"
      />

      <div className="screen-body">
        <aside className={s.nav} data-depth="1.15">
          <div className={s.brand}>
            <span className={s.logo}>qb</span>
            <span className={s.wordmark}>
              <i>intuit</i>
              quickbooks
            </span>
          </div>
          <button className={s.newBtn} type="button" tabIndex={-1}>
            + New
          </button>
          <p className={s.menuLabel}>
            Menu <i>✎</i>
          </p>
          <nav>
            {navItems.map((item) => (
              <span key={item.label} className={`${s.navItem} ${item.active ? s.navActive : ""}`}>
                {item.label}
                <i>›</i>
              </span>
            ))}
          </nav>
        </aside>

        <div className={s.main}>
          <div className={s.pageHead} data-depth="1.1">
            <span className={s.coLogo}>
              +<small>LOGO</small>
            </span>
            <h3>Al Sarh Trading LLC</h3>
            <div className={s.headIcons}>
              <span className={s.expert}>👤 My experts</span>
              <span className={s.expert}>? Help</span>
              <i />
              <i />
              <i />
              <b>A</b>
            </div>
          </div>

          <div className={s.tabs} data-depth="1.1">
            <span className={s.tabActive}>Get things done</span>
            <span>Business overview</span>
            <span className={s.privacy}>
              PRIVACY <i className={s.toggle} />
            </span>
          </div>

          <div className={s.grid}>
            <div className={s.tasksCard} data-depth="1.4">
              <p className={s.cardTitle}>Tasks</p>
              {tasks.map((t) => (
                <div key={t.title} className={s.taskRow}>
                  <div>
                    {t.overdue && <span className={s.overdue}>OVERDUE</span>}
                    <p className={s.taskTitle}>{t.title}</p>
                    <p className={s.taskSub}>{t.sub}</p>
                  </div>
                  <button className={s.goBtn} type="button" tabIndex={-1}>
                    Go
                  </button>
                </div>
              ))}
            </div>

            <div className={s.rightCol}>
              <div className={s.bankCard} data-depth="1.55">
                <div className={s.bankHead}>
                  <p className={s.cardTitleSm}>BANK ACCOUNTS</p>
                  <i>✎</i>
                </div>
                <div className={s.bankRow}>
                  <div>
                    <p className={s.bankName}>Emirates NBD Current</p>
                    <p className={s.bankSub}>Bank balance</p>
                    <p className={s.bankSub}>In QuickBooks</p>
                  </div>
                  <div className={s.bankVals}>
                    <p className={s.reviewed} id="qbo-reviewed">✓ Reviewed</p>
                    <p>AED 84,210.45</p>
                    <p>AED 84,210.45</p>
                  </div>
                </div>
                <div className={s.bankRow}>
                  <div>
                    <p className={s.bankName}>WIO Business</p>
                    <p className={s.bankSub}>In QuickBooks</p>
                  </div>
                  <div className={s.bankVals}>
                    <p className={s.toReview}>6 to review</p>
                    <p>AED 12,904.10</p>
                  </div>
                </div>
                <div className={s.bankFoot}>
                  <span className={s.connect}>Connect accounts</span>
                  <span className={s.registers}>Go to registers ▾</span>
                </div>
              </div>

              <div className={s.quickCard} data-depth="1.45">
                <p className={s.cardTitle}>Quick actions</p>
                <div className={s.quickGrid}>
                  <span>Create invoice</span>
                  <span>Record expense</span>
                  <span>Run report</span>
                  <span>Reconcile</span>
                </div>
              </div>
            </div>
          </div>

          <span className={`g-cursor ${s.cursor}`} />
        </div>
      </div>
    </div>
  );
}
