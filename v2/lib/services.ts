export interface SourceLink {
  label: string;
  href: string;
}

export interface RegulatoryFact {
  value: string;
  label: string;
  detail: string;
}

export interface ServiceOffering {
  id: string;
  navLabel?: string;
  title: string;
  summary: string;
  inclusions: string[];
  note?: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServicePageConfig {
  route: string;
  title: string;
  overline: string;
  intro: string;
  sectionTitle: string;
  sectionIntro: string;
  offerings: ServiceOffering[];
  processTitle: string;
  processIntro: string;
  process: ServiceProcessStep[];
  systems: string[];
  systemsNote: string;
  regulatoryFacts?: RegulatoryFact[];
  sources?: SourceLink[];
  lastReviewed?: string;
  boundaryNote?: string;
  ctaHeading: string;
  ctaSub: string;
}

export interface ServiceNavigationItem {
  title: string;
  shortTitle: string;
  href: string;
  description: string;
  group: "Core" | "Tax and compliance";
}

export const CORE_SYSTEMS = [
  "TallyPrime",
  "QuickBooks Online",
  "QuickBooks Desktop",
  "Zoho Books",
  "Xero",
  "Odoo",
  "FACTS ERP",
  "PACT ERP",
  "Excel and CSV",
  "Custom ERP exports",
];

const TAX_SYSTEMS = [...CORE_SYSTEMS, "EmaraTax"];

const SYSTEMS_NOTE =
  "Software names describe practical familiarity, not certification, endorsement or guaranteed compatibility with every configuration.";

const TAX_BOUNDARY =
  "This page is general information, not professional advice. Think Beyond Tax is not a tax agency or Federal Tax Authority representative. Work is provided as preparation, filing support and coordination by the named professional or licensed provider responsible for the engagement.";

export const serviceNavigation: ServiceNavigationItem[] = [
  {
    title: "Accounting",
    shortTitle: "Accounting",
    href: "/services/accounting",
    description: "System design, reconciliations, period close, reporting and backlog recovery.",
    group: "Core",
  },
  {
    title: "Bookkeeping",
    shortTitle: "Bookkeeping",
    href: "/services/bookkeeping",
    description: "Current transaction records, bank matching, schedules and tax-period readiness.",
    group: "Core",
  },
  {
    title: "E-Invoicing",
    shortTitle: "E-Invoicing",
    href: "/services/e-invoicing",
    description: "Readiness, data mapping and coordination with the client-selected ASP.",
    group: "Core",
  },
  {
    title: "VAT",
    shortTitle: "VAT",
    href: "/services/tax/vat",
    description: "Registration, return filing, refunds, tax groups and reconciled period close.",
    group: "Tax and compliance",
  },
  {
    title: "Corporate Tax",
    shortTitle: "Corporate Tax",
    href: "/services/tax/corporate-tax",
    description: "Registration, accounting readiness, schedules, return and payment support.",
    group: "Tax and compliance",
  },
  {
    title: "EmaraTax Support",
    shortTitle: "EmaraTax",
    href: "/services/tax/emaratax-support",
    description: "Amendments, access recovery guidance, inquiries, complaints and tracking.",
    group: "Tax and compliance",
  },
];

export const accountingService: ServicePageConfig = {
  route: "/services/accounting",
  title: "Accounting",
  overline: "Accounting Services",
  intro:
    "From a clean chart of accounts to a controlled month-end close, we build reliable accounting workflows inside the systems your business already uses.",
  sectionTitle: "Accounting built around usable records",
  sectionIntro:
    "The scope can begin with system design, continue as a weekly or monthly function, or focus on bringing historical records back under control.",
  offerings: [
    {
      id: "system-design",
      navLabel: "System design",
      title: "Financial accounting system design and implementation",
      summary:
        "A practical ledger structure, document flow and closing routine designed around how the business actually buys, sells, pays and reports.",
      inclusions: [
        "Chart of accounts setup, restructuring and reporting dimensions",
        "Opening-balance planning, control accounts and approval checkpoints",
        "Workflow design across sales, purchasing, banking, expenses and journals",
      ],
    },
    {
      id: "ongoing-accounting",
      navLabel: "Ongoing accounting",
      title: "Weekly, monthly and quarterly accounting",
      summary:
        "A right-sized operating rhythm that keeps records current and gives management dependable numbers at the frequency it needs.",
      inclusions: [
        "Scheduled ledger review and controlled posting",
        "Receivable, payable, cash and expense-account monitoring",
        "Monthly VAT control-account close and tax-period readiness",
      ],
    },
    {
      id: "close-and-journals",
      navLabel: "Close and journals",
      title: "Month-end, year-end and closing journals",
      summary:
        "A documented close that recognises the period correctly instead of relying only on bank movements and invoice dates.",
      inclusions: [
        "Accruals, prepayments, depreciation and provision schedules",
        "Month-end journal entries and recurring-entry controls",
        "Year-end close support and schedules for the appointed auditor or specialist",
      ],
    },
    {
      id: "reconciliations",
      title: "Bank and balance-sheet reconciliations",
      summary:
        "Balances are tied to evidence, differences are explained and unresolved items are made visible for action.",
      inclusions: [
        "Bank, card, payment-gateway and cash reconciliation",
        "Receivable, payable, VAT and other control-account reconciliation",
        "Balance-sheet schedules with ageing and follow-up items",
      ],
    },
    {
      id: "mis-reporting",
      navLabel: "MIS and reporting",
      title: "MIS and financial reporting",
      summary:
        "Management reporting that connects the general ledger with the decisions owners and finance teams need to make.",
      inclusions: [
        "Profit and loss, balance sheet and cash-flow reporting",
        "Budget, prior-period and operational comparisons where source data supports them",
        "Management packs with reconciled commentary and action points",
      ],
    },
    {
      id: "backlog-and-data",
      navLabel: "Backlog and data",
      title: "Backlog accounting, cleanup and controlled automation",
      summary:
        "We specialise in entering old data, rebuilding incomplete periods and turning difficult exports into reconciled, review-ready ledgers.",
      inclusions: [
        "Catch-up accounting from bank files, invoices, legacy ledgers and document archives",
        "Data cleanup, deduplication, mapping and migration between accounting systems",
        "Controlled Python and Excel scripts for curation, validation, reconciliation and repeatable import preparation",
      ],
      note:
        "Scripts are reviewed tools within a controlled workflow. They do not replace source-document review, approval or reconciliation.",
    },
  ],
  processTitle: "A controlled route from source data to close",
  processIntro:
    "Each stage creates a clear checkpoint, so a backlog or recurring accounting cycle can be reviewed without losing the audit trail.",
  process: [
    { title: "Collect", description: "Gather source documents, exports, opening balances and reporting requirements." },
    { title: "Clean", description: "Remove duplicates, repair formats and identify missing or conflicting records." },
    { title: "Map", description: "Align accounts, tax codes, customers, suppliers and dimensions to the target ledger." },
    { title: "Post", description: "Import or enter approved transactions with controlled batches and review points." },
    { title: "Reconcile", description: "Tie banks, subledgers, tax controls and balance-sheet accounts to support." },
    { title: "Close", description: "Post closing journals and deliver reconciled reports with open items visible." },
  ],
  systems: CORE_SYSTEMS,
  systemsNote: SYSTEMS_NOTE,
  ctaHeading: "Bring the ledger to a reliable close.",
  ctaSub:
    "Tell us the software, periods and reporting outcome involved. We will help define a practical accounting scope and identify the responsible professional.",
};

export const bookkeepingService: ServicePageConfig = {
  route: "/services/bookkeeping",
  title: "Bookkeeping",
  overline: "Bookkeeping Services",
  intro:
    "Current, traceable records for the everyday transactions that drive your cash position, customer balances, supplier obligations and tax periods.",
  sectionTitle: "The essentials, kept current and connected",
  sectionIntro:
    "Bookkeeping is organised around evidence, repeatable review and the cadence your business needs, from weekly processing to tax-period preparation.",
  offerings: [
    {
      id: "transaction-entry",
      navLabel: "Transaction entry",
      title: "Transactions, vouchers and recurring entries",
      summary:
        "Day-to-day records are entered in the client-owned accounting system with consistent descriptions, dates, accounts and supporting references.",
      inclusions: [
        "Sales invoices, supplier bills, receipts, payments and expenses",
        "Cash, petty-cash and journal voucher entry",
        "Recurring entries and scheduled posting routines",
      ],
    },
    {
      id: "bank-reconciliation",
      navLabel: "Bank reconciliation",
      title: "Bank, card and payment reconciliation",
      summary:
        "Statement lines are matched to the books, with duplicated, missing or unexplained movements separated for resolution.",
      inclusions: [
        "Bank-feed and statement matching",
        "Credit-card, payment-gateway and petty-cash reconciliation",
        "Outstanding-item schedules and follow-up support",
      ],
    },
    {
      id: "receivables-payables",
      navLabel: "Receivables and payables",
      title: "Receivables and payables schedules",
      summary:
        "Customer and supplier balances remain visible, aged and connected to the transactions behind them.",
      inclusions: [
        "Customer allocation and receivable ageing",
        "Supplier allocation and payable ageing",
        "Credit notes, advances and unapplied-balance review",
      ],
    },
    {
      id: "payroll-records",
      navLabel: "Payroll records",
      title: "Payroll and WPS record support",
      summary:
        "Approved payroll outputs can be reflected in the books and reconciled to payment records while payroll authority remains with the client or appointed provider.",
      inclusions: [
        "Payroll journal and staff-cost allocation support",
        "WPS and bank-payment record matching",
        "Leave, gratuity or other approved schedule posting where supplied",
      ],
    },
    {
      id: "documents-and-vat",
      navLabel: "Documents and VAT",
      title: "Document organisation and VAT coding checks",
      summary:
        "Records are organised so that supporting evidence and VAT coding can be reviewed before a return period closes.",
      inclusions: [
        "Invoice and receipt naming, indexing and linkage",
        "VAT code consistency checks against the approved treatment",
        "Missing-document and exception lists for client action",
      ],
    },
    {
      id: "period-readiness",
      navLabel: "Period readiness",
      title: "Weekly, monthly and tax-period processing",
      summary:
        "A defined timetable keeps work from accumulating and makes month-end and VAT closing more predictable.",
      inclusions: [
        "Weekly or monthly transaction processing",
        "Cut-off checks, recurring entries and ledger review",
        "Tax-period packs with reconciled VAT controls and identified exceptions",
      ],
    },
  ],
  processTitle: "Choose the cadence the records require",
  processIntro:
    "The exact timetable depends on transaction volume, internal approvals and reporting needs, but each cycle ends with a visible review point.",
  process: [
    { title: "Weekly", description: "Capture priority transactions, match cash activity and flag missing evidence early." },
    { title: "Monthly", description: "Complete entries, reconcile accounts and prepare schedules for management review." },
    { title: "Tax period", description: "Close VAT controls, check coding and package review-ready records for filing." },
  ],
  systems: CORE_SYSTEMS,
  systemsNote: SYSTEMS_NOTE,
  ctaHeading: "Keep the books current before they become a backlog.",
  ctaSub:
    "Share your transaction volume, current system and preferred processing cycle. We will help shape a workable bookkeeping routine.",
};

export const vatService: ServicePageConfig = {
  route: "/services/tax/vat",
  title: "VAT",
  overline: "UAE Tax Support",
  intro:
    "Practical VAT support from registration and ledger readiness through return filing, refund preparation and post-submission follow-up.",
  sectionTitle: "VAT work grounded in reconciled records",
  sectionIntro:
    "The return is the end of the process. We first connect tax codes, invoices, ledgers and supporting records so the figures can be reviewed before submission.",
  offerings: [
    {
      id: "registration",
      navLabel: "Registration",
      title: "VAT registration and deregistration support",
      summary:
        "We help organise threshold analysis, application information and supporting documents for submission through EmaraTax.",
      inclusions: [
        "Mandatory or voluntary registration information pack",
        "Trade, activity, turnover and supporting-document review",
        "Deregistration preparation and open-obligation checks",
      ],
    },
    {
      id: "returns",
      navLabel: "Returns and filing",
      title: "VAT return preparation and filing support",
      summary:
        "VAT return figures are built from the accounting records, reconciled to control accounts and reviewed for identified exceptions.",
      inclusions: [
        "Output and input VAT schedules by return box",
        "Return preparation, review pack and EmaraTax filing support",
        "Payment-position and deadline readiness",
      ],
    },
    {
      id: "refunds",
      title: "VAT311 refund preparation",
      summary:
        "For an eligible refundable position, we organise the ledger support, transaction details and documents needed for a refund request.",
      inclusions: [
        "Refund-position reconciliation to submitted returns",
        "Supporting transaction and bank-detail preparation",
        "Response-pack coordination for follow-up requests",
      ],
      note: "Refund eligibility, review and payment remain decisions of the Federal Tax Authority.",
    },
    {
      id: "tax-groups",
      navLabel: "Tax groups",
      title: "VAT tax-group applications",
      summary:
        "We help collect entity relationships, registration records and supporting documents for tax-group formation, amendment or cessation requests.",
      inclusions: [
        "Initial information and eligibility checklist",
        "Member registration and relationship-document collation",
        "EmaraTax application and follow-up coordination",
      ],
    },
    {
      id: "vat-close",
      navLabel: "VAT close",
      title: "VAT-ledger reconciliation and period close",
      summary:
        "Tax reports are compared with the general ledger, sales and purchase records before the period is treated as ready.",
      inclusions: [
        "Output, input and payable control-account reconciliation",
        "Invoice sequence, tax-code and cut-off checks",
        "Exception register and closing adjustments for approval",
      ],
    },
    {
      id: "records",
      navLabel: "Invoice readiness",
      title: "Invoice and record readiness",
      summary:
        "We review the bookkeeping workflow for the data and evidence needed to support routine VAT reporting.",
      inclusions: [
        "Tax-invoice field and document-flow review",
        "Sales, purchase, import and reverse-charge record checks",
        "Retention and retrieval structure for supporting documents",
      ],
    },
    {
      id: "corrections",
      navLabel: "Corrections",
      title: "Corrections and voluntary-disclosure coordination",
      summary:
        "When a prior-period issue is identified, we help quantify it, reconstruct the support and coordinate the appropriate next step with the responsible specialist where needed.",
      inclusions: [
        "Issue log, period analysis and ledger reconstruction",
        "Correction or voluntary-disclosure preparation support",
        "Specialist coordination for material or complex positions",
      ],
    },
  ],
  processTitle: "From records to a supported submission",
  processIntro:
    "The workflow keeps preparation, review and portal submission distinct so responsibility and unresolved items remain visible.",
  process: [
    { title: "Scope", description: "Confirm the tax period, registrations, deadline and required source records." },
    { title: "Reconcile", description: "Tie tax reports to ledgers, invoices and supporting schedules." },
    { title: "Review", description: "Document exceptions, treatments and adjustments for approval." },
    { title: "Prepare", description: "Complete the return, refund or application working papers." },
    { title: "Submit", description: "Support authorised submission through EmaraTax and retain evidence." },
    { title: "Track", description: "Monitor acknowledgements, payment status and follow-up requests." },
  ],
  systems: TAX_SYSTEMS,
  systemsNote: SYSTEMS_NOTE,
  regulatoryFacts: [
    {
      value: "AED 375,000",
      label: "Mandatory registration threshold",
      detail: "Based on taxable supplies and imports, subject to the detailed FTA rules.",
    },
    {
      value: "AED 187,500",
      label: "Voluntary registration threshold",
      detail: "May include qualifying taxable supplies, imports or taxable expenses under the FTA criteria.",
    },
    {
      value: "28 days",
      label: "Standard return and payment window",
      detail: "Generally measured from the end of the tax period unless the FTA assigns another date.",
    },
  ],
  sources: [
    {
      label: "FTA: Registration for VAT",
      href: "https://tax.gov.ae/en/taxes/Vat/vat.topics/registration.for.vat.aspx",
    },
    {
      label: "FTA: Filing VAT returns and making payments",
      href: "https://tax.gov.ae/en/taxes/Vat/vat.topics/filing.vat.returns.and.making.payments.aspx",
    },
    {
      label: "FTA: Tax group registration",
      href: "https://tax.gov.ae/en/services/tax.group.registration.aspx",
    },
    {
      label: "FTA: VAT refund user guide",
      href: "https://tax.gov.ae/-/media/Files/EN/PDF/Guides/VATRefundUserGuideEnglishV040.pdf",
    },
  ],
  lastReviewed: "22 July 2026",
  boundaryNote: TAX_BOUNDARY,
  ctaHeading: "Prepare the VAT period before the deadline does.",
  ctaSub:
    "Tell us the registration status, tax period and accounting system. We will identify the records needed and the professional responsible for the scope.",
};

export const corporateTaxService: ServicePageConfig = {
  route: "/services/tax/corporate-tax",
  title: "Corporate Tax",
  overline: "UAE Tax Support",
  intro:
    "Corporate Tax support that starts with the accounting records, organises the required schedules and keeps registration, return and payment actions visible.",
  sectionTitle: "A documented path from accounts to return",
  sectionIntro:
    "We help businesses organise ordinary Corporate Tax work and bring in an appropriately licensed specialist when the facts or position require one.",
  offerings: [
    {
      id: "registration",
      navLabel: "Registration",
      title: "Corporate Tax registration",
      summary:
        "We help prepare entity, licence, ownership and financial-period information for registration through EmaraTax.",
      inclusions: [
        "Registration checklist and document collation",
        "Tax-period and entity-information review",
        "Application preparation and status follow-up",
      ],
    },
    {
      id: "readiness",
      navLabel: "Accounting readiness",
      title: "Accounting and documentation readiness",
      summary:
        "The general ledger and supporting schedules are reviewed for the completeness needed to begin a Corporate Tax computation.",
      inclusions: [
        "Chart-of-accounts and closing-status review",
        "Related-party, owner, fixed-asset and provision schedule readiness",
        "Document gap list and closing-action plan",
      ],
    },
    {
      id: "taxable-income",
      navLabel: "Taxable income",
      title: "Taxable-income schedules",
      summary:
        "Accounting profit is connected to a documented schedule of relevant adjustments, elections and supporting records for professional review.",
      inclusions: [
        "Financial-statement and trial-balance mapping",
        "Adjustment schedule and supporting-document index",
        "Tax-loss, relief and credit data collation where applicable",
      ],
    },
    {
      id: "return-filing",
      navLabel: "Return and filing",
      title: "Return preparation and filing support",
      summary:
        "We coordinate the return working papers, review questions, authorised submission and retained filing evidence.",
      inclusions: [
        "Return data pack and reconciliation to approved accounts",
        "EmaraTax preparation and filing support",
        "Submission acknowledgement and records archive",
      ],
    },
    {
      id: "payment-reliefs",
      navLabel: "Payment and reliefs",
      title: "Payment readiness, reliefs and free-zone considerations",
      summary:
        "Potential reliefs, elections or free-zone considerations are identified for evidence gathering and specialist review rather than assumed from a label alone.",
      inclusions: [
        "Payment-position and deadline planning",
        "Small Business Relief information preparation where relevant",
        "Free-zone and other fact-sensitive position coordination",
      ],
    },
    {
      id: "waiver-and-specialist",
      navLabel: "Waiver support",
      title: "Late-registration waiver initiative and specialist coordination",
      summary:
        "Where a current FTA initiative or application route may be relevant, we help assemble the facts and evidence for eligibility review.",
      inclusions: [
        "Initiative or waiver checklist against current official guidance",
        "Evidence pack and submission support where eligible",
        "Coordination with a registered tax agent or other specialist for complex positions",
      ],
      note: "Any relief or waiver depends on the applicable rules and the authority's decision. No outcome is guaranteed.",
    },
  ],
  processTitle: "From closed accounts to filed return",
  processIntro:
    "The process begins with accounting readiness because return preparation cannot repair an unreconciled ledger by itself.",
  process: [
    { title: "Register", description: "Confirm entity data, tax period and EmaraTax registration status." },
    { title: "Close", description: "Complete the accounting close and assemble supporting schedules." },
    { title: "Compute", description: "Map accounts and prepare the taxable-income adjustment schedule." },
    { title: "Review", description: "Resolve questions and coordinate specialist input where needed." },
    { title: "File", description: "Support authorised return submission and archive evidence." },
    { title: "Pay", description: "Confirm the payable position, processing time and deadline readiness." },
  ],
  systems: TAX_SYSTEMS,
  systemsNote: SYSTEMS_NOTE,
  regulatoryFacts: [
    {
      value: "9 months",
      label: "General filing and payment deadline",
      detail: "Corporate Tax returns and liabilities are generally due within nine months after the end of the relevant tax period.",
    },
    {
      value: "7 months",
      label: "Late-registration waiver initiative condition",
      detail: "The FTA states that the first return, or applicable annual declaration, must be submitted within seven months from the end of the first relevant period to meet this initiative condition.",
    },
  ],
  sources: [
    {
      label: "FTA: Corporate Tax filing and payment reminder",
      href: "https://tax.gov.ae/en/media.centre/News/federal.tax.authority.urges.submission.of.corporate.tax.returns.and.settlement.of.corporate.tax.liabilities.within.nine.months.from.the.end.of.the.tax.period.aspx",
    },
    {
      label: "FTA: Corporate Tax registration",
      href: "https://tax.gov.ae/en/services/corporate.tax.registration.aspx",
    },
    {
      label: "FTA: Corporate Tax late-registration penalty waiver initiative",
      href: "https://tax.gov.ae/en/about.fta/waiver.of.penalties.aspx",
    },
  ],
  lastReviewed: "22 July 2026",
  boundaryNote: TAX_BOUNDARY,
  ctaHeading: "Turn the year-end close into a filing-ready tax pack.",
  ctaSub:
    "Share the financial year, registration status and state of the accounts. We will map the next actions and any specialist input required.",
};

export const eInvoicingService: ServicePageConfig = {
  route: "/services/e-invoicing",
  title: "E-Invoicing Readiness",
  overline: "Systems and Compliance",
  intro:
    "Prepare invoice data, systems and internal ownership for the UAE eInvoicing programme, then coordinate a clear handoff to the Accredited Service Provider your business selects.",
  sectionTitle: "Build readiness before provider onboarding",
  sectionIntro:
    "E-invoicing is a structured data exchange, not simply emailing a PDF. We help the business understand its current data, close practical gaps and run better conversations with potential ASPs.",
  offerings: [
    {
      id: "assessment",
      navLabel: "Readiness assessment",
      title: "Readiness assessment",
      summary:
        "We document invoice flows, transaction volumes, business entities, systems and people involved in issuing and receiving invoices.",
      inclusions: [
        "Current-state invoice and credit-note workflow map",
        "Entity, branch, customer, supplier and system inventory",
        "Readiness register with owners, dependencies and priority",
      ],
    },
    {
      id: "data-mapping",
      navLabel: "Data mapping",
      title: "Invoice and master-data mapping",
      summary:
        "Existing invoice fields and master records are mapped to the structured information expected by the programme and the selected provider.",
      inclusions: [
        "Customer, supplier, item, tax and address-field review",
        "Invoice, credit-note and reference-data mapping workbook",
        "Missing, duplicated and inconsistent data controls",
      ],
    },
    {
      id: "erp-gap-review",
      navLabel: "ERP gap review",
      title: "ERP and export gap review",
      summary:
        "We compare the system's available fields and exports with the data that must move into the e-invoicing workflow.",
      inclusions: [
        "Configuration and export-capability review",
        "Manual-step, integration and ownership gap register",
        "Controlled Excel, CSV or custom-export preparation where appropriate",
      ],
    },
    {
      id: "asp-conversations",
      navLabel: "ASP conversations",
      title: "ASP comparison conversations",
      summary:
        "We help the client organise questions, demonstrations and commercial comparisons without presenting ourselves as an ASP or making claims about provider accreditation.",
      inclusions: [
        "Requirements brief for potential providers",
        "Demonstration question set and comparison record",
        "Clarification of data, integration, support and onboarding assumptions",
      ],
    },
    {
      id: "coordination",
      navLabel: "Bridge and testing",
      title: "Communication bridge, onboarding and testing coordination",
      summary:
        "Once the client selects an ASP, we can translate accounting and data requirements between the business team and provider during onboarding.",
      inclusions: [
        "Responsibility map across client, TBT and selected ASP",
        "Test-case, sample-file and issue-log coordination",
        "Reconciliation of test outputs back to source transactions",
      ],
    },
    {
      id: "data-controls",
      navLabel: "Ongoing controls",
      title: "Custom export preparation and ongoing data-quality controls",
      summary:
        "Repeatable checks help prevent bad master data or incomplete source records from becoming recurring exchange failures.",
      inclusions: [
        "Controlled Python or Excel validation for approved exports",
        "Exception reports, ownership and correction routines",
        "Periodic reconciliation between source records and exchanged data",
      ],
    },
  ],
  processTitle: "The readiness bridge",
  processIntro:
    "TBT works between the client's accounting reality and the selected ASP's technical onboarding, while each party keeps its proper responsibility.",
  process: [
    { title: "Client", description: "Owns business decisions, source systems, approvals and provider selection." },
    { title: "TBT readiness bridge", description: "Maps data, organises requirements and coordinates accounting questions." },
    { title: "Selected ASP", description: "Provides the accredited service and defines its technical connection requirements." },
    { title: "Onboard and test", description: "Run agreed samples, log issues and reconcile results to source records." },
    { title: "Compliant exchange", description: "Move into the approved operating process with ongoing data-quality controls." },
  ],
  systems: CORE_SYSTEMS,
  systemsNote: SYSTEMS_NOTE,
  regulatoryFacts: [
    {
      value: "30 Oct 2026",
      label: "ASP appointment deadline for revenue of at least AED 50 million",
      detail: "Mandatory implementation for this group remains 1 January 2027.",
    },
    {
      value: "31 Mar 2027",
      label: "ASP appointment deadline below AED 50 million",
      detail: "The stated implementation date for this group is 1 July 2027.",
    },
  ],
  sources: [
    {
      label: "UAE Ministry of Finance: eInvoicing programme",
      href: "https://mof.gov.ae/en/about-us/initiatives/einvoicing/",
    },
    {
      label: "UAE Ministry of Finance: May 2026 deadline amendment",
      href: "https://mof.gov.ae/en/news/ministry-of-finance-announces-targeted-amendments-to-einvoicing-system-decisions/",
    },
  ],
  lastReviewed: "22 July 2026",
  boundaryNote:
    "This page is general information, not professional advice. Think Beyond Tax is not an Accredited Service Provider and has no formal ASP partnership. We can assess readiness, prepare data, organise provider conversations and coordinate communication with the ASP selected by the client.",
  ctaHeading: "Prepare the data before provider onboarding begins.",
  ctaSub:
    "Tell us your revenue band, systems and invoice volume. We will help define a readiness scope and the information to take into ASP conversations.",
};

export const emaraTaxService: ServicePageConfig = {
  route: "/services/tax/emaratax-support",
  title: "EmaraTax Support",
  overline: "UAE Tax Administration",
  intro:
    "Structured support for account access, tax-record amendments, legal-document updates, penalty applications, inquiries and complaint preparation on EmaraTax.",
  sectionTitle: "Portal work with a documented trail",
  sectionIntro:
    "We help organise information, evidence and follow-up so administrative requests can be submitted clearly and tracked by the authorised account holder.",
  offerings: [
    {
      id: "amendments",
      navLabel: "Record amendments",
      title: "Taxable Person and registration amendments",
      summary:
        "Changes to Taxable Person details, registrations, authorised signatories or related records are prepared against the current FTA service requirements.",
      inclusions: [
        "Change summary and affected-registration review",
        "EmaraTax data-entry and supporting-document checklist",
        "Submission pack and reference tracking",
      ],
    },
    {
      id: "legal-documents",
      navLabel: "Legal documents",
      title: "Legal-document updates",
      summary:
        "Trade licences, constitutional documents, continuity evidence and other approved records are organised so portal information matches the legal documents supplied.",
      inclusions: [
        "Old-to-new document comparison",
        "Name, licence, address, activity and signatory data mapping",
        "File preparation and consistency checks before upload",
      ],
    },
    {
      id: "access-recovery",
      navLabel: "Access recovery",
      title: "Registered-email changes and account-access recovery guidance",
      summary:
        "We help identify the account structure, available recovery route and evidence needed when the registered email is unavailable or access must move to another email.",
      inclusions: [
        "Account and Taxable Person access map",
        "Authorised-person and email-change document preparation",
        "FTA support-request guidance and follow-up log",
      ],
      note:
        "Only the Federal Tax Authority can restore, migrate or approve access when the account holder cannot complete the standard recovery route.",
    },
    {
      id: "penalties",
      navLabel: "Penalty requests",
      title: "Penalty waiver or instalment application preparation",
      summary:
        "For potentially eligible cases, we help organise the decision history, grounds, evidence and payment information required by the current service.",
      inclusions: [
        "Eligibility checklist and administrative-penalty schedule",
        "Chronology, grounds and supporting-evidence pack",
        "Application preparation and status tracking",
      ],
      note: "Waivers and instalments are eligibility-based requests. Approval is never guaranteed.",
    },
    {
      id: "inquiries-complaints",
      navLabel: "Inquiries and complaints",
      title: "FTA inquiries and complaint preparation",
      summary:
        "A clear issue statement and complete evidence trail can reduce circular correspondence and make the requested resolution easier to understand.",
      inclusions: [
        "Issue chronology and concise question or complaint drafting",
        "Reference, screenshot and document indexing",
        "Authorised submission support through the relevant FTA channel",
      ],
    },
    {
      id: "tracking-escalation",
      navLabel: "Track and escalate",
      title: "Submission tracking and specialist escalation",
      summary:
        "Open requests are tracked by reference, response date and next action, with specialist input introduced when an administrative issue becomes a substantive tax position.",
      inclusions: [
        "Submission and response register",
        "Follow-up pack for additional-information requests",
        "Handoff to a registered tax agent or legal specialist where required",
      ],
    },
  ],
  processTitle: "A clearer route through administrative work",
  processIntro:
    "Every stage leaves a usable record so the client, named professional and any specialist can see what has been submitted and what remains open.",
  process: [
    { title: "Access", description: "Confirm the authorised account route, Taxable Person and affected registration." },
    { title: "Document", description: "Build the chronology, evidence index and required supporting files." },
    { title: "Submit", description: "Support the authorised portal or service-channel submission." },
    { title: "Track", description: "Record references, expected response points and additional requests." },
    { title: "Escalate", description: "Introduce the appropriate registered tax agent or legal specialist when needed." },
  ],
  systems: ["EmaraTax", ...CORE_SYSTEMS],
  systemsNote: SYSTEMS_NOTE,
  regulatoryFacts: [
    {
      value: "20 business days",
      label: "Notification window for tax-record changes",
      detail: "The FTA states that relevant changes generally require a tax-record amendment within this period from the change date.",
    },
    {
      value: "Eligibility based",
      label: "Penalty waiver and instalment requests",
      detail: "Applications are assessed under the current controls and procedures. Preparation does not guarantee approval.",
    },
  ],
  sources: [
    {
      label: "FTA: Tax Records Amendment",
      href: "https://tax.gov.ae/en/services/tax.records.amendment.2023.aspx",
    },
    {
      label: "FTA: Administrative penalty instalment, waiver and refund requests",
      href: "https://tax.gov.ae/en/services/administrative.penalty.waiver.request.aspx",
    },
    {
      label: "FTA: Feedback and complaints",
      href: "https://tax.gov.ae/en/services/feedback.complains.aspx",
    },
  ],
  lastReviewed: "22 July 2026",
  boundaryNote: TAX_BOUNDARY,
  ctaHeading: "Turn the portal issue into a documented next action.",
  ctaSub:
    "Share the affected Taxable Person, registration, reference numbers and access status. We will help identify the appropriate preparation and escalation route.",
};

export const servicePages = {
  accounting: accountingService,
  bookkeeping: bookkeepingService,
  vat: vatService,
  corporateTax: corporateTaxService,
  eInvoicing: eInvoicingService,
  emaraTax: emaraTaxService,
} as const;
