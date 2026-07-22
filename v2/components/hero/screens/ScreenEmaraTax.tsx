import Chrome from "./Chrome";
import s from "./ScreenEmaraTax.module.css";

const sideItems = [
  { label: "VAT", ico: true },
  { label: "EXCISE TAX", ico: true },
  { label: "CORPORATE TAX", ico: true },
  { label: "PILLAR TWO TOP-UP TAX", ico: true },
  { label: "MY PAYMENTS", ico: true },
  { label: "MY CORRESPONDENCE", ico: true },
  { label: "USER AUTHORIZATION", ico: true },
  { label: "MY AUDIT", ico: true },
  { label: "OTHER SERVICES", ico: true },
  { label: "E-INVOICING", ico: true },
];

const mostUsed = [
  "Amend Taxable Person Details",
  "Corporate Tax Registration",
  "Corporate Tax Return",
  "VAT – New Registration",
];

/** All data below is fictional, layout reference only. */
const registrations = [
  { type: "Corporate Tax", status: "Active", trn: "100 0000 0000 002", giban: "AE00 0000 0000 0000 002", date: "01/06/2024" },
  { type: "Value Added Tax", status: "Active", trn: "100 0000 0000 001", giban: "AE00 0000 0000 0000 001", date: "01/12/2022" },
  { type: "Tax Group", status: "Not Registered", trn: "-", giban: "-", date: "-" },
  { type: "Excise Tax", status: "Not Registered", trn: "-", giban: "-", date: "-" },
  { type: "Warehouse Keeper", status: "Not Registered", trn: "-", giban: "-", date: "-" },
  { type: "Pillar Two Top-up Tax", status: "Not Registered", trn: "-", giban: "-", date: "-" },
];

export default function ScreenEmaraTax({ active }: { active: boolean }) {
  return (
    <div className={`screen ${s.root} ${active ? "is-active" : ""}`} data-screen="emaratax">
      <Chrome variant="browser" title="EmaraTax" url="eservices.tax.gov.ae/dashboard" accent="#b68a35" />

      <div className={s.brandbar} data-depth="1.1">
        <span className={s.etLockup}>
          <b>EMARATAX</b>
          <i>إمارات تاكس</i>
        </span>
        <span className={s.ftaLockup}>
          <i>الهيئة الاتحادية للضرائب</i>
          <b>FEDERAL TAX AUTHORITY</b>
        </span>
      </div>

      <div className={s.utilbar} data-depth="1.1">
        <span className={s.userChip}>Al Sarh Trading LLC ▾</span>
        <span className={s.searchField}>
          <i>⌕</i> What are you looking for?
        </span>
        <span className={s.utilRight}>
          <i>User Type ⚙</i>
          <i>🔊</i>
          <i>عربي</i>
          <i>◑</i>
          <i>-A A +A</i>
        </span>
      </div>

      <div className="screen-body">
        <aside className={s.side} data-depth="1.15">
          <span className={s.sideHome}>⌂ HOME</span>
          <span className={s.sideCompany}>AL SARH TRADING LLC ▾</span>
          {sideItems.map((item) => (
            <span key={item.label} className={s.sideItem}>
              <i />
              {item.label}
            </span>
          ))}
        </aside>

        <div className={s.main}>
          <p className={s.breadcrumb} data-depth="1.1">
            Home <b>▸</b> Al Sarh Trading LLC
          </p>

          <div className={s.topCards}>
            <div className={s.card} data-depth="1.35">
              <p className={s.cardHead}>📋 Required Actions</p>
              <div className={s.reqTable}>
                <div className={s.reqHead}>
                  <span>Due Date</span>
                  <span>Description</span>
                </div>
                <div className={s.reqEmpty}>No data</div>
              </div>
            </div>

            <div className={s.card} data-depth="1.4">
              <p className={s.cardHead}>⭐ Most Used Services</p>
              {mostUsed.map((m) => (
                <span key={m} className={s.serviceRow}>
                  <i className={s.star}>★</i>
                  {m}
                  <b>›</b>
                </span>
              ))}
            </div>
          </div>

          <div className={s.tabs} data-depth="1.1">
            <span className={s.tabActive}>Registration Overview</span>
            <span>Taxable Person Details</span>
            <span>Certificates (2)</span>
            <span>Account Access</span>
            <span>Pending Requests (0)</span>
          </div>

          <div className={s.regCard} data-depth="1.5">
            <div className={s.regTable}>
              <div className={s.regHead}>
                <span>Registration Type</span>
                <span>Registration Status</span>
                <span>TRN No.</span>
                <span>GIBAN</span>
                <span>Effective Date</span>
                <span>Action</span>
              </div>
              {registrations.map((r) => {
                const activeReg = r.status === "Active";
                return (
                  <div
                    key={r.type}
                    className={`${s.regRow} ${r.type === "Value Added Tax" ? s.regHighlight : ""}`}
                  >
                    <span className={s.regType}>{r.type}</span>
                    <span className={activeReg ? s.statusActive : s.statusOff}>
                      ● {r.status}
                    </span>
                    <span className={s.mono}>{r.trn}</span>
                    <span className={s.mono}>{r.giban}</span>
                    <span>{r.date}</span>
                    <span className={s.dots}>⋯</span>
                  </div>
                );
              })}
            </div>
          </div>

          <span className={s.scrollTop}>⌃</span>
          <span className={`g-cursor ${s.cursor}`} />
        </div>
      </div>
    </div>
  );
}
