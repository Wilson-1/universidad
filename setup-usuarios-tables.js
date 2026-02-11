require('dotenv').config({ path: `${__dirname}/.env` });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_USUARIOS,
});

async function recreateTables() {
  const client = await pool.connect();
  try {
    console.log('🔧 Limpiando y recreando tablas de usuarios...');

    // Primero, eliminar las tablas en caso de que existan
    await client.query(`DROP TABLE IF EXISTS "RolPermiso" CASCADE`);
    await client.query(`DROP TABLE IF EXISTS "Permiso" CASCADE`);
    await client.query(`DROP TABLE IF EXISTS "AuditoriaLogin" CASCADE`);
    await client.query(`DROP TABLE IF EXISTS "Token" CASCADE`);
    await client.query(`DROP TABLE IF EXISTS "User" CASCADE`);

    console.log('🗑️ Tablas anteriores eliminadas');

    // Crear tabla User
    await client.query(`
      CREATE TABLE "User" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        nombre VARCHAR(255),
        apellido VARCHAR(255),
        role VARCHAR(255) DEFAULT 'student',
        activo BOOLEAN DEFAULT true,
        verificado BOOLEAN DEFAULT false,
        "fechaCreacion" TIMESTAMP DEFAULT NOW(),
        "fechaActualizacion" TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Tabla User creada');

    // Crear tabla Token
    await client.query(`
      CREATE TABLE "Token" (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES "User"(id) ON DELETE CASCADE,
        token VARCHAR(255) UNIQUE NOT NULL,
        tipo VARCHAR(255),
        "expiresAt" TIMESTAMP NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Tabla Token creada');

    // Crear tabla AuditoriaLogin
    await client.query(`
      CREATE TABLE "AuditoriaLogin" (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES "User"(id) ON DELETE CASCADE,
        "ipAddress" VARCHAR(255),
        "userAgent" TEXT,
        exitoso BOOLEAN,
        razon TEXT,
        "fechaIntento" TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Tabla AuditoriaLogin creada');

    // Crear tabla Permiso
    await client.query(`
      CREATE TABLE "Permiso" (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) UNIQUE NOT NULL,
        descripcion TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Tabla Permiso creada');

    // Crear tabla RolPermiso
    await client.query(`
      CREATE TABLE "RolPermiso" (
        id SERIAL PRIMARY KEY,
        rol VARCHAR(255),
        "permisoId" INTEGER,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Tabla RolPermiso creada');

    console.log('✅ ¡Todas las tablas de usuarios se recrearon exitosamente!');
  } catch (error) {
    console.error('❌ Error al crear las tablas:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

recreateTables();
