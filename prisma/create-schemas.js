require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

async function createSchemas() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL_UNIVERSIDAD_MIGRATE,
  });

  try {
    console.log('🔧 Creando schemas...');
    
    await pool.query('CREATE SCHEMA IF NOT EXISTS universidad;');
    console.log('✅ Schema "universidad" creado');
    
    await pool.query('CREATE SCHEMA IF NOT EXISTS usuarios;');
    console.log('✅ Schema "usuarios" creado');
    
    await pool.query('CREATE SCHEMA IF NOT EXISTS reportes;');
    console.log('✅ Schema "reportes" creado');
    
    console.log('\n✅ Todos los schemas fueron creados exitosamente');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

createSchemas();
