-- AlterTable
ALTER TABLE "Docente" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "tiempoCompleto" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Estudiante" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Materia" ADD COLUMN     "cupo" INTEGER NOT NULL DEFAULT 0;
