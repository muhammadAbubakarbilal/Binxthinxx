import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
// Update the import path to the correct relative location of your schema file, for example:
import * as schema from "../shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const db = drizzle(process.env.DATABASE_URL!, { schema });
