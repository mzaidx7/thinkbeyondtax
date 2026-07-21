import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "VAT",
  description:
    "Support with UAE VAT — from registration through quarterly returns — built on records that are actually ready for filing.",
};

export default function VatPage() {
  return (
    <ServicePage
      title="VAT"
      overline="Tax Services"
      intro="Support with UAE VAT — from registration through quarterly returns — built on records that are actually ready for filing."
      covers={[
        "VAT registration and deregistration assistance through EmaraTax",
        "VAT-compliant invoicing and record setup in your accounting software",
        "Quarterly VAT return preparation and filing support",
        "Reconciliation of VAT accounts against your books",
        "Voluntary disclosure and correction support where needed",
        "Guidance on VAT treatment of everyday transactions",
      ]}
    >
      <p className="tax-note">
        Tax content on this page is general information, not advice. UAE rules change — current
        requirements should always be confirmed against official Federal Tax Authority guidance or
        with the named professional handling your engagement.
      </p>
    </ServicePage>
  );
}
