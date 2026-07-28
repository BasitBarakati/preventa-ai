"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./motion";
import { CheckIcon, EyeIcon, LockIcon, SparkIcon } from "./icons";
import { LogoIcon } from "./Logo";

type Verify = "pending" | "approved" | "revised";

type Msg = {
  id: number;
  role: "ai" | "user";
  text: string;
  citations?: string[];
  verify?: Verify;
};

/** Fixed positions/timing so the drift is stable across renders — echoes
 *  the hero brandmark's node field on this section's dark background. */
const PARTICLES = [
  { x: "8%", y: "18%", s: 5, c: "#1F8A8A", o: 0.5, d: 7.5, delay: 0 },
  { x: "22%", y: "62%", s: 3, c: "#E8A87C", o: 0.45, d: 8.5, delay: 1.2 },
  { x: "38%", y: "12%", s: 4, c: "#7FB069", o: 0.4, d: 6.8, delay: 2.4 },
  { x: "61%", y: "78%", s: 3, c: "#1F8A8A", o: 0.5, d: 9, delay: 0.6 },
  { x: "74%", y: "30%", s: 5, c: "#E8A87C", o: 0.35, d: 7.8, delay: 3.1 },
  { x: "85%", y: "60%", s: 3, c: "#7FB069", o: 0.45, d: 8.2, delay: 1.8 },
  { x: "48%", y: "88%", s: 4, c: "#1F8A8A", o: 0.4, d: 7.2, delay: 4 },
  { x: "92%", y: "15%", s: 3, c: "#E8A87C", o: 0.5, d: 8.8, delay: 2.9 },
];

const GUARDRAILS = [
  { icon: LockIcon, label: "De-identified inputs · PHIPA scope" },
  { icon: EyeIcon, label: "Retrieval you can audit, source by source" },
  { icon: CheckIcon, label: "No autonomous decisions — human verdict required" },
];

const OPENING: Msg = {
  id: 0,
  role: "ai",
  text:
    "Sandbox ready. I have access to the Q3 community needs survey (n = 4,812, de-identified), ward-level census linkage and your program registry. Ask me to summarize, flag gaps or match interventions — I will show my sources and wait for a practitioner verdict.",
  citations: [
    "Q3 Community Needs Survey 2026 — de-identified (PHIPA)",
    "Ward-level census linkage, 2021 — Statistics Canada",
    "Program registry v14 — internal, read-only",
  ],
};

const PROMPTS: { label: string; user: string; answer: string; citations: string[] }[] = [
  {
    label: "Summarize community needs",
    user: "Summarize the Q3 community needs survey for the board brief.",
    answer:
      "Top priorities across 4,812 responses: food security (38%), youth mental health (31%) and transit access to care (24%). Assets are strong — 12 community organizations already deliver adjacent programs. Caution: Ward 7 is under-represented (n = 41, ~60% below target), so treat its figures as directional, not definitive. I recommend a community validation session before publication.",
    citations: [
      "Q3 Community Needs Survey 2026 — full methodology, pp. 12–19",
      "Ward 7 sampling audit — internal QA note 2026-041",
      "Ottawa Charter action areas — crosswalk table",
    ],
  },
  {
    label: "Flag data gaps",
    user: "Flag any data gaps before we finalize the board report.",
    answer:
      "Three gaps worth flagging: (1) Ward 7 response volume is 60% under target — add a caution footnote; (2) the food-security indicator has no trend line (only two quarters collected); (3) responses are not disaggregated for ages 12–17, so youth mental-health demand is likely under-stated. None block publication; all deserve an explicit limitation note.",
    citations: [
      "Indicator inventory — completeness matrix, Q3",
      "Disaggregation standard v2 — equity office",
      "Board report draft v0.3 — tracked limitations",
    ],
  },
  {
    label: "Match interventions",
    user: "Suggest evidence-informed interventions for the top two priorities.",
    answer:
      "For food security: mobile food hubs show strong evidence (3 systematic reviews) and fit your existing pantry network; pair with a benefit-navigation desk. For youth mental health: peer-led Mental Health First Aid cohorts show moderate-to-strong effects in school settings; gatekeeper training for coaches extends reach. Both map to Ottawa Charter 'building healthy public policy'. Neither should proceed without the Ward 7 validation session.",
    citations: [
      "CMCDP evidence brief — food security interventions, 2025",
      "PHAC guidance — youth mental health promotion, 2024",
      "Cochane-style review: peer MHFA in schools (k = 11)",
    ],
  },
];

