import CtaBand from "./CtaBand";
import InternalHero from "./InternalHero";
import ServiceExperience from "./ServiceExperience";
import type { ServicePageConfig } from "@/lib/services";

interface Props {
  config: ServicePageConfig;
}

export default function ServicePage({ config }: Props) {
  return (
    <>
      <InternalHero overline={config.overline} title={config.title} intro={config.intro} />
      <ServiceExperience config={config} />
      <CtaBand heading={config.ctaHeading} sub={config.ctaSub} />
    </>
  );
}
