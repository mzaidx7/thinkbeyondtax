import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { EMAIL, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/site";
import s from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us how your records are kept and what you need — we'll connect you with the right independent professional.",
};

export default function ContactPage() {
  return (
    <>
      <section className={`hex-bg ${s.hero}`}>
        <div className="container">
          <p className="overline">Contact</p>
          <h1 className={s.h1}>Discuss your requirements</h1>
          <p className={s.intro}>
            Tell us how your records are kept and what you need — we'll connect you with the right
            independent professional. No obligation, no hard sell.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.grid}`}>
          <div className={s.channels}>
            <a className={s.channel} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <p className={s.label}>WhatsApp</p>
              <p className={s.value}>{PHONE_DISPLAY}</p>
              <p className={s.note}>Usually the fastest way to reach us</p>
            </a>
            <a className={s.channel} href={`mailto:${EMAIL}`}>
              <p className={s.label}>Email</p>
              <p className={s.value}>{EMAIL}</p>
              <p className={s.note}>We reply within one working day</p>
            </a>
            <div className={`${s.channel} ${s.channelStatic}`}>
              <p className={s.label}>Location</p>
              <p className={s.value}>United Arab Emirates</p>
              <p className={s.note}>Remote-first — on-site visits by arrangement</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
