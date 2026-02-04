import { defineConfig } from "prisma/config";

// Determine which datasource based on environment or current working directory
const determineDatasource = () => {
  const pwdEnv = process.env.PWD || process.cwd();
  
  // Return the appropriate datasource based on context
  return {
    url: process.env.DATABASE_URL_UNIVERSIDAD_MIGRATE || 
         process.env.DATABASE_URL_USUARIOS_MIGRATE ||
         process.env.DATABASE_URL_REPORTES_MIGRATE ||
         process.env.DATABASE_URL_UNIVERSIDAD,
  };
};

export default defineConfig({
  datasource: determineDatasource(),
});

