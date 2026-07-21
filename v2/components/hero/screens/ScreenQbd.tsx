import Chrome from "./Chrome";
import s from "./ScreenQbd.module.css";

const menuRow = [
  "File", "Edit", "View", "Lists", "Favorites", "Company",
  "Customers", "Vendors", "Employees", "Banking", "Reports", "Window", "Help",
];

const sideItems = [
  { label: "Home", active: true },
  { label: "My Company" },
  { label: "Income Tracker" },
  { label: "Bill Tracker" },
  { label: "Calendar" },
  { label: "Snapshots" },
  { label: "Customers" },
  { label: "Vendors" },
  { label: "Employees" },
  { label: "Bank Feeds" },
  { label: "Docs" },
  { label: "Reports" },
];

function Arrow({ className }: { className?: string }) {
  return (
    <svg className={`${s.arrow} ${className ?? ""}`} viewBox="0 0 44 12">
      <path d="M2 6h34" />
      <path d="m32 1 8 5-8 5" className={s.arrHead} />
    </svg>
  );
}

function Step({ icon, label, small }: { icon: string; label: string; small?: boolean }) {
  return (
    <div className={`${s.step} ${small ? s.stepSm : ""}`}>
      <span className={`${s.icon} ${s[icon]}`} />
      <span className={s.stepLabel}>{label}</span>
    </div>
  );
}

export default function ScreenQbd({ active }: { active: boolean }) {
  return (
    <div className={`screen ${s.root} ${active ? "is-active" : ""}`} data-screen="qbd">
      <Chrome
        variant="windows"
        title="Al Sarh Trading LLC — QuickBooks Desktop Enterprise"
        accent="#5588a3"
      />

      <div className={s.menubar} data-depth="1.1">
        {menuRow.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      <div className="screen-body">
        <aside className={s.side} data-depth="1.15">
          <p className={s.sideHead}>My Shortcuts</p>
          {sideItems.map((item) => (
            <span key={item.label} className={`${s.sideItem} ${item.active ? s.sideActive : ""}`}>
              <i />
              {item.label}
            </span>
          ))}
        </aside>

        <div className={s.main}>
          <div className={s.tabs} data-depth="1.1">
            <span className={s.tabActive}>Home Page</span>
            <span>Insights</span>
          </div>

          <div className={s.layout}>
            <div className={s.flow}>
              <div className={s.zone} data-depth="1.4">
                <p className={s.zoneTitle}>Vendors</p>
                <div className={s.row}>
                  <Step icon="iPo" label="Purchase Orders" />
                  <Arrow className={s.a1} />
                  <Step icon="iRi" label="Receive Inventory" />
                  <Arrow className={s.a2} />
                  <Step icon="iEb" label="Enter Bills Against Inventory" />
                  <Arrow className={s.a3} />
                  <Step icon="iPb" label="Pay Bills" />
                </div>
              </div>

              <div className={s.zone} data-depth="1.5">
                <p className={s.zoneTitle}>Customers</p>
                <div className={s.row}>
                  <Step icon="iEs" label="Sales Orders" />
                  <Arrow />
                  <Step icon="iCi" label="Create Invoices" />
                  <Arrow />
                  <Step icon="iRp" label="Receive Payments" />
                  <Arrow />
                  <Step icon="iRd" label="Record Deposits" />
                </div>
                <div className={s.rowSecondary}>
                  <Step icon="iCc" label="Accept Credit Cards" small />
                  <Step icon="iSt" label="Statements" small />
                  <Step icon="iRc" label="Refunds & Credits" small />
                </div>
              </div>

              <div className={s.zone} data-depth="1.35">
                <p className={s.zoneTitle}>Employees</p>
                <div className={s.row}>
                  <Step icon="iPc" label="Payroll Center" />
                  <Arrow />
                  <Step icon="iPe" label="Pay Employees" />
                  <Arrow />
                  <Step icon="iPl" label="Pay Liabilities" />
                  <Arrow />
                  <Step icon="iPf" label="Process Payroll Forms" />
                </div>
              </div>
            </div>

            <div className={s.right} data-depth="1.3">
              <div className={s.zone}>
                <p className={s.zoneTitle}>Company</p>
                <div className={s.col}>
                  <Step icon="iCoa" label="Chart of Accounts" small />
                  <Step icon="iInv" label="Inventory Activities" small />
                  <Step icon="iItems" label="Items & Services" small />
                  <Step icon="iCal" label="Calendar" small />
                </div>
              </div>
              <div className={s.zone}>
                <p className={s.zoneTitle}>Banking</p>
                <div className={s.col}>
                  <Step icon="iRd" label="Record Deposits" small />
                  <div className={s.reconcile}>
                    <Step icon="iRec" label="Reconcile" small />
                  </div>
                  <Step icon="iWc" label="Write Checks" small />
                  <Step icon="iCr" label="Check Register" small />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
