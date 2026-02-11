require('dotenv').config({ path: `${__dirname}/../.env` });

const { PrismaClient } = require('@prisma/client-usuarios');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_USUARIOS_MIGRATE || process.env.DATABASE_URL_USUARIOS,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function createTablesIfNotExist() {
  try {
    await prisma.$executeRawUnsafe(`
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
      
      CREATE TABLE IF NOT EXISTS usuarios."Token" (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES usuarios."User"(id) ON DELETE CASCADE,
        token VARCHAR(255) UNIQUE NOT NULL,
        tipo VARCHAR(255),
        "expiresAt" TIMESTAMP NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS usuarios."AuditoriaLogin" (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES usuarios."User"(id) ON DELETE CASCADE,
        "ipAddress" VARCHAR(255),
        "userAgent" TEXT,
        exitoso BOOLEAN,
        razon TEXT,
        "fechaIntento" TIMESTAMP DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS usuarios."Permiso" (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) UNIQUE NOT NULL,
        descripcion TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS usuarios."RolPermiso" (
        id SERIAL PRIMARY KEY,
        rol VARCHAR(255),
        "permisoId" INTEGER,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
    `);
  } catch (e) {
    // Ignore if tables already exist
  }
}

async function main() {
  console.log('🌱 Iniciando seeding BD3: USUARIOS...');

  // Crear tablas si no existen
  await createTablesIfNotExist();

  // Limpiar datos existentes
  console.log('🗑️ Limpiando datos existentes...');
  try {
    await prisma.auditoriaLogin.deleteMany();
    await prisma.token.deleteMany();
    await prisma.rolPermiso.deleteMany();
    await prisma.permiso.deleteMany();
    await prisma.user.deleteMany();
  } catch (e) {
    console.log('⚠️ Algunas tablas aún no existen, ignorando borrado inicial');
  }

  // Crear Permisos
  console.log('🔐 Creando permisos...');
  const permisoCrearCarrera = await prisma.permiso.create({
    data: { nombre: 'crear_carrera', descripcion: 'Crear nueva carrera' },
  });

  const permisoEditarCarrera = await prisma.permiso.create({
    data: { nombre: 'editar_carrera', descripcion: 'Editar carrera existente' },
  });

  const permisoVerReportes = await prisma.permiso.create({
    data: { nombre: 'ver_reportes', descripcion: 'Ver reportes académicos' },
  });

  // Crear Rol-Permisos
  console.log('👥 Asignando permisos a roles...');
  await prisma.rolPermiso.create({
    data: { rol: 'admin', permisoId: permisoCrearCarrera.id },
  });

  await prisma.rolPermiso.create({
    data: { rol: 'admin', permisoId: permisoEditarCarrera.id },
  });

  await prisma.rolPermiso.create({
    data: { rol: 'admin', permisoId: permisoVerReportes.id },
  });

  await prisma.rolPermiso.create({
    data: { rol: 'teacher', permisoId: permisoVerReportes.id },
  });

  // Crear Usuarios
  console.log('👤 Creando usuarios...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      email: 'admin@universidad.com',
      password: hashedPassword,
      nombre: 'Administrador',
      apellido: 'Sistema',
      role: 'admin',
      activo: true,
      verificado: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'profesor@universidad.com',
      password: hashedPassword,
      nombre: 'Profesor',
      apellido: 'Principal',
      role: 'teacher',
      activo: true,
      verificado: true,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'estudiante@universidad.com',
      password: hashedPassword,
      nombre: 'Estudiante',
      apellido: 'Principal',
      role: 'student',
      activo: true,
      verificado: true,
    },
  });

  console.log('✅ Seeding completado exitosamente!');
  console.log('\n📊 Resumen de datos creados (BD: USUARIOS):');
  console.log(`  - 3 usuarios`);
  console.log(`  - 3 permisos`);
  console.log(`  - 4 rol-permisos`);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
