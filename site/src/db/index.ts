import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * Lazy by design: only API routes touch the database. A missing connection
 * must degrade the form endpoint, not static pages or the production build.
 */
const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __preventaPostgresqlPool?: Pool;
};

function getPool(): Pool {
  if (!databaseUrl) throw new Error("DATABASE_URL is required");
  if (globalForDb.__preventaPostgresqlPool) return globalForDb.__preventaPostgresqlPool;
  const pool = new Pool({ connectionString: databaseUrl });
  if (process.env.NODE_ENV !== "production") globalForDb.__preventaPostgresqlPool = pool;
  return pool;
}

export const isDatabaseConfigured = () => Boolean(databaseUrl);

export const db: ReturnType<typeof drizzle> = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop, receiver) {
    const real = drizzle(getPool());
    return Reflect.get(real, prop, receiver);
  },
});
