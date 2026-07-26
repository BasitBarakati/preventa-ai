"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { LogoIcon } from "./Logo";

type Detail = { plan?: string; assessmentType?: string };

const TYPES = [
  ["individual", "Individual"],
  ["family", "Family"],
  ["community", "Community"],
  ["organizational", "Organizational"],
] as const;

/* Floating-label text field — label lifts on focus/fill, teal glow on focus. */
function FloatField({
  id,
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  autoFocus,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder=" "
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className="peer w-full rounded-xl border border-ocean/15 bg-white px-4 pb-2.5 pt-6 text-[13.5px] text-ink shadow-sm transition-all duration-300 placeholder-transparent focus:border-teal focus:shadow-[0_0_0_4px_rgba(31,138,138,0.16)] focus:outline-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-[1.05rem] text-[13.5px] text-ink/45 transition-all duration-200 peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-teal peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.14em]"
      >
        {label}
        {required ? " *" : ""}
      </label>
    </div>
  );
}

/** Global "Start Free Assessment" dialog — writes to the inquiries table. */
export default function AssessmentModal() {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<Detail>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    assessmentType: "community",
    population: "",
    message: "",
  });
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [shakeKey, setShakeKey] = useState(0);
  const [refId, setRefId] = useState<number | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<Detail>).detail ?? {};
      setDetail(d);
      setForm((f) => ({
        ...f,
        assessmentType: d.assessmentType ?? f.assessmentType,
        message: d.plan ? `Interested in the ${d.plan} tier.` : f.message,
      }));
      setState("idle");
      setOpen(true);
    };
    window.addEventListener("phronesis:assessment", onOpen);
    return () => window.removeEventListener("phronesis:assessment", onOpen);
  }, []);

  /* lock body scroll + Esc to close */
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("preload-lock");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("preload-lock");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const set =
    (k: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setState("busy");
    try {
      const r = await fetch("/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "assessment", ...form }),
      });
      const d = (await r.json()) as { ok: boolean; id?: number };
      if (r.ok && d.ok) {
        setRefId(d.id ?? null);
        setState("done");
      } else {
        setState("error");
        setShakeKey((k) => k + 1);
      }
    } catch {
      setState("error");
      setShakeKey((k) => k + 1);
    }
  };

  if (!open) return null;

  const selectCls =
    "w-full appearance-none rounded-xl border border-ocean/15 bg-white px-4 py-3 text-[13.5px] text-ink transition-all duration-300 focus:border-teal focus:shadow-[0_0_0_4px_rgba(31,138,138,0.16)] focus:outline-none";

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Start free assessment"
    >
      <button
        className="absolute inset-0 bg-ocean/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-label="Close dialog"
      />
      <div
        key={shakeKey}
        className={`relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-3xl border border-ocean/10 bg-cream shadow-[0_50px_120px_-30px_rgba(11,61,95,0.6)] ${
          state === "error" && shakeKey > 0 ? "shake" : ""
        }`}
      >
        <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-teal via-sage to-amber" aria-hidden="true" />

        {state === "done" ? (
          <div className="p-9 text-center">
            {/* drawn success checkmark */}
            <svg className="mx-auto h-16 w-16" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <circle cx="28" cy="28" r="26" stroke="#7FB069" strokeWidth="2.5" className="draw-ring" />
              <path
                d="M17 29.5 25 37.5 39.5 21"
                stroke="#7FB069"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="draw-check"
              />
            </svg>
            <h3 className="mt-5 font-display text-[24px] font-semibold text-ocean">
              Request received{detail.plan ? ` — ${detail.plan} tier` : ""}.
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-[13.5px] leading-relaxed text-ink/65">
              A practitioner (a human, promise) will reach out within two business days to scope
              your free assessment.
            </p>
            {refId !== null && (
              <p className="mt-4 inline-block rounded-full bg-ocean/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                reference · PHR-{String(refId).padStart(4, "0")}
              </p>
            )}
            <button
              onClick={() => setOpen(false)}
              className="mt-7 rounded-full bg-ocean px-7 py-3 text-[13.5px] font-semibold text-cream transition-colors hover:bg-[#0d4a73]"
            >
              Back to exploring
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-8" noValidate={false}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-teal">
                  free · no card · human-led
                </p>
                <h3 className="mt-2 font-display text-[24px] font-semibold text-ocean">
                  Start your free assessment
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ocean/15 text-ink/60 transition-colors hover:border-ocean hover:text-ocean"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M2 2l10 10M12 2L2 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
              <FloatField id="am-name" label="Full name" required value={form.name} onChange={set("name")} autoComplete="name" autoFocus placeholder=" " />
              <FloatField id="am-email" label="Work email" required type="email" value={form.email} onChange={set("email")} autoComplete="email" placeholder=" " />
              <FloatField id="am-org" label="Organization" value={form.org} onChange={set("org")} autoComplete="organization" placeholder=" " />
              <div>
                <label htmlFor="am-type" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/55">
                  Assessment lens
                </label>
                <select id="am-type" value={form.assessmentType} onChange={set("assessmentType")} className={selectCls}>
                  {TYPES.map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <FloatField id="am-pop" label="Population served (e.g. ~180,000 residents, 14 wards)" value={form.population} onChange={set("population")} placeholder=" " />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="am-msg" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/55">
                  What should we look at first?
                </label>
                <textarea
                  id="am-msg"
                  value={form.message}
                  onChange={set("message")}
                  rows={3}
                  placeholder="Chronic disease trends, youth mental health, emergency readiness…"
                  className="w-full resize-none rounded-xl border border-ocean/15 bg-white px-4 py-3 text-[13.5px] text-ink transition-all duration-300 placeholder:text-ink/35 focus:border-teal focus:shadow-[0_0_0_4px_rgba(31,138,138,0.16)] focus:outline-none"
                />
              </div>
            </div>

            {state === "error" && (
              <p role="alert" className="mt-3 rounded-xl bg-amber/15 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#a5643a]">
                something went wrong — please try again
              </p>
            )}

            <button
              type="submit"
              disabled={state === "busy"}
              className="mt-6 w-full rounded-full bg-amber py-3.5 text-[14px] font-semibold text-ocean shadow-[0_16px_36px_-14px_rgba(232,168,124,0.9)] transition-all hover:-translate-y-0.5 hover:bg-[#e29a68] disabled:translate-y-0 disabled:opacity-60"
            >
              {state === "busy" ? "Recording your request…" : "Request my free assessment"}
            </button>
            <p className="mt-3.5 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
              privacy by design · minimum data · never sold
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
