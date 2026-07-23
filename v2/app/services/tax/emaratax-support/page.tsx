import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { emaraTaxService } from "@/lib/services";

export const metadata: Metadata = {
  title: "EmaraTax Account and Amendment Support",
  description:
    "EmaraTax support for tax-record amendments, legal-document updates, access recovery guidance, penalty applications, inquiries and complaints.",
};

export default function EmaraTaxSupportPage() {
  return <ServicePage config={emaraTaxService} />;
}
