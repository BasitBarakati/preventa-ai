import { pgSchema, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Dedicated Postgres schema for PREVENTA AI. The public website stores only
 * minimal contact-request data; product and health-data schemas are not part
 * of this public implementation.
 */
export const preventa = pgSchema("preventa_ai");

/**
 * Human-reviewed access, demo, partnership, and governance requests.
 * Do not add health or patient fields to this table.
 */
export const inquiries = preventa.table("inquiries", {
  id: serial("id").primaryKey(),
  kind: text("kind").notNull().default("access"),
  name: text("name"),
  email: text("email").notNull(),
  org: text("org"),
  message: text("message"),
  ipHash: text("ip_hash"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Inquiry = typeof inquiries.$inferSelect;
