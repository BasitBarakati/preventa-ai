import { pgSchema, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Dedicated Postgres schema for Phronesis AI. This app shares a Supabase
 * instance with other projects on the same account, so all Phronesis
 * tables live under their own schema for clean logical separation —
 * no risk of name collisions with unrelated products' tables.
 */
export const phronesis = pgSchema("phronesis_ai");

/**
 * Inquiries — every "Start Free Assessment" request and footer newsletter
 * subscription lands here. `kind` distinguishes the two flows so the
 * waitlist counter and CRM exports can split them cleanly.
 */
export const inquiries = phronesis.table("inquiries", {
  id: serial("id").primaryKey(),
  kind: text("kind").notNull().default("assessment"), // "assessment" | "subscribe"
  name: text("name"),
  email: text("email").notNull(),
  org: text("org"),
  assessmentType: text("assessment_type"), // individual | family | community | organizational
  population: text("population"),
  message: text("message"),
  ipAddress: text("ip_address"), // rate-limiting only; never displayed or exported
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Inquiry = typeof inquiries.$inferSelect;
