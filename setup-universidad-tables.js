require('dotenv').config({ path: `${__dirname}/.env` });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_UNIVERSIDAD,
});

async function createTablas() {
  const client = await pool.connect();
  try {
    console.log('🔧 Creando tablas de universidad...');

    // Crear tabla Carrera
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Carrera" (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        duracion INT NOT NULL
      );
    `);
    console.log('✅ Tabla Carrera creada');

    // Crear tabla Ciclo
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Ciclo" (
        id SERIAL PRIMARY KEY,
        numero INT NOT NULL,
        "carreraId" INT NOT NULL REFERENCES "Carrera"(id)
      );
    `);
    console.log('✅ Tabla Ciclo creada');

    // Crear tabla Estudiante
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Estudiante" (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        apellido VARCHAR(255) NOT NULL,
        correo VARCHAR(255) UNIQUE NOT NULL,
        activo BOOLEAN DEFAULT true,
        "carreraId" INT NOT NULL REFERENCES "Carrera"(id),
        "cicloId" INT NOT NULL REFERENCES "Ciclo"(id)
      );
    `);
    console.log('✅ Tabla Estudiante creada');

    // Crear tabla Docente
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Docente" (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        apellido VARCHAR(255) NOT NULL,
        especialidad VARCHAR(255) NOT NULL,
        activo BOOLEAN DEFAULT true,
        "tiempoCompleto" BOOLEAN DEFAULT false,
        "carreraId" INT NOT NULL REFERENCES "Carrera"(id)
      );
    `);
    console.log('✅ Tabla Docente creada');

    // Crear tabla Materia
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Materia" (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        creditos INT NOT NULL,
        cupo INT DEFAULT 0,
        "carreraId" INT NOT NULL REFERENCES "Carrera"(id),
        "docenteId" INT NOT NULL REFERENCES "Docente"(id)
      );
    `);
    console.log('✅ Tabla Materia creada');

    // Crear tabla Inscripcion
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Inscripcion" (
        id SERIAL PRIMARY KEY,
        "cicloAcademico" VARCHAR(50) NOT NULL,
        "notaFinal" FLOAT,
        "estudianteId" INT NOT NULL REFERENCES "Estudiante"(id),
        "materiaId" INT NOT NULL REFERENCES "Materia"(id)
      );
    `);
    console.log('✅ Tabla Inscripcion creada');

    console.log('✅ ¡Todas las tablas de universidad se crearon exitosamente!');
  } catch (error) {
    console.error('❌ Error al crear las tablas:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

createTablas();
