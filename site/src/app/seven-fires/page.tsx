import type { Metadata } from "next";
import { Reveal, SectionHeading, TiltCard, Aurora } from "@/components/motion";
import SevenFiresGlobe from "@/components/SevenFiresGlobe";
import AssessButton from "@/components/AssessButton";
import {
  CheckIcon,
  CommunityIcon,
  CompassIcon,
  EyeIcon,
  FireIcon,
  HeartHandIcon,
  LeafIcon,
  LockIcon,
  ShieldIcon,
  SunRiseIcon,
} from "@/components/icons";

const SITE_URL = "https://phronesis.ai";

export const metadata: Metadata = {
  title: "Path of the Seven Fires — Indigenous-Led Health & AI Training",
  description:
    "Path of the Seven Fires is Phronesis AI's Indigenous-led health promotion program for First Nations, Inuit and Métis communities in Canada — built on the Seven Grandfather Teachings, Two-Eyed Seeing and OCAP® data sovereignty, with community-controlled AI training.",
  keywords: [
    "Indigenous health AI Canada",
    "First Nations Inuit Métis health platform",
    "Seven Grandfather Teachings",
    "Two-Eyed Seeing Etuaptmumk",
    "OCAP principles data sovereignty",
    "Indigenous data sovereignty AI",
    "Indigenous-led health promotion",
    "AI training Indigenous communities",
    "culturally safe AI health",
    "Truth and Reconciliation Calls to Action health",
  ],
  alternates: { canonical: "/seven-fires" },
  openGraph: {
    type: "website",
    siteName: "Phronesis AI",
    url: `${SITE_URL}/seven-fires`,
    title: "Path of the Seven Fires — Phronesis AI",
    description:
      "Indigenous-led health promotion and community-controlled AI training, grounded in the Seven Grandfather Teachings, Two-Eyed Seeing and OCAP® data sovereignty.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Path of the Seven Fires — Phronesis AI",
    description:
      "Indigenous-led health promotion and community-controlled AI training, grounded in Indigenous knowledge and OCAP® data sovereignty.",
  },
};

