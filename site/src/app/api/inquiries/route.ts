import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { and, count, eq, gte } from "drizzle-orm";
import { db, isDatabaseConfigured } from "@/db";
import { inquiries } from "@/db/schema";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const KINDS = ["access", "demo", "partnership", "governance"] as const;
const RATE_LIMIT_MAX = 6;
const RATE_LIMIT_WINDOW_MINUTES = 20;

const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim() || "";
}

function privateRateLimitKey(request: Request) {
  const ip = clientIp(request);
  const secret = process.env.RATE_LIMIT_SECRET;
  if (!ip || !secret) return null;
  return createHmac("sha256", secret).update(ip).digest("hex");
}

function response(body: object, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) return response({ ok: false, error: "The request is too large." }, 413);

  const origin = request.headers.get("origin");
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (origin && configuredOrigin && new URL(origin).origin !== new URL(configuredOrigin).origin) {
    return response({ ok: false, error: "This request origin is not allowed." }, 403);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return response({ ok: false, error: "The request could not be read." }, 400);
  }

  if (clean(body.website, 200)) return response({ ok: true }, 201);

  const name = clean(body.name, 120);
  const email = clean(body.email, 320).toLowerCase();
  const org = clean(body.org, 200);
  const message = clean(body.message, 1600);
  const kind = KINDS.includes(body.kind as (typeof KINDS)[number]) ? body.kind as (typeof KINDS)[number] : null;
  const consent = body.consent === true || body.consent === "true";

  if (!name) return response({ ok: false, error: "Please add your name." }, 422);
  if (!EMAIL_RE.test(email)) return response({ ok: false, error: "Please add a valid work email." }, 422);
  if (!kind) return response({ ok: false, error: "Please select how we can help." }, 422);
  if (message.length < 12) return response({ ok: false, error: "Please add a little more context to your request." }, 422);
  if (!consent) return response({ ok: false, error: "Consent is required so we can respond." }, 422);
  if (!isDatabaseConfigured()) return response({ ok: false, error: "The request service is not configured yet. Please try again later." }, 503);

  const ipHash = privateRateLimitKey(request);

  try {
    if (ipHash) {
      const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000);
      const [recent] = await db.select({ total: count() }).from(inquiries).where(and(eq(inquiries.ipHash, ipHash), gte(inquiries.createdAt, since)));
      if (recent.total >= RATE_LIMIT_MAX) return response({ ok: false, error: "Too many requests. Please try again later." }, 429);
    }

    await db.insert(inquiries).values({ name, email, org: org || null, kind, message, ipHash }).returning({ id: inquiries.id });
    return response({ ok: true }, 201);
  } catch {
    return response({ ok: false, error: "We could not record your request. Please try again." }, 500);
  }
}
