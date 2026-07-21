import Link from "next/link";
import s from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={`hex-bg ${s.nf}`}>
      <div className={`container ${s.inner}`}>
        <p className="overline">404</p>
        <h1 className={s.h1}>This page doesn&apos;t balance.</h1>
        <p className={s.copy}>The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link className="btn btn-gold" href="/">
          Back to home
        </Link>
      </div>
    </section>
  );
}
