require('dotenv').config({ path: '.env.local' });
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function migrateDatabases() {
  try {
    console.log('🔄 Migrando base de datos USUARIOS...');
    process.env.DATABASE_URL = process.env.DATABASE_URL_USUARIOS_MIGRATE;
    await execAsync('npx prisma migrate deploy --schema=prisma/schema-usuarios.prisma', {
      cwd: process.cwd(),
      env: process.env,
    });
    console.log('✅ Base de datos USUARIOS migrada\n');
  } catch (error) {
    console.log('⚠️ USUARIOS:', error.message.substring(0, 200));
  }

  try {
    console.log('🔄 Migrando base de datos REPORTES...');
    process.env.DATABASE_URL = process.env.DATABASE_URL_REPORTES_MIGRATE;
    await execAsync('npx prisma migrate deploy --schema=prisma/schema-reportes.prisma', {
      cwd: process.cwd(),
      env: process.env,
    });
    console.log('✅ Base de datos REPORTES migrada\n');
  } catch (error) {
    console.log('⚠️ REPORTES:', error.message.substring(0, 200));
  }
}

migrateDatabases();
