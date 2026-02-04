require('dotenv').config({ path: `${__dirname}/../.env.local` });

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_UNIVERSIDAD_MIGRATE || process.env.DATABASE_URL_UNIVERSIDAD,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seeding BD1: UNIVERSIDAD...');

  // Limpiar datos existentes
  console.log('🗑️ Limpiando datos existentes...');
  await prisma.inscripcion.deleteMany();
  await prisma.materia.deleteMany();
  await prisma.docente.deleteMany();
  await prisma.estudiante.deleteMany();
  await prisma.ciclo.deleteMany();
  await prisma.carrera.deleteMany();

  // Crear Carreras
  console.log('🎓 Creando carreras...');
  const carrera1 = await prisma.carrera.create({
    data: {
      nombre: 'Ingeniería en Sistemas',
      duracion: 5,
    },
  });

  const carrera2 = await prisma.carrera.create({
    data: {
      nombre: 'Ingeniería Civil',
      duracion: 5,
    },
  });

  const carrera3 = await prisma.carrera.create({
    data: {
      nombre: 'Administración de Empresas',
      duracion: 4,
    },
  });

  // Crear Ciclos
  console.log('📚 Creando ciclos...');
  const ciclo1 = await prisma.ciclo.create({
    data: {
      numero: 1,
      carreraId: carrera1.id,
    },
  });

  const ciclo2 = await prisma.ciclo.create({
    data: {
      numero: 2,
      carreraId: carrera1.id,
    },
  });

  const ciclo3 = await prisma.ciclo.create({
    data: {
      numero: 1,
      carreraId: carrera2.id,
    },
  });

  const ciclo4 = await prisma.ciclo.create({
    data: {
      numero: 1,
      carreraId: carrera3.id,
    },
  });

  // Crear Docentes
  console.log('🏫 Creando docentes...');
  const docente1 = await prisma.docente.create({
    data: {
      nombre: 'Juan',
      apellido: 'García',
      especialidad: 'Programación',
      activo: true,
      tiempoCompleto: true,
      carreraId: carrera1.id,
    },
  });

  const docente2 = await prisma.docente.create({
    data: {
      nombre: 'María',
      apellido: 'López',
      especialidad: 'Bases de Datos',
      activo: true,
      tiempoCompleto: true,
      carreraId: carrera1.id,
    },
  });

  const docente3 = await prisma.docente.create({
    data: {
      nombre: 'Carlos',
      apellido: 'Martínez',
      especialidad: 'Estructuras',
      activo: true,
      tiempoCompleto: false,
      carreraId: carrera2.id,
    },
  });

  const docente4 = await prisma.docente.create({
    data: {
      nombre: 'Ana',
      apellido: 'Rodríguez',
      especialidad: 'Contabilidad',
      activo: true,
      tiempoCompleto: true,
      carreraId: carrera3.id,
    },
  });

  // Crear Materias
  console.log('📖 Creando materias...');
  const materia1 = await prisma.materia.create({
    data: {
      nombre: 'Introducción a la Programación',
      creditos: 4,
      cupo: 30,
      carreraId: carrera1.id,
      docenteId: docente1.id,
    },
  });

  const materia2 = await prisma.materia.create({
    data: {
      nombre: 'Bases de Datos I',
      creditos: 3,
      cupo: 25,
      carreraId: carrera1.id,
      docenteId: docente2.id,
    },
  });

  const materia3 = await prisma.materia.create({
    data: {
      nombre: 'Programación Orientada a Objetos',
      creditos: 4,
      cupo: 28,
      carreraId: carrera1.id,
      docenteId: docente1.id,
    },
  });

  const materia4 = await prisma.materia.create({
    data: {
      nombre: 'Estructuras de Concreto',
      creditos: 4,
      cupo: 20,
      carreraId: carrera2.id,
      docenteId: docente3.id,
    },
  });

  const materia5 = await prisma.materia.create({
    data: {
      nombre: 'Contabilidad General',
      creditos: 3,
      cupo: 35,
      carreraId: carrera3.id,
      docenteId: docente4.id,
    },
  });

  const materia6 = await prisma.materia.create({
    data: {
      nombre: 'Contabilidad de Costos',
      creditos: 3,
      cupo: 30,
      carreraId: carrera3.id,
      docenteId: docente4.id,
    },
  });

  // Crear Estudiantes
  console.log('👨‍🎓 Creando estudiantes...');
  const estudiante1 = await prisma.estudiante.create({
    data: {
      nombre: 'Pedro',
      apellido: 'García',
      correo: 'pedro.garcia@estudiante.com',
      activo: true,
      carreraId: carrera1.id,
      cicloId: ciclo1.id,
    },
  });

  const estudiante2 = await prisma.estudiante.create({
    data: {
      nombre: 'Sofia',
      apellido: 'López',
      correo: 'sofia.lopez@estudiante.com',
      activo: true,
      carreraId: carrera1.id,
      cicloId: ciclo1.id,
    },
  });

  const estudiante3 = await prisma.estudiante.create({
    data: {
      nombre: 'Diego',
      apellido: 'Martínez',
      correo: 'diego.martinez@estudiante.com',
      activo: true,
      carreraId: carrera1.id,
      cicloId: ciclo2.id,
    },
  });

  const estudiante4 = await prisma.estudiante.create({
    data: {
      nombre: 'Laura',
      apellido: 'Rodríguez',
      correo: 'laura.rodriguez@estudiante.com',
      activo: true,
      carreraId: carrera2.id,
      cicloId: ciclo3.id,
    },
  });

  const estudiante5 = await prisma.estudiante.create({
    data: {
      nombre: 'Miguel',
      apellido: 'Sánchez',
      correo: 'miguel.sanchez@estudiante.com',
      activo: true,
      carreraId: carrera3.id,
      cicloId: ciclo4.id,
    },
  });

  const estudiante6 = await prisma.estudiante.create({
    data: {
      nombre: 'Carolina',
      apellido: 'Pérez',
      correo: 'carolina.perez@estudiante.com',
      activo: false,
      carreraId: carrera3.id,
      cicloId: ciclo4.id,
    },
  });

  // Crear Inscripciones
  console.log('📝 Creando inscripciones...');
  const inscripcion1 = await prisma.inscripcion.create({
    data: {
      cicloAcademico: '2024-01',
      notaFinal: 8.5,
      estudianteId: estudiante1.id,
      materiaId: materia1.id,
    },
  });

  const inscripcion2 = await prisma.inscripcion.create({
    data: {
      cicloAcademico: '2024-01',
      notaFinal: 9.2,
      estudianteId: estudiante1.id,
      materiaId: materia2.id,
    },
  });

  const inscripcion3 = await prisma.inscripcion.create({
    data: {
      cicloAcademico: '2024-01',
      notaFinal: 7.8,
      estudianteId: estudiante2.id,
      materiaId: materia1.id,
    },
  });

  const inscripcion4 = await prisma.inscripcion.create({
    data: {
      cicloAcademico: '2024-01',
      notaFinal: 8.0,
      estudianteId: estudiante2.id,
      materiaId: materia2.id,
    },
  });

  const inscripcion5 = await prisma.inscripcion.create({
    data: {
      cicloAcademico: '2024-02',
      notaFinal: 8.9,
      estudianteId: estudiante3.id,
      materiaId: materia3.id,
    },
  });

  const inscripcion6 = await prisma.inscripcion.create({
    data: {
      cicloAcademico: '2024-01',
      notaFinal: null,
      estudianteId: estudiante4.id,
      materiaId: materia4.id,
    },
  });

  const inscripcion7 = await prisma.inscripcion.create({
    data: {
      cicloAcademico: '2024-01',
      notaFinal: 8.3,
      estudianteId: estudiante5.id,
      materiaId: materia5.id,
    },
  });

  const inscripcion8 = await prisma.inscripcion.create({
    data: {
      cicloAcademico: '2024-01',
      notaFinal: 7.9,
      estudianteId: estudiante5.id,
      materiaId: materia6.id,
    },
  });

  console.log('✅ Seeding completado exitosamente!');
  console.log('\n📊 Resumen de datos creados:');
  console.log(`  - ${3} usuarios`);
  console.log(`  - ${3} carreras`);
  console.log(`  - ${4} ciclos`);
  console.log(`  - ${4} docentes`);
  console.log(`  - ${6} materias`);
  console.log(`  - ${6} estudiantes`);
  console.log(`  - ${8} inscripciones`);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
