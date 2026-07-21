import Chrome from "./Chrome";
import s from "./ScreenQbd.module.css";

const menuRow = [
  "File", "Edit", "View", "Lists", "Favorites", "Company", "Customers",
  "Vendors", "Employees", "Banking", "Reports", "Window", "Help", "Special Offers",
];

const sideItems = [
  { label: "Home", active: true },
  { label: "My Company" },
  { label: "Calendar" },
  { label: "Snapshots" },
  { label: "Customers" },
  { label: "Vendors" },
];

const bottomTabs = ["My Shortcuts", "View Balances", "Run Favorite Reports", "Open Windows"];

function Arrow({ className, dir = "right" }: { className?: string; dir?: "right" | "down" }) {
  return (
    <svg
      className={`${s.arrow} ${dir === "down" ? s.arrowDown : ""} ${className ?? ""}`}
      viewBox={dir === "down" ? "0 0 12 40" : "0 0 44 12"}
    >
      {dir === "down" ? (
        <>
          <path d="M6 2v30" />
          <path d="m1 28 5 8 5-8" className={s.arrHead} />
        </>
      ) : (
        <>
          <path d="M2 6h34" />
          <path d="m32 1 8 5-8 5" className={s.arrHead} />
        </>
      )}
    </svg>
  );
}

function Step({ icon, label, small, critical }: { icon: string; label: string; small?: boolean; critical?: boolean }) {
  return (
    <div className={`${s.step} ${small ? s.stepSm : ""}`}>
      <span className={`${s.icon} ${s[icon]} ${critical ? s.iconCrit : ""}`}>
        {critical && <b className={s.bang}>!</b>}
      </span>
      <span className={s.stepLabel}>{label}</span>
    </div>
  );
}

export default function ScreenQbd({ active }: { active: boolean }) {
  return (
    <div className={`screen ${s.root} ${active ? "is-active" : ""}`} data-screen="qbd">
      <Chrome
        variant="windows"
        title="Al Sarh Trading LLC — Intuit QuickBooks Enterprise Solutions 21.0"
        accent="#2e5c8a"
      />

      <div className={s.menubar} data-depth="1.1">
        {menuRow.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      <div className="screen-body">
        <aside className={s.side} data-depth="1.15">
          <div className={s.search}>
            <span>Search Company or Help</span>
            <i className={s.mag} />
          </div>
          <p className={s.sideHead}>My Shortcuts</p>
          {sideItems.map((item) => (
            <span key={item.label} className={`${s.sideItem} ${item.active ? s.sideActive : ""}`}>
              <i className={s.sideIco} />
              {item.label}
            </span>
          ))}
          <div className={s.sideBottom}>
            {bottomTabs.map((t) => (
              <span key={t} className={s.bottomTab}>
                <i />
                {t}
              </span>
            ))}
          </div>
        </aside>

        <div className={s.main}>
          <div className={s.winbar} data-depth="1.1">Home</div>
          <div className={s.tabs} data-depth="1.1">
            <span className={s.tabActive}>Home Page</span>
            <span>Insights</span>
          </div>

          <div className={s.layout}>
            <div className={s.flow}>
              <div className={s.zone} data-depth="1.4">
                <p className={s.zoneTitle}>Vendors</p>
                <div className={s.vendorRow}>
                  <Step icon="iEb" label="Enter Bills" />
                  <Arrow className={s.a1} />
                  <Step icon="iPb" label="Pay Bills" />
                  <Step icon="iBl" label="New: Business Loans" small />
                </div>
              </div>

              <div className={s.zone} data-depth="1.5">
                <p className={s.zoneTitle}>Customers</p>
                <div className={s.custGrid}>
                  <div className={s.custDrop}>
                    <Arrow dir="down" className={s.a2} />
                  </div>
                  <div className={s.salesRcpt}>
                    <Step icon="iCsr" label="Create Sales Receipts" />
                  </div>
                  <div className={s.custMain}>
                    <Step icon="iCi" label="Create Invoices" />
                    <Arrow className={s.a3} />
                    <Step icon="iRp" label="Receive Payments" />
                    <Arrow className={s.a4} />
                    <span className={s.toBank} />
                  </div>
                  <div className={s.refunds}>
                    <Step icon="iRc" label="Refunds & Credits" small />
                  </div>
                </div>
              </div>
            </div>

            <div className={s.right} data-depth="1.3">
              <div className={s.zone}>
                <p className={s.zoneTitle}>Company</p>
                <div className={s.col}>
                  <Step icon="iCoa" label="Chart of Accounts" small />
                  <Step icon="iItems" label="Items & Services" small />
                  <Step icon="iOrder" label="Order Checks" small />
                  <Step icon="iCrit" label="Critical Notice" small critical />
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
                  <Step icon="iPc" label="Print Checks" small />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
