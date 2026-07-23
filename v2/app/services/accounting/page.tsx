import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { accountingService } from "@/lib/services";

export const metadata: Metadata = {
  title: "Accounting",
  description:
    "UAE accounting support for system design, reconciliations, period close, MIS reporting, backlog recovery and controlled data migration.",
};

export default function AccountingPage() {
  return <ServicePage config={accountingService} />;
}
