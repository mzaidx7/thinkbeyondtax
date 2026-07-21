import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Accounting",
  description:
    "Reliable accounting records and reporting for UAE small and medium businesses — kept in the software you already use.",
};

export default function AccountingPage() {
  return (
    <ServicePage
      title="Accounting"
      intro="Reliable accounting records and reporting for UAE small and medium businesses — kept in the software you already use, reviewed by an experienced professional."
      covers={[
        "Monthly and quarterly accounting in TallyPrime, QuickBooks, Zoho Books or Xero",
        "Chart of accounts setup, cleanup and restructuring",
        "Month-end and year-end closing support",
        "Management reports: profit & loss, balance sheet, cash flow",
        "Financial record cleanup and catch-up accounting",
        "Coordination with licensed auditors and specialists where required",
      ]}
    />
  );
}
