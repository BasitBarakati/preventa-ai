# Phronesis AI — Concept Reference

> Working name: **Phronesis AI** (formerly referred to as "HealthPromo" in the
> foundational blueprint doc — see [[Naming]] below). AI-powered health
> promotion platform for Canada. Full source docs are in `docs/foundational/`.

## Naming

- **Phronesis** — Aristotelian "practical wisdom": the ability to make
  evidence-based judgments in complex situations. Positions the platform as a
  "brain trust," not just a tool — public health isn't just data, it's the
  wisdom to act on it.
- **PHRONESIS acronym** (six core public-health functions the platform
  organizes around):
  - **P** — Population Assessment & Surveillance
  - **H** — Health Promotion & Disease Prevention
  - **R** — Resilience & Emergency Preparedness
  - **O** — Operations & Policy Review
  - **N** — Networked Collaboration
  - **E** — Evidence & AI
  - **S** — Systems for Health Protection
  - **I** — Intelligence & Analytics
  - **S** — Strengthening the 6 [Public Health] Functions
- **Brand voice/tagline** (from the foundational doc, under the "HealthPromo"
  working title — recommended primary): *"Empowering Health. Strengthening
  Communities."* Alternates considered: "AI-Powered Wellness for Every
  Community," "Where Evidence Meets Equity in Health," "Health Promotion,
  Reimagined," "Better Data. Better Decisions. Better Health," "From Insight
  to Impact — Together," "HealthForAll" (#HealthForAll campaign hashtag).
- **Logo** (provided by user, not yet saved to disk — re-request the file to
  add it here): navy-blue brain/tree hybrid mark — left half a stylized brain
  outline, right half branches into leaves in sage green, teal, and one
  amber/orange accent dot, with a circuit-node motif on the trunk. Wordmark
  "Phronesis AI" in a navy serif beneath.

## Core concept

An AI-powered, evidence-informed digital ecosystem supporting individuals,
families, communities, organizations, public-health teams, healthcare
institutions, schools, and partner agencies across the full health-promotion
lifecycle:

**Assess → Plan → Act → Build Capacity → Evaluate → Improve**

Operationalizes the **Ottawa Charter for Health Promotion**, the **WHO
Framework on Health Promotion**, and the **PHAC Population Health Approach**,
with **OCAP® principles** (Ownership, Control, Access, Possession) and
cultural safety as foundational design pillars, not optional add-ons.

Differentiator: an **AI Co-Pilot for Health Promotion** that guides
context-aware assessments, recommends evidence-based interventions, helps
build logic models/indicators, generates monitoring dashboards, and produces
publication-ready evaluation reports — while keeping the human practitioner,
community, and lived experience at the centre.

### Design philosophy
- Human-led, AI-assisted — AI augments practitioner judgment; never replaces it.
- Evidence-informed + community-validated — cites peer-reviewed evidence, respects community knowledge.
- Equity by default — every workflow asks "who is being left behind?"
- Privacy by design — data sovereignty, consent, and transparency are non-negotiable.
- Strengths-based — identifies protective factors and assets, not just deficits.

## Site map

```
Home
Assess
  ├─ Individual Assessment
  ├─ Family Assessment
  ├─ Community Assessment
  └─ Organizational Assessment
Health & Wellness
  ├─ Wholistic Health
  ├─ Healthy Lifestyle
  ├─ Nutrition
  ├─ Healthy Growth & Development
  ├─ School Health
  ├─ Prevention of Infectious Diseases
  ├─ Prevention of Chronic Diseases
  ├─ Substance Use & Injury Prevention
  └─ Land-Based Wellness (Indigenous-led, OCAP®-aligned)
Capacity Development
  ├─ Individual Capacity
  ├─ Community Capacity
  └─ Institutional Capacity
Evaluation
  ├─ Formative Evaluation
  ├─ Process Evaluation
  ├─ Outcome Evaluation
  └─ Summative Evaluation
Resources Hub (added in weakness review)
  ├─ Evidence Library
  ├─ Toolkits & Templates
  ├─ Indicator Bank
  └─ Case Studies
Subscriptions: Basic (Free) · Professional · Organization · Enterprise · Community Tier (Sponsored)
About: Our Approach · Advisory Council · Cultural Safety & OCAP® · Privacy & AI Ethics
Contact: General Inquiries · Book a Consultation · Partnership Requests
```

## The four assessment instruments (the "branches")

These are real, structured survey instruments — each maps to a section of the
platform's Assess/Evaluate pillars and should become interactive digital
assessments (not static forms) in the product.

1. **Client/Patient Satisfaction Assessment** (`docs/foundational/02-...`) —
   clinics & hospitals QI survey. 5 Likert questions (1–5 satisfaction scale):
   provider behavior, trust in skills/knowledge, quality of services,
   communication, overall satisfaction. Anonymous, consent-gated, open comment
   field.
2. **Organizational Culture & Staff Satisfaction Survey**
   (`docs/foundational/03-...`) — 5 questions, each with a *different* scale
   type (agreement / satisfaction / frequency / quality / satisfaction):
   organizational culture, working environment, stress & workload management,
   workplace relationships, overall job satisfaction. Anonymous, consent-gated.
