/**
 * The hero's single source of truth: state 0 is the intro, states 1–6 are
 * the platforms in narrative order (day-to-day books → cloud → UAE tax finale).
 */
export interface HeroState {
  id: string;
  /** Short label used in the platform dock (intro has none). */
  dockLabel?: string;
  /** Accent used for dock ticks and mosaic cards. */
  accent: string;
  /** "browser" screens get tab+URL chrome, "windows" get a title bar. */
  chrome?: "browser" | "windows";
  chromeTitle?: string;
  chromeUrl?: string;
  headline: string;
  support: string;
  chips: string[];
}

export const heroStates: HeroState[] = [
  {
    id: "intro",
    accent: "#cf982f",
    headline: "Accounting support that works inside the systems you already use.",
    support:
      "Think Beyond Tax brings together independent UAE professionals who support businesses with bookkeeping, accounting, financial reporting, VAT and Corporate Tax.",
    chips: ["Bookkeeping", "Accounting", "VAT", "Corporate Tax"],
  },
  {
    id: "tally",
    dockLabel: "TallyPrime",
    accent: "#0f6cbd",
    chrome: "windows",
    chromeTitle: "TallyPrime — Al Sarh Trading LLC",
    headline: "Bookkeeping that holds up — voucher by voucher.",
    support:
      "Day-to-day entries, ledgers and day-book review in TallyPrime, kept clean enough to close every month with confidence.",
    chips: ["Voucher entry", "Ledgers & groups", "Day book review", "Monthly closing"],
  },
  {
    id: "qbo",
    dockLabel: "QuickBooks Online",
    accent: "#2ca01c",
    chrome: "browser",
    chromeTitle: "QuickBooks Online",
    chromeUrl: "app.qbo.intuit.com/app/homepage",
    headline: "Cloud books that stay reconciled.",
    support:
      "Bank feeds matched, receivables chased, and management reports that actually reflect your bank balance — inside QuickBooks Online.",
    chips: ["Bank feeds", "Reconciliation", "Receivables", "Management reports"],
  },
  {
    id: "qbd",
    dockLabel: "QuickBooks Desktop",
    accent: "#5588a3",
    chrome: "windows",
    chromeTitle: "QuickBooks Desktop — Al Sarh Trading LLC",
    headline: "An older company file? Still in good hands.",
    support:
      "Catch-up, cleanup and reconciliations for long-running QuickBooks Desktop files — and a careful migration path to the cloud when you're ready.",
    chips: ["Catch-up & cleanup", "Reconciliations", "Reporting", "Cloud migration"],
  },
  {
    id: "zoho",
    dockLabel: "Zoho Books",
    accent: "#408dfb",
    chrome: "browser",
    chromeTitle: "Zoho Books",
    chromeUrl: "books.zoho.com/app/dashboard",
    headline: "VAT-ready books, built for UAE workflows.",
    support:
      "Invoicing, automated workflows and tax-ready records in Zoho Books, set up the way UAE businesses actually operate.",
    chips: ["UAE VAT invoicing", "Automation", "Payables & receivables", "Reporting"],
  },
  {
    id: "xero",
    dockLabel: "Xero",
    accent: "#13b5ea",
    chrome: "browser",
    chromeTitle: "Xero | Dashboard",
    chromeUrl: "go.xero.com/app/dashboard",
    headline: "Every bank line, matched and explained.",
    support:
      "Reconciliation-first bookkeeping in Xero, with a live view of cash, invoices owed and bills due.",
    chips: ["Bank reconciliation", "Cash position", "Invoices & bills", "Clear reports"],
  },
  {
    id: "emaratax",
    dockLabel: "EmaraTax",
    accent: "#b68a35",
    chrome: "browser",
    chromeTitle: "EmaraTax",
    chromeUrl: "eservices.tax.gov.ae/dashboard",
    headline: "From your books to the FTA portal.",
    support:
      "Support with VAT and Corporate Tax registrations, return preparation and filings, and payments through EmaraTax — with a named responsible professional on every engagement.",
    chips: ["VAT returns", "Corporate Tax", "Registrations", "Payments & deadlines"],
  },
];

export const platformStates = heroStates.filter((s) => s.id !== "intro");
