"use client";

import { useState } from "react";
import s from "./ContactForm.module.css";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setMessage("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = (await res.json()) as { message?: string };

      if (!res.ok) {
        throw new Error(result.message ?? String(res.status));
      }

      form.reset();
      setStatus("success");
      setMessage(result.message ?? "Thank you, we'll get back to you within one working day.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please email info@thinkbeyondtax.com or reach us on WhatsApp.");
    }
  }

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <input type="checkbox" name="botcheck" className={s.hp} tabIndex={-1} autoComplete="off" />

      <div className={s.fieldRow}>
        <label>
          Name
          <input type="text" name="name" required autoComplete="name" />
        </label>
        <label>
          Company
          <input type="text" name="company" autoComplete="organization" />
        </label>
      </div>
      <label>
        Email
        <input type="email" name="email" required autoComplete="email" />
      </label>
      <label>
        What do you need help with?
        <select name="topic" defaultValue="Bookkeeping">
          <option>Bookkeeping</option>
          <option>Accounting</option>
          <option>VAT</option>
          <option>Corporate Tax</option>
          <option>E-Invoicing readiness</option>
          <option>EmaraTax support</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label>
        Message
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us about your business, the software you use, and what you need."
        />
      </label>
      <button className="btn btn-gold" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Enquiry"}
      </button>
      <p className={s.status} role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
