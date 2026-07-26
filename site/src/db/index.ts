import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * Lazy by design: the marketing site itself never touches the database —
 * only /api/assessments and /api/health do. Throwing at module *import*
 * time (rather than at first query) took the entire `next build` down
 * when DATABASE_URL was unset, because Next.js's page-data collection
 * imports every route module to inspect its exports. Deferring the throw
 * until something actually queries the DB means a misconfigured or
 * temporarily-unavailable database degrades those two routes, not the
 * whole build or every static page.
 */
const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

function getPool(): Pool {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }
  if (globalForDb.__arenaNextJsPostgresqlPool) {
    return globalForDb.__arenaNextJsPostgresqlPool;
  }
  const pool = new Pool({ connectionString: databaseUrl });
  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
  }
  return pool;
}

export const isDatabaseConfigured = () => Boolean(databaseUrl);

/** Proxy so `db` is only ever touched (and the pool only ever created)
 *  the moment a caller actually invokes a query method on it. */
export const db: ReturnType<typeof drizzle> = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop, receiver) {
    const real = drizzle(getPool());
    return Reflect.get(real, prop, receiver);
  },
});
