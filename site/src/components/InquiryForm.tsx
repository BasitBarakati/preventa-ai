"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import GlowingButton from "./ui/GlowingButton";

type State = { status: "idle" | "sending" | "success" | "error"; message: string };

export default function InquiryForm() {
  const [state, setState] = useState<State>({ status: "idle", message: "" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState({ status: "sending", message: "Sending your request…" });
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error ?? "Your request could not be sent.");
      form.reset();
      setState({ status: "success", message: "Thank you. Your request has been recorded for human review." });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "Your request could not be sent. Please try again." });
    }
  }

  return (
    <form className="glass-card lux-inquiry-form" onSubmit={submit} noValidate>
      <div className="lux-field-grid">
        <div className="lux-field"><label htmlFor="name">Name <span aria-hidden="true">*</span></label><input id="name" name="name" autoComplete="name" required /></div>
        <div className="lux-field"><label htmlFor="email">Work email <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      </div>
      <div className="lux-field-grid">
        <div className="lux-field"><label htmlFor="org">Organization</label><input id="org" name="org" autoComplete="organization" /></div>
        <div className="lux-field"><label htmlFor="kind">How can we help? <span aria-hidden="true">*</span></label><select id="kind" name="kind" defaultValue="access" required><option value="access">Request early access</option><option value="demo">Request a demonstration</option><option value="partnership">Discuss a partnership</option><option value="governance">Ask a governance question</option></select></div>
      </div>
      <div className="lux-field lux-field--hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className="lux-field"><label htmlFor="message">What are you hoping to improve? <span aria-hidden="true">*</span></label><textarea id="message" name="message" rows={5} maxLength={1600} required /><small>Do not include personal health information, patient details, or other sensitive data.</small></div>
      <label className="lux-consent"><input type="checkbox" name="consent" value="true" required /><span>I consent to Preventa AI using these details to respond to this request. <LinkText /></span></label>
      <GlowingButton type="submit" disabled={state.status === "sending"}>{state.status === "sending" ? "Sending…" : "Send request"}</GlowingButton>
      <p className={`lux-form-status lux-form-status--${state.status}`} role="status" aria-live="polite">{state.message}</p>
    </form>
  );
}

function LinkText() {
  return <Link href="/privacy">Read the privacy notice.</Link>;
}
