import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { bookkeepingService } from "@/lib/services";

export const metadata: Metadata = {
  title: "Bookkeeping",
  description:
    "UAE bookkeeping support for transactions, reconciliations, receivables, payables, payroll records, VAT coding and period readiness.",
};

export default function BookkeepingPage() {
  return <ServicePage config={bookkeepingService} />;
}