/** AI Co-Pilot sandbox — demonstrates human-led, AI-assisted in the open. */
export default function Copilot() {
  const [messages, setMessages] = useState<Msg[]>([OPENING]);
  const [busy, setBusy] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [used, setUsed] = useState<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const nextId = useRef(1);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  useEffect(() => () => timers.current.forEach(clearInterval), []);

  const runPrompt = (idx: number) => {
    if (busy) return;
    const p = PROMPTS[idx];
    setBusy(true);
    setUsed((u) => [...u, idx]);
    const userId = nextId.current++;
    const aiId = nextId.current++;
    setMessages((m) => [...m, { id: userId, role: "user", text: p.user }]);

    // brief "retrieval" pause, then stream the answer token by token
    const start = window.setTimeout(() => {
      setMessages((m) => [...m, { id: aiId, role: "ai", text: "" }]);
      setStreaming(true);
      let i = 0;
      const iv = window.setInterval(() => {
        i = Math.min(p.answer.length, i + 3);
        const slice = p.answer.slice(0, i);
        setMessages((m) => m.map((msg) => (msg.id === aiId ? { ...msg, text: slice } : msg)));
        if (i >= p.answer.length) {
          clearInterval(iv);
          setStreaming(false);
          setBusy(false);
          setMessages((m) =>
            m.map((msg) =>
              msg.id === aiId
                ? { ...msg, citations: p.citations, verify: "pending" as Verify }
                : msg,
            ),
          );
        }
      }, 18);
      timers.current.push(iv);
    }, 900);
    timers.current.push(start);
  };

  const setVerify = (id: number, v: Verify) =>
    setMessages((m) => m.map((msg) => (msg.id === id ? { ...msg, verify: v } : msg)));

  const latestAi = [...messages].reverse().find((m) => m.role === "ai" && m.citations);

  return (
    <section id="copilot" className="relative overflow-hidden bg-ocean py-32">
      {/* ambient depth */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(56rem_40rem_at_15%_0%,rgba(31,138,138,0.28),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(48rem_36rem_at_90%_100%,rgba(232,168,124,0.16),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.25] [background-image:linear-gradient(rgba(250,247,242,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(250,247,242,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />
        {/* particle drift — echoes the hero mark's node field on this dark section */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="floaty absolute rounded-full"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s, background: p.c, opacity: p.o, animationDuration: `${p.d}s`, animationDelay: `${p.delay}s` }}
          />
        ))}
      </div>

      <div className="wrap relative">
        <div className="max-w-3xl">
          <Reveal className="flex items-center gap-3">
            <span className="h-px w-8 bg-amber" aria-hidden="true" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-amber">
              <ScrambleLabel />
            </span>
          </Reveal>
          <h2 className="mask-line mt-4">
            <span className="block font-display text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.06] font-semibold tracking-tight text-cream">
              Meet the Co-Pilot.{" "}
              <em className="font-medium text-amber">You stay at the helm.</em>
            </span>
          </h2>
          <Reveal delay={0.15} className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-cream/65">
            Every suggestion arrives with its sources and a glowing reminder: verify with a
            practitioner. Approve it, revise it, or reject it — the Co-Pilot never acts alone.
            Try the sandbox below with real-looking, fully synthetic data.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ————— chat ————— */}
          <Reveal>
            <div className="flex h-[540px] flex-col overflow-hidden rounded-3xl border border-cream/12 bg-[#0d3550]/80 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)] backdrop-blur">
              {/* title bar */}
              <div className="flex items-center justify-between border-b border-cream/10 px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-cream">
                    <LogoIcon size={21} />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-cream">Phronesis Co-Pilot</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/45">
                      sandbox · synthetic data
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="ai-dot h-1.5 w-1.5 rounded-full bg-sage" aria-hidden="true" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream/50">
                    retrieval live
                  </span>
                </div>
              </div>

              {/* transcript */}
              <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
                {messages.map((m) =>
                  m.role === "user" ? (
                    <div key={m.id} className="flex justify-end">
                      <p className="max-w-[82%] rounded-2xl rounded-br-md bg-amber/95 px-4 py-3 text-[13.5px] leading-relaxed font-medium text-ocean">
                        {m.text}
                      </p>
                    </div>
                  ) : (
                    <div key={m.id} className="flex justify-start">
                      <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-cream/10 bg-cream/[0.06] px-4 py-3">
                        <p
                          className={`text-[13.5px] leading-relaxed text-cream/85 ${
                            m.text.length > 0 && m.verify === undefined && m.id !== 0
                              ? "caret"
                              : ""
                          }`}
                        >
                          {m.text}
                        </p>
                        {/* verification badge */}
                        {m.verify === "pending" && (
                          <div className="mt-3 rounded-xl border border-amber/30 bg-amber/10 p-3">
                            <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-amber">
                              <span className="ai-dot h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
                              ai-suggested — verify with practitioner
                            </p>
                            <div className="mt-2.5 flex gap-2">
                              <button
                                onClick={() => setVerify(m.id, "approved")}
                                className="rounded-full bg-sage px-3.5 py-1.5 text-[11.5px] font-semibold text-ocean transition-transform hover:-translate-y-0.5"
                              >
                                ✓ Approve
                              </button>
                              <button
                                onClick={() => setVerify(m.id, "revised")}
                                className="rounded-full border border-cream/25 px-3.5 py-1.5 text-[11.5px] font-semibold text-cream/80 transition-colors hover:border-amber hover:text-amber"
                              >
                                Request revision
                              </button>
                            </div>
                          </div>
                        )}
                        {m.verify === "approved" && (
                          <p className="mt-3 flex items-center gap-2 rounded-xl border border-sage/35 bg-sage/12 px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-sage">
                            <CheckIcon size={12} /> validated by practitioner · dr. a. okonkwo
                          </p>
                        )}
                        {m.verify === "revised" && (
                          <p className="mt-3 rounded-xl border border-amber/35 bg-amber/10 px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-amber">
                            revision requested — queued for practitioner review
                          </p>
                        )}
                      </div>
                    </div>
                  ),
                )}
                {busy && !streaming && (
                  <div className="flex items-center gap-1.5 pl-1" aria-label="Co-Pilot is retrieving">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/40">
                      retrieving sources…
                    </span>
                  </div>
                )}
              </div>

              {/* suggested prompts */}
              <div className="border-t border-cream/10 p-4">
                <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/40">
                  try a prompt
                </p>
                <div className="flex flex-wrap gap-2">
                  {PROMPTS.map((p, i) => (
                    <button
                      key={p.label}
                      onClick={() => runPrompt(i)}
                      disabled={busy}
                      className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-medium transition-all duration-300 ${
                        used.includes(i)
                          ? "border-sage/40 bg-sage/10 text-sage"
                          : "border-cream/20 text-cream/75 hover:-translate-y-0.5 hover:border-amber hover:text-amber"
                      } ${busy ? "cursor-not-allowed opacity-50" : ""}`}
                    >
                      <SparkIcon size={13} />
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ————— evidence trail ————— */}
          <Reveal delay={0.15}>
            <div className="flex h-[540px] flex-col overflow-hidden rounded-3xl border border-cream/12 bg-[#0d3550]/60 backdrop-blur">
              <div className="flex items-center justify-between border-b border-cream/10 px-5 py-3.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60">
                  evidence trail
                </p>
                <span className="rounded-full bg-teal/20 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-teal">
                  auditable
                </span>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto p-5">
                {(latestAi?.citations ?? OPENING.citations ?? []).map((c, i) => (
                  <div
                    key={`${latestAi?.id ?? 0}-${c}`}
                    className="citation-in group flex gap-3 rounded-xl border border-cream/10 bg-cream/[0.04] p-3.5 transition-colors hover:border-teal/40"
                    style={{ animationDelay: `${i * 0.09}s` }}
                  >
                    <span className="font-mono text-[11px] font-semibold text-amber">
                      [{i + 1}]
                    </span>
                    <p className="font-mono text-[11.5px] leading-relaxed text-cream/70">{c}</p>
                  </div>
                ))}
                <div className="pt-2">
                  <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/40">
                    guardrails
                  </p>
                  <ul className="space-y-2.5">
                    {GUARDRAILS.map((g) => (
                      <li key={g.label} className="flex items-center gap-3 text-[12.5px] text-cream/65">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cream/8 text-sage">
                          <g.icon size={14} />
                        </span>
                        {g.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-cream/10 p-4">
                <p className="flex items-center gap-2.5 rounded-xl bg-amber/10 px-3.5 py-3 text-[12px] leading-snug text-amber">
                  <span className="ai-dot h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden="true" />
                  Human-led, AI-assisted: nothing ships without a practitioner verdict.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Small inline scramble so the dark section shares the signature decode. */
function ScrambleLabel() {
  const [out, setOut] = useState("ai co-pilot sandbox");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = "ai co-pilot sandbox";
    const glyphs = "φξδ·—+×";
    let f = 0;
    const iv = setInterval(() => {
      f++;
      const settled = Math.floor(f / 2);
      setOut(
        target
          .split("")
          .map((c, i) => (c === " " ? " " : i < settled ? c : glyphs[i % glyphs.length]))
          .join(""),
      );
      if (settled >= target.length) clearInterval(iv);
    }, 34);
    return () => clearInterval(iv);
  }, []);
  return <>{out}</>;
}
