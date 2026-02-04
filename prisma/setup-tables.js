require('dotenv').config({ path: `.env.local` });
const { Pool } = require('pg');

async function createSchemaAndTables(dbName, urlKey, schemaName) {
  const pool = new Pool({
    connectionString: process.env[urlKey],
  });

  try {
    console.log(`🔧 Configurando base de datos ${dbName}...`);
    
    // Primero crear el schema
    await pool.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName};`);
    console.log(`✅ Schema "${schemaName}" creado`);
    
    return pool;
  } catch (error) {
    console.error(`❌ Error en ${dbName}:`, error.message);
    await pool.end();
    return null;
  }
}

async function setupDatabase() {
  try {
    // Crear schemas y tablas para USUARIOS
    let pool = await createSchemaAndTables('USUARIOS', 'DATABASE_URL_USUARIOS_MIGRATE', 'usuarios');
    if (pool) {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios."User" (
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
      
      await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios."Token" (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES usuarios."User"(id) ON DELETE CASCADE,
          token VARCHAR(255) UNIQUE NOT NULL,
          tipo VARCHAR(255),
          "expiresAt" TIMESTAMP NOT NULL,
          "createdAt" TIMESTAMP DEFAULT NOW()
        );
      `);
      
      await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios."AuditoriaLogin" (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES usuarios."User"(id) ON DELETE CASCADE,
          "ipAddress" VARCHAR(255),
          "userAgent" TEXT,
          exitoso BOOLEAN,
          razon TEXT,
          "fechaIntento" TIMESTAMP DEFAULT NOW()
        );
      `);
      
      await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios."Permiso" (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(255) UNIQUE NOT NULL,
          descripcion TEXT,
          "createdAt" TIMESTAMP DEFAULT NOW()
        );
      `);
      
      await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios."RolPermiso" (
          id SERIAL PRIMARY KEY,
          rol VARCHAR(255),
          "permisoId" INTEGER,
          "createdAt" TIMESTAMP DEFAULT NOW()
        );
      `);
      
      console.log('✅ Tablas de usuarios creadas exitosamente\n');
      await pool.end();
    }

    // Crear schemas y tablas para REPORTES
    pool = await createSchemaAndTables('REPORTES', 'DATABASE_URL_REPORTES_MIGRATE', 'reportes');
    if (pool) {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS reportes."ReporteAcademico" (
          id SERIAL PRIMARY KEY,
          "estudianteId" INTEGER,
          "nombreEstudiante" VARCHAR(255),
          carrera VARCHAR(255),
          promedio FLOAT,
          "creditosAprobados" INTEGER,
          "creditosReprobados" INTEGER,
          "tasaAprobacion" FLOAT,
          semestre VARCHAR(255),
          "fechaGeneracion" TIMESTAMP DEFAULT NOW()
        );
      `);
      
      await pool.query(`
        CREATE TABLE IF NOT EXISTS reportes."ReporteDocente" (
          id SERIAL PRIMARY KEY,
          "docenteId" INTEGER,
          "nombreDocente" VARCHAR(255),
          especialidad VARCHAR(255),
          "materiasImpartidas" INTEGER,
          "estudiantesAtendidos" INTEGER,
          "calificacionPromedio" FLOAT,
          semestre VARCHAR(255),
          "fechaGeneracion" TIMESTAMP DEFAULT NOW()
        );
      `);
      
      await pool.query(`
        CREATE TABLE IF NOT EXISTS reportes."ReporteCarrera" (
          id SERIAL PRIMARY KEY,
          "carreraId" INTEGER,
          "nombreCarrera" VARCHAR(255),
          "totalEstudiantes" INTEGER,
          "totalDocentes" INTEGER,
          "totalMaterias" INTEGER,
          "tasaAprobacionGral" FLOAT,
          semestre VARCHAR(255),
          "fechaGeneracion" TIMESTAMP DEFAULT NOW()
        );
      `);
      
      await pool.query(`
        CREATE TABLE IF NOT EXISTS reportes."Estadistica" (
          id SERIAL PRIMARY KEY,
          tipo VARCHAR(255),
          "referenceId" INTEGER,
          metrica VARCHAR(255),
          valor FLOAT,
          fecha TIMESTAMP DEFAULT NOW()
        );
      `);
      
      console.log('✅ Tablas de reportes creadas exitosamente\n');
      await pool.end();
    }

  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

setupDatabase();
