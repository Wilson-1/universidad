require('dotenv').config({ path: `${__dirname}/.env` });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_REPORTES,
});

async function createTables() {
  const client = await pool.connect();
  try {
    console.log('🔧 Creando tablas de reportes...');

    // Crear tabla ReporteAcademico
    await client.query(`
      CREATE TABLE IF NOT EXISTS "ReporteAcademico" (
        id SERIAL PRIMARY KEY,
        "estudianteId" INT,
        "nombreEstudiante" VARCHAR(255),
        carrera VARCHAR(255),
        promedio FLOAT,
        "creditosAprobados" INT,
        "creditosReprobados" INT,
        "tasaAprobacion" FLOAT,
        semestre VARCHAR(50),
        "fechaGeneracion" TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Tabla ReporteAcademico creada');

    // Crear tabla ReporteDocente
    await client.query(`
      CREATE TABLE IF NOT EXISTS "ReporteDocente" (
        id SERIAL PRIMARY KEY,
        "docenteId" INT,
        "nombreDocente" VARCHAR(255),
        especialidad VARCHAR(255),
        "materiasImpartidas" INT,
        "estudiantesAtendidos" INT,
        "calificacionPromedio" FLOAT,
        semestre VARCHAR(50),
        "fechaGeneracion" TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Tabla ReporteDocente creada');

    // Crear tabla ReporteCarrera
    await client.query(`
      CREATE TABLE IF NOT EXISTS "ReporteCarrera" (
        id SERIAL PRIMARY KEY,
        "carreraId" INT,
        "nombreCarrera" VARCHAR(255),
        "totalEstudiantes" INT,
        "totalDocentes" INT,
        "totalMaterias" INT,
        "tasaAprobacionGral" FLOAT,
        semestre VARCHAR(50),
        "fechaGeneracion" TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Tabla ReporteCarrera creada');

    // Crear tabla Estadistica
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Estadistica" (
        id SERIAL PRIMARY KEY,
        tipo VARCHAR(50),
        "referenceId" INT,
        metrica VARCHAR(255),
        valor FLOAT,
        fecha TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Tabla Estadistica creada');

    console.log('✅ ¡Todas las tablas se crearon exitosamente!');
  } catch (error) {
    console.error('❌ Error al crear las tablas:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

createTables();
