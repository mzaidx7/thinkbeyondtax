import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { vatService } from "@/lib/services";

export const metadata: Metadata = {
  title: "VAT Registration, Filing and Refund Support",
  description:
    "UAE VAT support for registration, return filing, VAT311 refunds, tax groups, ledger reconciliation and correction coordination.",
};

export default function VatPage() {
  return <ServicePage config={vatService} />;
}
