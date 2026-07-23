/**
 * The hero's single source of truth: state 0 is the intro and states 1 to 6
 * move from UAE tax administration into the accounting systems used day to day.
 */
export interface HeroState {
  id: string;
  /** Short label used in the platform dock. The intro has no dock label. */
  dockLabel?: string;
  /** Accent used for dock ticks and mosaic cards. */
  accent: string;
  headline: string;
  support: string;
  chips: string[];
  /** Facts shown on the floating parallax chips around the device. */
  floatFacts: [string, string, string];
}

export const heroStates: HeroState[] = [
  {
    id: "intro",
    accent: "#cf982f",
    headline: "Accounting support that works inside the systems you already use.",
    support:
      "Think Beyond Tax brings together independent UAE professionals who support businesses with bookkeeping, accounting, financial reporting, VAT and Corporate Tax.",
    chips: ["Bookkeeping", "Accounting", "VAT", "Corporate Tax"],
    floatFacts: ["6 platforms, one team", "UAE-based professionals", "Named provider on every engagement"],
  },
  {
    id: "emaratax",
    dockLabel: "EmaraTax",
    accent: "#b68a35",
    headline: "From your books to the FTA portal.",
    support:
      "Support with VAT and Corporate Tax registrations, return preparation, filing and administrative requests through EmaraTax, led by a named responsible professional.",
    chips: ["VAT returns", "Corporate Tax", "Registrations", "Portal support"],
    floatFacts: ["VAT period tracked", "CT registration in view", "Portal actions documented"],
  },
  {
    id: "tally",
    dockLabel: "TallyPrime",
    accent: "#2f6fc1",
    headline: "Bookkeeping that holds up, voucher by voucher.",
    support:
      "Day-to-day entries, ledgers and day-book review in TallyPrime, kept clean enough to close every month with confidence.",
    chips: ["Voucher entry", "Ledgers and groups", "Day book review", "Monthly closing"],
    floatFacts: ["Day book reviewed", "Ledgers kept clean", "Month close in view"],
  },
  {
    id: "qbo",
    dockLabel: "QuickBooks Online",
    accent: "#2ca01c",
    headline: "Cloud books that stay reconciled.",
    support:
      "Bank feeds matched, receivables monitored, and management reports connected to the bank balance inside QuickBooks Online.",
    chips: ["Bank feeds", "Reconciliation", "Receivables", "Management reports"],
    floatFacts: ["Bank feed matched", "Invoices followed up", "Reports tied to the bank"],
  },
  {
    id: "qbd",
    dockLabel: "QuickBooks Desktop",
    accent: "#5588a3",
    headline: "An older company file? Still in good hands.",
    support:
      "Catch-up, cleanup and reconciliations for long-running QuickBooks Desktop files, plus a careful migration path to the cloud when you are ready.",
    chips: ["Catch-up and cleanup", "Reconciliations", "Reporting", "Cloud migration"],
    floatFacts: ["Backlog cleared", "Accounts reconciled", "Migration-ready file"],
  },
  {
    id: "zoho",
    dockLabel: "Zoho Books",
    accent: "#2f7af5",
    headline: "VAT-ready books, built for UAE workflows.",
    support:
      "Invoicing, automated workflows and tax-ready records in Zoho Books, set up around the way a UAE business actually operates.",
    chips: ["UAE VAT invoicing", "Automation", "Payables and receivables", "Reporting"],
    floatFacts: ["VAT-ready invoices", "Workflows automated", "Cash flow in view"],
  },
  {
    id: "xero",
    dockLabel: "Xero",
    accent: "#13b5ea",
    headline: "Every bank line, matched and explained.",
    support:
      "Reconciliation-first bookkeeping in Xero, with a live view of cash, invoices owed and bills due.",
    chips: ["Bank reconciliation", "Cash position", "Invoices and bills", "Clear reports"],
    floatFacts: ["Items reconciled", "Live cash position", "Bills scheduled"],
  },
];

export const platformStates = heroStates.filter((state) => state.id !== "intro");
export const SEGMENTS = heroStates.length - 1;
