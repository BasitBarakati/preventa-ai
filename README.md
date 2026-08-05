# PREVENTA AI

PREVENTA AI is an AI-enabled public-health transformation platform that connects responsible artificial intelligence, situation assessment, evidence, research tools, dashboards, and workforce learning.

**From Public Health Intelligence to Practical Action.**

The production website lives in [`site/`](./site). It is built as an accessible public preview: richer product experiences are interactive where they can remain local and safe, and clearly labelled where secure backend services are not yet connected.

## Stack

- Next.js 16 App Router, React 19, and TypeScript
- Tailwind CSS 4 plus centralized CSS design tokens
- React Three Fiber and Three.js for the hero intelligence ecosystem
- GSAP ScrollTrigger and Lenis for restrained, reduced-motion-aware scroll storytelling
- Framer Motion for the persistent assistant HUD and state transitions
- Recharts for accessible wellbeing pattern visualization
- jsPDF for local, one-click assessment summaries
- Drizzle ORM and PostgreSQL for minimal inquiry capture
- Node's built-in test runner for structural regression checks

## Local development

```bash
cd site
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Copy [`site/.env.example`](./site/.env.example) to `site/.env.local`.

- `NEXT_PUBLIC_SITE_URL` — canonical origin, for example `https://preventa.ai`.
- `DATABASE_URL` — PostgreSQL connection string for the minimal inquiry API.
- `RATE_LIMIT_SECRET` — long random secret used to HMAC network identifiers for rate limiting. Raw addresses are not stored.

Do not place model keys, clinical-system credentials, or sensitive data in public environment variables.

## Commands

```bash
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
npm run start
```

To inspect database changes:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

The public database surface is intentionally limited to the `preventa_ai.inquiries` table. Apply migrations through a reviewed deployment process.

## Information architecture and content editing

Routes, navigation, platform pillars, audience pathways, product labels, and internal-page copy are centralized in [`site/src/lib/site-content.ts`](./site/src/lib/site-content.ts). The catch-all App Router page statically generates every registered path and returns the branded 404 experience for unknown paths.

Homepage composition is in [`site/src/components/HomePage.tsx`](./site/src/components/HomePage.tsx). Shared internal-page composition is in [`site/src/components/GenericPage.tsx`](./site/src/components/GenericPage.tsx).

The homepage includes five connected product pillars, persona-aware context, an interactive six-domain wellbeing assessment, a radar visualization with a table alternative, a locally generated PDF summary, implementation hubs, an Indigenous-governance pathway, research and learning workspaces, and an approved-content AI-assistant preview. These public experiences are deliberately local or illustrative; they do not imply a connected clinical, research, LMS, or AI backend.

When editing health, privacy, governance, accessibility, or Indigenous-health content, retain the explicit limitations and request review from the appropriate subject-matter and community authorities.

## Design system

Tokens live at the top of [`site/src/app/globals.css`](./site/src/app/globals.css):

- Obsidian and deep ink surfaces for institutional depth
- Restrained teal for actions and focus, with limited violet/blue reserved for research and AI signals
- White and cool-grey text with AA contrast targets
- Sora headings, system UI body copy, and a platform-safe monospace stack for data labels
- 4/8-based spacing, consistent radii, elevation, motion, containers, and z-index layers

The interface targets WCAG 2.1 AA with semantic landmarks, keyboard navigation, visible focus, 44px-or-larger touch targets, form labels, error status announcements, reduced-motion support, chart summaries and table alternatives, mobile reflow, and printable assessment summaries.

Reusable homepage primitives live in [`site/src/components/ui/`](./site/src/components/ui/): `GlassCard`, `GlowingButton`, `AnimatedRadarChart`, `AssessmentWizard`, and `FloatingChatHUD`. Global motion orchestration is isolated in `MotionSystem.tsx`; heavy Three.js, chart, PDF, and confetti code is deferred until interaction or use.

## Official logo usage

The official source is the user-provided PREVENTA AI raster logo. Generated derivatives in `site/public/brand/` remove only unused white canvas and resize proportionally. Brand geometry and colours are unchanged.

- `preventa-ai-logo.png` — full official lockup
- `preventa-ai-symbol.png` — official symbol crop for compact placements
- `preventa-ai-icon-{32,192,512}.png` — favicon and app icons
- `preventa-ai-social-preview.png` — Open Graph and social preview

Regenerate derivatives with:

```bash
node scripts/generate-brand-assets.mjs C:\path\to\official-logo.png
```

Do not recolour, redraw, rotate, distort, or stretch the official identity.

## Privacy and security boundaries

- Public assessment interactions run in browser memory and do not transmit responses. The downloadable PDF is generated locally.
- The public AI assistant and research workspaces are approved-content interface previews; no model, vector store, literature database, or prediction service is connected.
- The inquiry form rejects oversized requests, validates fields, uses a honeypot, supports same-origin enforcement, rate-limits with a keyed hash when configured, and never requests health information.
- Security headers include HSTS, CSP, anti-framing, MIME protection, a strict referrer policy, and a restrictive permissions policy.
- Production organization management, session handling, data export/deletion, encryption controls, audit access, incident response, consent records, and Canadian-region hosting require reviewed platform infrastructure.

## Deployment

The site can deploy to any supported Next.js runtime with Node.js and PostgreSQL connectivity. Before release:

1. Set the canonical URL and secrets.
2. Apply the reviewed Drizzle migration.
3. Verify the contact form against the production database.
4. Run typecheck, lint, tests, and a production build.
5. Test keyboard, screen-reader, reduced-motion, print, 375px mobile, tablet, and desktop layouts.
6. Review privacy, terms, AI-transparency, governance, accessibility, and Indigenous-health content with the appropriate authorities.
7. Run a dependency and infrastructure security review.

## Known limitations and future integrations

- No production authentication or user/organization management
- No live retrieval-augmented AI service or multilingual model pipeline; the assistant uses a small approved-content response set and visible limitations
- No clinical advice, diagnosis, or personal-health prediction
- No live research database, model execution, or risk scoring
- No LMS enrolment, certificate issuance, email-report delivery, or PDF service
- No real outcome, customer, partner, or usage metrics
- No CMS; content is version-controlled
- No external analytics by default, preserving a privacy-first public launch

Future integrations should add typed API contracts, background jobs, object storage, organization-level access, approved evidence ingestion, citation verification, human-review queues, accessible report generation, retention controls, audit tooling, and monitored incident-response processes.
