"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import s from "./Header.module.css";

const services = [
  { label: "Accounting", href: "/services/accounting" },
  { label: "Bookkeeping", href: "/services/bookkeeping" },
];
const taxServices = [
  { label: "VAT", href: "/services/tax/vat" },
  { label: "Corporate Tax", href: "/services/tax/corporate-tax" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobServicesOpen, setMobServicesOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!dropRef.current?.contains(e.target as Node)) setDropOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ""}`}>
      <div className={`container ${s.inner}`}>
        <Link href="/" className={s.logoLink} aria-label={`${SITE_NAME} — home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/tbt-horizontal-color.png" alt={SITE_NAME} width={150} height={38} />
        </Link>

        <nav className={s.navDesktop} aria-label="Main">
          <Link href="/">Home</Link>

          <div className={`${s.drop} ${dropOpen ? s.dropOpen : ""}`} ref={dropRef}>
            <button
              type="button"
              className={s.dropBtn}
              aria-expanded={dropOpen}
              aria-controls="services-menu"
              onClick={() => setDropOpen((v) => !v)}
            >
              Services
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className={s.dropPanel} id="services-menu">
              {services.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
              <p className={s.dropGroup}>Tax Services</p>
              {taxServices.map((item) => (
                <Link key={item.href} className={s.dropSub} href={item.href}>
                  {item.label}
                </Link>
              ))}
              <Link className={s.dropAll} href="/services">
                All services →
              </Link>
            </div>
          </div>

          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/contact" className={`btn btn-gold ${s.cta}`}>
            Discuss Your Requirements
          </Link>
        </nav>

        <button
          type="button"
          className={s.burger}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mobileOpen && (
        <div className={s.mobileMenu} id="mobile-menu">
          <nav aria-label="Mobile">
            <Link href="/" onClick={closeMobile}>
              Home
            </Link>
            <button
              type="button"
              className={s.mobServicesBtn}
              aria-expanded={mobServicesOpen}
              onClick={() => setMobServicesOpen((v) => !v)}
            >
              Services
              <svg width="12" height="7" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {mobServicesOpen && (
              <div className={s.mobServices}>
                {services.map((item) => (
                  <Link key={item.href} href={item.href} onClick={closeMobile}>
                    {item.label}
                  </Link>
                ))}
                <p className={s.dropGroup}>Tax Services</p>
                {taxServices.map((item) => (
                  <Link key={item.href} className={s.dropSub} href={item.href} onClick={closeMobile}>
                    {item.label}
                  </Link>
                ))}
                <Link href="/services" onClick={closeMobile}>
                  All services →
                </Link>
              </div>
            )}
            <Link href="/about" onClick={closeMobile}>
              About
            </Link>
            <Link href="/contact" onClick={closeMobile}>
              Contact
            </Link>
            <Link href="/contact" className="btn btn-gold" onClick={closeMobile}>
              Discuss Your Requirements
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
