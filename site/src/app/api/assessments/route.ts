import { NextResponse } from "next/server";
import { and, count, eq, gte } from "drizzle-orm";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const KINDS = ["assessment", "subscribe"] as const;
const TYPES = ["individual", "family", "community", "organizational"];

const RATE_LIMIT_MAX = 8;
const RATE_LIMIT_WINDOW_MINUTES = 15;

const clamp = (v: unknown, n: number) =>
  typeof v === "string" ? v.trim().slice(0, n) : undefined;

function clientIp(req: Request): string | undefined {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || undefined;
}

/**
 * POST /api/assessments
 * Records a free-assessment request or a newsletter subscription.
 * Human-validated, privacy-by-design: we store the minimum needed.
 * Rate-limited per IP so the public form can't be used to spam the
 * inquiries table or flood the team's inbox.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const kind = KINDS.includes(body.kind as (typeof KINDS)[number])
    ? (body.kind as (typeof KINDS)[number])
    : null;
  const email = clamp(body.email, 320);
  const name = clamp(body.name, 120);

  if (!kind || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required." },
      { status: 422 },
    );
  }
  if (kind === "assessment" && !name) {
    return NextResponse.json({ ok: false, error: "Please add your name." }, { status: 422 });
  }

  const assessmentType =
    kind === "assessment" && TYPES.includes(body.assessmentType as string)
      ? (body.assessmentType as string)
      : null;

  const ip = clientIp(req);

  try {
    if (ip) {
      const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000);
      const [recent] = await db
        .select({ n: count() })
        .from(inquiries)
        .where(and(eq(inquiries.ipAddress, ip), gte(inquiries.createdAt, since)));
      if (recent.n >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          { ok: false, error: "Too many requests. Please try again shortly." },
          { status: 429, headers: { "Retry-After": String(RATE_LIMIT_WINDOW_MINUTES * 60) } },
        );
      }
    }

    const [row] = await db
      .insert(inquiries)
      .values({
        kind,
        name: name ?? null,
        email: email.toLowerCase(),
        org: clamp(body.org, 200) ?? null,
        assessmentType,
        population: clamp(body.population, 160) ?? null,
        message: clamp(body.message, 1200) ?? null,
        ipAddress: ip ?? null,
      })
      .returning({ id: inquiries.id });
    return NextResponse.json({ ok: true, id: row.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not record your request. Please try again." },
      { status: 500 },
    );
  }
}

/** GET /api/assessments — waitlist counters (public, aggregate only). */
export async function GET() {
  try {
    const [total] = await db.select({ n: count() }).from(inquiries);
    const [assessments] = await db
      .select({ n: count() })
      .from(inquiries)
      .where(eq(inquiries.kind, "assessment"));
    return NextResponse.json({ total: total.n, assessments: assessments.n });
  } catch {
    return NextResponse.json({ total: null, assessments: null });
  }
}
