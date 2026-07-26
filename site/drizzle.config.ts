import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required to run drizzle-kit");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  schemaFilter: ["phronesis_ai"],
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
