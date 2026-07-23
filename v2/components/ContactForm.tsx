"use client";

import { useState } from "react";
import s from "./ContactForm.module.css";

/*
 * Posts to Web3Forms (https://web3forms.com).
 * To activate: create a free access key for info@thinkbeyondtax.com and
 * replace ACCESS_KEY_PLACEHOLDER below.
 */
const ACCESS_KEY = "ACCESS_KEY_PLACEHOLDER";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!ACCESS_KEY || ACCESS_KEY === "ACCESS_KEY_PLACEHOLDER") {
      setStatus("The form isn't connected yet, please reach us on WhatsApp or email instead.");
      return;
    }

    setStatus("Sending…");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        setStatus("Thank you, we'll get back to you within one working day.");
      } else {
        throw new Error(String(res.status));
      }
    } catch {
      setStatus("Something went wrong, please reach us on WhatsApp or email instead.");
    }
  }

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value="New enquiry: thinkbeyondtax.com" />
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
      <button className="btn btn-gold" type="submit">
        Send Enquiry
      </button>
      <p className={s.status} role="status">
        {status}
      </p>
    </form>
  );
}
