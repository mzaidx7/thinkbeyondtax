import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { corporateTaxService } from "@/lib/services";

export const metadata: Metadata = {
  title: "Corporate Tax Registration and Filing Support",
  description:
    "UAE Corporate Tax support for registration, accounting readiness, taxable-income schedules, return filing, payment preparation and specialist coordination.",
};

export default function CorporateTaxPage() {
  return <ServicePage config={corporateTaxService} />;
}
