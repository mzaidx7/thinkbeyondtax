import Image from "next/image";
import Link from "next/link";
import {
  SITE_NAME,
  EMAIL,
  PHONE_DISPLAY,
  WHATSAPP_URL,
  TRADEMARK_DISCLAIMER,
  COLLECTIVE_DISCLAIMER,
  GENERAL_INFO_DISCLAIMER,
} from "@/lib/site";
import s from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.grid}>
          <div className={s.brand}>
            <Image
              src="/brand/tbt-horizontal-color.png"
              alt={SITE_NAME}
              width={220}
              height={56}
              sizes="220px"
              quality={82}
            />
            <p>
              Independent UAE accounting, bookkeeping and tax professionals, working inside the
              systems your business already uses.
            </p>
          </div>

          <nav aria-label="Footer navigation" className={s.col}>
            <p className={s.head}>Navigate</p>
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <nav aria-label="Footer services" className={s.col}>
            <p className={s.head}>Services</p>
            <Link href="/services/accounting">Accounting</Link>
            <Link href="/services/bookkeeping">Bookkeeping</Link>
            <Link href="/services/e-invoicing">E-Invoicing</Link>
            <Link href="/services/tax/vat">VAT</Link>
            <Link href="/services/tax/corporate-tax">Corporate Tax</Link>
            <Link href="/services/tax/emaratax-support">EmaraTax Support</Link>
          </nav>

          <div className={s.col}>
            <p className={s.head}>Contact</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp: {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p className={s.loc}>United Arab Emirates</p>
          </div>
        </div>

        <hr className="gold-rule" />

        <div className={s.legal}>
          <p>{COLLECTIVE_DISCLAIMER}</p>
          <p>{GENERAL_INFO_DISCLAIMER}</p>
          <p>{TRADEMARK_DISCLAIMER}</p>
        </div>

        <p className={s.copy}>
          © {year} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
