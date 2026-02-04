import { defineConfig } from "prisma/config";

export default defineConfig({
  datasource: {
    url: { fromEnv: "DATABASE_URL_REPORTES_MIGRATE" } as any,
  },
});