const TEACHINGS = [
  {
    letter: "1",
    name: "Wisdom",
    ojibwe: "Nibwaakaawin",
    icon: <CompassIcon size={24} />,
    copy: "Evidence and Elder-guided judgment weighed together — the platform drafts, the community decides.",
    accent: "#0B3D5F",
    glow: "hover:shadow-[0_30px_60px_-28px_rgba(11,61,95,0.55)]",
  },
  {
    letter: "2",
    name: "Love",
    ojibwe: "Zaagi'idiwin",
    icon: <HeartHandIcon size={24} />,
    copy: "Programs built around kinship and care — family and caregiver context, not isolated individual metrics.",
    accent: "#E8A87C",
    glow: "hover:shadow-[0_30px_60px_-28px_rgba(232,168,124,0.65)]",
  },
  {
    letter: "3",
    name: "Respect",
    ojibwe: "Minaadendamowin",
    icon: <CommunityIcon size={24} />,
    copy: "Community voice sets the agenda; the platform follows protocol, not the other way around.",
    accent: "#7FB069",
    glow: "hover:shadow-[0_30px_60px_-28px_rgba(127,176,105,0.6)]",
  },
  {
    letter: "4",
    name: "Bravery",
    ojibwe: "Aakode'ewin",
    icon: <ShieldIcon size={24} />,
    copy: "Naming health gaps honestly, including the ones colonial systems caused, without softening the data.",
    accent: "#1F8A8A",
    glow: "hover:shadow-[0_30px_60px_-28px_rgba(31,138,138,0.55)]",
  },
  {
    letter: "5",
    name: "Honesty",
    ojibwe: "Gwayakwaadiziwin",
    icon: <CheckIcon size={24} />,
    copy: "Every AI suggestion cites its source and waits for a practitioner or Elder verdict — no black boxes.",
    accent: "#C38D6B",
    glow: "hover:shadow-[0_30px_60px_-28px_rgba(195,141,107,0.6)]",
  },
  {
    letter: "6",
    name: "Humility",
    ojibwe: "Dabaadendiziwin",
    icon: <SunRiseIcon size={24} />,
    copy: "The platform is a tool held by the community, not an authority over it — capacity stays local.",
    accent: "#F0973C",
    glow: "hover:shadow-[0_30px_60px_-28px_rgba(240,151,60,0.55)]",
  },
  {
    letter: "7",
    name: "Truth",
    ojibwe: "Debwewin",
    icon: <FireIcon size={24} />,
    copy: "Data is reported as it is, disaggregated by Nation and community, never averaged into invisibility.",
    accent: "#0B3D5F",
    glow: "hover:shadow-[0_30px_60px_-28px_rgba(11,61,95,0.55)]",
  },
];

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Path of the Seven Fires",
    url: `${SITE_URL}/seven-fires`,
    description:
      "Indigenous-led health promotion and community-controlled AI training program from Phronesis AI, grounded in the Seven Grandfather Teachings, Two-Eyed Seeing and OCAP® data sovereignty.",
    isPartOf: { "@type": "WebSite", name: "Phronesis AI", url: SITE_URL },
    about: {
      "@type": "Thing",
      name: "Indigenous health promotion and data sovereignty in Canada",
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export default function SevenFiresPage() {
  return (
    <main>
      {/* ————— Hero ————— */}
      <section className="relative flex min-h-[92dvh] items-center overflow-hidden pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(58rem_42rem_at_80%_25%,rgba(240,151,60,0.14),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(46rem_36rem_at_10%_85%,rgba(127,176,105,0.13),transparent_62%)]" />
        </div>

        <div className="wrap relative z-10 grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <Reveal className="inline-flex items-center gap-3 rounded-full border border-terra/35 bg-terra/10 px-4 py-1.5">
              <FireIcon size={14} className="text-terra" />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-terra">
                indigenous-led · community-governed
              </span>
            </Reveal>

            <h1 className="mt-6 font-display text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-ocean">
              Path of the <em className="font-medium text-terra">Seven Fires.</em>
            </h1>

            <p className="mt-7 max-w-xl text-[16.5px] leading-[1.75] text-ink/70">
              A dedicated home, inside Phronesis AI, for First Nations, Inuit and Métis-led
              health promotion — built on the Seven Grandfather Teachings, guided by{" "}
              <em className="font-display text-terra">Etuaptmumk</em> (Two-Eyed Seeing), and
              governed at every step by OCAP<sup>®</sup>: the community&apos;s data stays the
              community&apos;s own.
            </p>
            <p className="sr-only">
              Indigenous health AI platform for First Nations, Inuit and Métis communities in
              Canada — Indigenous-led health promotion, community-controlled AI training,
              culturally safe wellness programs, Truth and Reconciliation Commission Calls to
              Action 18 through 24, OCAP data sovereignty, Two-Eyed Seeing Etuaptmumk.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <AssessButton
                detail={{ assessmentType: "community" }}
                className="sheen group inline-flex items-center gap-2.5 rounded-full bg-terra px-7 py-3.5 text-[14.5px] font-semibold text-cream shadow-[0_18px_40px_-16px_rgba(195,141,107,0.65)] transition-all duration-300 will-change-transform hover:-translate-y-0.5 hover:bg-[#a97754]"
              >
                <span className="relative z-10">Start a Conversation</span>
              </AssessButton>
              <a
                href="#teachings"
                className="group inline-flex items-center gap-2.5 rounded-full border border-ocean/20 bg-white/50 px-7 py-3.5 text-[14.5px] font-semibold text-ocean backdrop-blur transition-all duration-300 hover:border-terra hover:text-terra"
              >
                The Seven Teachings
              </a>
            </div>
          </div>

          <div className="relative mx-auto h-[360px] w-full max-w-[540px] sm:h-[440px] lg:h-[520px]">
            <div
              className="breathe absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,151,60,0.2),rgba(127,176,105,0.1)_55%,transparent_72%)]"
              aria-hidden="true"
            />
            <SevenFiresGlobe className="h-full w-full" />
            <p className="sr-only">
              Abstract visualization of seven ember lights set along a circular path, with
              sparks rising gently. Decorative — it carries no data.
            </p>
          </div>
        </div>
      </section>

      {/* ————— what this page is, said plainly ————— */}
      <section className="relative overflow-hidden py-24">
        <Aurora />
        <div className="wrap relative max-w-3xl">
          <SectionHeading
            eyebrow="what this path means"
            tone="terra"
            title={
              <>
                Named for a prophecy about{" "}
                <em className="font-medium text-terra">choosing the right road.</em>
              </>
            }
            copy="The Seven Fires Prophecy is Anishinaabe teaching: seven epochs leading to a choice between the road of technology taken without wisdom, and the road that keeps wisdom and spirit at the centre. Choosing well, the story says, lights an Eighth Fire of peace, lit together. We take that as instruction, not decoration."
          />
          <Reveal delay={0.15} className="mt-8 rounded-3xl border border-terra/20 bg-terra/[0.06] p-7">
            <p className="text-[14px] leading-relaxed text-ink/70">
              Phronesis AI does not speak on behalf of any Nation. This page draws on the
              publicly documented Seven Grandfather Teachings and Seven Fires Prophecy of the
              Anishinaabe people, and on Etuaptmumk / Two-Eyed Seeing as articulated by
              Mi&apos;kmaw Elders Albert and Murdena Marshall. Every program built under this path
              is intended to be co-designed, reviewed and governed by the First Nations, Inuit
              or Métis communities and Elders it serves — never assumed on their behalf.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ————— why: TRC grounding ————— */}
      <section className="relative overflow-hidden bg-ocean py-24 text-cream">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(54rem_38rem_at_15%_0%,rgba(195,141,107,0.22),transparent_60%)]"
          aria-hidden="true"
        />
        <div className="wrap relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="flex items-center gap-3">
              <span className="h-px w-8 bg-terra" aria-hidden="true" />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-terra">
                why this exists
              </span>
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.08] text-cream">
              A direct response to Calls to Action{" "}
              <em className="font-medium text-terra">18 through 24.</em>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-cream/70">
              Canada&apos;s Truth and Reconciliation Commission named health as one of its clearest
              unfinished obligations: acknowledge distinct Indigenous health needs, close
              measurable gaps, fund Indigenous healing approaches alongside Western medicine,
              grow the Indigenous health workforce, and treat physical, mental, emotional and
              spiritual health as one whole. This path is our platform&apos;s answer to that brief —
              not a press release, a working feature set.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { n: "18–19", t: "Distinct needs, measured gaps", c: "Indigenous-specific indicators, reported by Nation — never blended into a national average." },
              { n: "20", t: "Healing alongside medicine", c: "Traditional wellness and healing sit beside clinical data as equally valid evidence, not an afterthought." },
              { n: "21–22", t: "Grow local capacity", c: "AI-literacy and data-governance training builds skills that stay inside the community's own workforce." },
              { n: "23–24", t: "Whole-person, culturally safe", c: "Physical, mental, emotional and spiritual health assessed together — the same stance as our Land-Based Wellness module." },
            ].map((b) => (
              <Reveal key={b.n} delay={0.05}>
                <div className="h-full rounded-2xl border border-cream/12 bg-cream/[0.05] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-terra">
                    Call to Action {b.n}
                  </p>
                  <p className="mt-2 font-display text-[16px] font-semibold text-cream">{b.t}</p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-cream/65">{b.c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Two-Eyed Seeing ————— */}
      <section className="relative overflow-hidden py-24">
        <div className="wrap relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="how ai and wisdom sit together"
              tone="sage"
              title={
                <>
                  <em className="font-medium text-sage">Etuaptmumk</em> — seeing with both
                  eyes.
                </>
              }
            />
          </div>
          <Reveal delay={0.1}>
            <blockquote className="rounded-3xl border border-sage/25 bg-sage/[0.06] p-8">
              <p className="font-display text-[19px] italic leading-relaxed text-ocean">
                &ldquo;Learning to see from one eye with the strengths of Indigenous
                knowledges and ways of knowing, and from the other eye with the strengths of
                Western knowledges and ways of knowing, and to use both these eyes together,
                for the benefit of all.&rdquo;
              </p>
              <footer className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">
                — Elders Albert &amp; Murdena Marshall, Mi&apos;kmaw Nation, Unama&apos;ki
              </footer>
            </blockquote>
            <p className="mt-6 max-w-xl text-[14.5px] leading-relaxed text-ink/65">
              This is the model our AI Co-Pilot follows here: retrieval and pattern-finding
              from one eye, Elder and community knowledge from the other, never one
              overriding the other. No suggestion reaches a report or a community without a
              practitioner or Elder&apos;s verdict — the same human-led guardrail the rest of
              Phronesis AI runs on, applied with the specific humility this path calls for.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ————— Seven Grandfather Teachings as service pillars ————— */}
      <section id="teachings" className="relative overflow-hidden py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(52rem_40rem_at_88%_10%,rgba(240,151,60,0.1),transparent_60%)]"
          aria-hidden="true"
        />
        <div className="wrap relative">
          <SectionHeading
            eyebrow="the seven grandfather teachings"
            tone="terra"
            align="center"
            title={
              <>
                Seven teachings.{" "}
                <em className="font-medium text-terra">One platform, held to each.</em>
              </>
            }
            copy="Anishinaabe teaching holds that none of these stand alone — wisdom needs love, bravery needs humility. Every capability on this path is built to answer to all seven together, not just the one it's filed under."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {TEACHINGS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.07} className="group h-full">
                <TiltCard
                  className="flex h-full flex-col rounded-3xl border border-ocean/10 bg-white/70 p-7"
                  glow={t.glow}
                >
                  <span className="absolute right-6 top-6 font-mono text-[11px] tracking-[0.2em] text-ink/35" aria-hidden="true">
                    0{t.letter}
                  </span>
                  <span
                    className="grid h-13 w-13 place-items-center rounded-2xl text-cream"
                    style={{ backgroundColor: t.accent, height: 52, width: 52 }}
                  >
                    {t.icon}
                  </span>
                  <h3 className="mt-6 font-display text-[20px] font-semibold text-ocean">
                    {t.name}
                  </h3>
                  <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/40">
                    {t.ojibwe}
                  </p>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink/65">{t.copy}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Community-controlled AI + data sovereignty ————— */}
      <section className="relative overflow-hidden bg-ocean py-28 text-cream">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(56rem_40rem_at_15%_0%,rgba(31,138,138,0.28),transparent_60%),radial-gradient(48rem_36rem_at_90%_100%,rgba(240,151,60,0.16),transparent_60%)]"
          aria-hidden="true"
        />
        <div className="wrap relative">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3">
              <span className="h-px w-8 bg-amber" aria-hidden="true" />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-amber">
                community-controlled ai
              </span>
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.08] text-cream">
              OCAP<sup>®</sup> isn&apos;t a policy page here.{" "}
              <em className="font-medium text-amber">It&apos;s the architecture.</em>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-cream/70">
              The First Nations Principles of OCAP<sup>®</sup> — Ownership, Control, Access
              and Possession — were established in 1998 by First Nations leadership and are
              stewarded today by the First Nations Information Governance Centre. On this
              path, they are enforced technically, not just promised.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {[
              { icon: LockIcon, t: "Ownership", c: "Community data belongs to the community collectively — the same way a person owns their own information." },
              { icon: ShieldIcon, t: "Control", c: "Nations govern how their data is collected, analyzed, reported and used, at every stage of the pipeline." },
              { icon: EyeIcon, t: "Access", c: "Communities can always see their own data, wherever the platform stores it — no locked dashboards." },
              { icon: LeafIcon, t: "Possession", c: "Physical stewardship of the data stays traceable and auditable — possession is how ownership is actually protected." },
            ].map((o) => (
              <Reveal key={o.t} delay={0.05}>
                <div className="h-full rounded-2xl border border-cream/12 bg-cream/[0.05] p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber/20 text-amber">
                    <o.icon size={18} />
                  </span>
                  <p className="mt-4 font-display text-[17px] font-semibold text-cream">{o.t}</p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-cream/65">{o.c}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-14 grid gap-8 rounded-3xl border border-cream/12 bg-cream/[0.04] p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terra">ai training &amp; capacity building</p>
              <h3 className="mt-3 font-display text-[24px] font-semibold text-cream">
                Skills stay with your team. Always.
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                "Train-the-trainer AI-literacy labs for community health workers and youth — no vendor dependency to sustain the program.",
                "Every model is fine-tuned only on data a community has explicitly approved for that use, and never on data it hasn't.",
                "Métis, Inuit and First Nations data are governed under their own distinct principles — never folded into one generic 'Indigenous' dataset.",
                "A practitioner or Elder verdict gates every AI output before it reaches a report, a chart or a community meeting.",
              ].map((li) => (
                <li key={li} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-cream/75">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sage/20 text-sage">
                    <CheckIcon size={11} />
                  </span>
                  {li}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ————— closing CTA ————— */}
      <section className="relative overflow-hidden py-28">
        <Aurora />
        <div className="wrap relative max-w-2xl text-center">
          <FireIcon size={34} className="mx-auto text-terra" />
          <h2 className="mt-6 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.1] text-ocean">
            Walk this path <em className="font-medium text-terra">with us.</em>
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-ink/70">
            Tell us about your community, your Nation, or your organization. A practitioner
            will reach out within two business days to scope a free assessment — on your
            terms, governed by your protocols.
          </p>
          <AssessButton
            detail={{ assessmentType: "community" }}
            className="sheen mt-8 inline-flex items-center gap-2.5 rounded-full bg-terra px-8 py-4 text-[14.5px] font-semibold text-cream shadow-[0_18px_40px_-16px_rgba(195,141,107,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a97754]"
          >
            <span className="relative z-10">Start a Conversation</span>
          </AssessButton>
        </div>
      </section>
      <JsonLd />
    </main>
  );
}
