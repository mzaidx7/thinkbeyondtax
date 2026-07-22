import { WHATSAPP_URL, EMAIL } from "@/lib/site";
import s from "./CtaBand.module.css";

interface Props {
  heading?: string;
  sub?: string;
}

export default function CtaBand({
  heading = "Tell us how your business runs. We'll meet you there.",
  sub = "An initial discussion is free and without obligation. We'll listen to how your records are kept today and suggest a practical way forward.",
}: Props) {
  return (
    <section className={s.band}>
      <div className={`container ${s.inner}`}>
        <div>
          <h2>{heading}</h2>
          <p>{sub}</p>
        </div>
        <div className={s.actions}>
          <a className="btn btn-gold" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Discuss Your Requirements
          </a>
          <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>
            Email {EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
