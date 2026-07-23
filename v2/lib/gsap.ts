"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

declare global {
  // The global flag survives client navigation and development remounts.
  var __tbtGsapRegistered: boolean | undefined;
}

if (typeof window !== "undefined" && !globalThis.__tbtGsapRegistered) {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  globalThis.__tbtGsapRegistered = true;
}

export { gsap, ScrollTrigger, useGSAP };
