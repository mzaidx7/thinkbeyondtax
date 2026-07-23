import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { eInvoicingService } from "@/lib/services";

export const metadata: Metadata = {
  title: "E-Invoicing Readiness",
  description:
    "UAE e-invoicing readiness support for data mapping, ERP gap review, ASP conversations, onboarding coordination and data-quality controls.",
};

export default function EInvoicingPage() {
  return <ServicePage config={eInvoicingService} />;
}