3. **Mental Wellness Assessment Questionnaire — Health Belief Model (HBM)**
   (`docs/foundational/04-...`) — the most clinically structured instrument.
   Informed consent + demographics, then 5-point Likert batteries across the
   full HBM construct set: perceived susceptibility, perceived severity,
   perceived benefits, perceived barriers, cues to action/awareness,
   self-efficacy — plus an open-ended reflection section. ~10–15 min, explicit
   voluntary/confidential framing, closes with a crisis-resource pointer
   ("if this has raised concerns... contact a mental health support service").
4. **Wholistic Wellness Self-Assessment — Precaution Adoption Process Model
   (PAPM)** (`docs/foundational/05-...`) — fully de-identified/anonymous, no
   PII at all. 10 questions across wellness domains (physical activity,
   sleep, nutrition, alcohol, tobacco, substances, stress management, social
   wellness, preventive care), each scored 1–5 and mapped to one of PAPM's
   6 stages (Unaware → Unengaged → Undecided → Decided to act → Acting →
   Maintenance). Includes a composite scoring formula (avg of Q2–Q10, Q1 is a
   self-perception anchor excluded from the composite) and a disclaimer that
   it's a reflection tool, not a clinical instrument.

**Product implication:** these four instruments are strong candidates for the
platform's **Individual Assessment** and **Organizational Assessment**
modules, and for **Formative/Outcome Evaluation** tooling — they're
real, theory-grounded (HBM, PAPM) survey designs, not placeholder content.
When digitizing, preserve: the consent gates, the scale-per-question labeling
discipline (survey #3 varies scale type per question — don't flatten this),
the anonymity/de-identification framing (especially survey #4, which is
explicitly zero-PII), and the crisis-resource disclaimer pattern from the
mental wellness questionnaire.

## Design system (from foundational doc)

| Token | Hex | Use |
|---|---|---|
| Deep Ocean Blue | `#0B3D5F` | Headings, primary buttons, footer |
| Teal | `#1F8A8A` | Secondary buttons, accents, links |
| Soft Sage Green | `#7FB069` | Wellness/growth indicators |
| Sunrise Amber | `#E8A87C` | CTAs, highlights, energy |
| Terracotta | `#C38D6B` | Land-based wellness, cultural elements |
| Warm White | `#FAF7F2` | Backgrounds |
| Stone Grey | `#8A8680` | Body text on light, dividers |
| Charcoal | `#1A2530` | Body text, navigation |

Typography: **Fraunces** (display/headlines), **DM Sans** (body/UI),
**JetBrains Mono** (data/indicators). Duotone rounded icons (Phosphor/Lucide),
1.5px stroke, 16–24px card radius, WCAG 2.2 AA minimum (AAA on body text),
`prefers-reduced-motion` honoured.

## Subscription model

Freemium + sponsored Community Tier so grassroots/Indigenous communities are
never priced out:

| Tier | Price (CAD) | For |
|---|---|---|
| Basic | Free | Individuals, students |
| Professional | $29/mo | Practitioners, educators, clinicians |
| Organization ★ | $299/mo | Schools, clinics, NGOs, public-health units |
| Enterprise | Custom, from $2,500/mo | Health authorities, ministries |
| Community Tier | Free/sponsored | Grassroots, Indigenous communities, LMICs |

## 14 identified weaknesses → built-in mitigations

Full table in `docs/foundational/01-...`. Highest-relevance ones for
engineering decisions: **(1) AI hallucination** → RAG grounded in a curated
evidence library, every AI output cited and labeled "AI-suggested — verify
with practitioner," clinician review queue. **(2) Cultural appropriation in
Land-Based Wellness** → co-developed with an Indigenous Advisory Council,
OCAP® enforced, community-controlled access. **(3) Privacy/data governance**
→ privacy-by-design, data minimization, granular consent, PHIPA/HIPAA/GDPR,
data residency options. **(9) Weak crisis-content moderation** → crisis
flows surface local helplines, trauma-informed language (this shows up
concretely in survey #3's closing note). **(5) Digital divide** →
offline-capable PWA, SMS/USSD fallback, low-bandwidth mode.

## Open questions from the foundational doc (unanswered — ask user before big decisions)

- Geographic scope for MVP (Canada-wide? specific provinces first?)
- Priority languages beyond English (French confirmed likely given Canada; others TBD)
- Status of an actual Indigenous Advisory Council (exists, or needs to be recommended?)
- Funding model (VC / grant-funded / government contract / social enterprise)
- EHR/LMS integration needs (Epic, Cerner, OSCAR, Panorama)
- Compliance scope at launch (PHIPA/PIPEDA confirmed for Canada; HIPAA/GDPR/APP if expanding)
- AI model strategy (commercial LLM vs. open-source vs. fine-tuned)

---
*This file is a working reference distilled from the original documents in
`docs/foundational/`. Always defer to the originals for exact wording when
precision matters (e.g. legal/consent language, exact question text).*
