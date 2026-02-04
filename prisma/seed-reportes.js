require('dotenv').config({ path: `${__dirname}/../.env.local` });

const { PrismaClient } = require('@prisma/client-reportes');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_REPORTES_MIGRATE || process.env.DATABASE_URL_REPORTES,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seeding BD2: REPORTES...');

  // Limpiar datos existentes
  console.log('🗑️ Limpiando datos existentes...');
  await prisma.estadistica.deleteMany();
  await prisma.reporteCarrera.deleteMany();
  await prisma.reporteDocente.deleteMany();
  await prisma.reporteAcademico.deleteMany();

  // Crear Reportes Académicos
  console.log('📊 Creando reportes académicos...');
  await prisma.reporteAcademico.create({
    data: {
      estudianteId: 1,
      nombreEstudiante: 'Pedro García',
      carrera: 'Ingeniería en Sistemas',
      promedio: 8.5,
      creditosAprobados: 45,
      creditosReprobados: 0,
      tasaAprobacion: 100,
      semestre: '2024-01',
    },
  });

  await prisma.reporteAcademico.create({
    data: {
      estudianteId: 2,
      nombreEstudiante: 'Sofia López',
      carrera: 'Ingeniería en Sistemas',
      promedio: 8.9,
      creditosAprobados: 48,
      creditosReprobados: 0,
      tasaAprobacion: 100,
      semestre: '2024-01',
    },
  });

  // Crear Reportes Docentes
  console.log('👨‍🏫 Creando reportes de docentes...');
  await prisma.reporteDocente.create({
    data: {
      docenteId: 1,
      nombreDocente: 'Juan García',
      especialidad: 'Programación',
      materiasImpartidas: 3,
      estudiantesAtendidos: 85,
      calificacionPromedio: 8.7,
      semestre: '2024-01',
    },
  });

  await prisma.reporteDocente.create({
    data: {
      docenteId: 2,
      nombreDocente: 'María López',
      especialidad: 'Bases de Datos',
      materiasImpartidas: 2,
      estudiantesAtendidos: 50,
      calificacionPromedio: 8.5,
      semestre: '2024-01',
    },
  });

  // Crear Reportes de Carrera
  console.log('🎓 Creando reportes de carreras...');
  await prisma.reporteCarrera.create({
    data: {
      carreraId: 1,
      nombreCarrera: 'Ingeniería en Sistemas',
      totalEstudiantes: 120,
      totalDocentes: 8,
      totalMaterias: 24,
      tasaAprobacionGral: 92.5,
      semestre: '2024-01',
    },
  });

  await prisma.reporteCarrera.create({
    data: {
      carreraId: 2,
      nombreCarrera: 'Ingeniería Civil',
      totalEstudiantes: 95,
      totalDocentes: 6,
      totalMaterias: 20,
      tasaAprobacionGral: 88.3,
      semestre: '2024-01',
    },
  });

  // Crear Estadísticas
  console.log('📈 Creando estadísticas...');
  await prisma.estadistica.create({
    data: {
      tipo: 'ESTUDIANTE',
      referenceId: 1,
      metrica: 'promedio_general',
      valor: 8.5,
    },
  });

  await prisma.estadistica.create({
    data: {
      tipo: 'CARRERA',
      referenceId: 1,
      metrica: 'tasa_aprobacion',
      valor: 92.5,
    },
  });

  await prisma.estadistica.create({
    data: {
      tipo: 'DOCENTE',
      referenceId: 1,
      metrica: 'calificacion_promedio',
      valor: 8.7,
    },
  });

  console.log('✅ Seeding completado exitosamente!');
  console.log('\n📊 Resumen de datos creados (BD: REPORTES):');
  console.log(`  - 2 reportes académicos`);
  console.log(`  - 2 reportes de docentes`);
  console.log(`  - 2 reportes de carreras`);
  console.log(`  - 3 estadísticas`);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
