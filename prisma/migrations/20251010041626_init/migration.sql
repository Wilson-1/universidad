/*
  Warnings:

  - You are about to drop the column `materiaId` on the `Docente` table. All the data in the column will be lost.
  - You are about to drop the column `ciclo` on the `Estudiante` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[correo]` on the table `Estudiante` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `duracion` to the `Carrera` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellido` to the `Docente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carreraId` to the `Docente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellido` to the `Estudiante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cicloId` to the `Estudiante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correo` to the `Estudiante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docenteId` to the `Materia` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Docente" DROP CONSTRAINT "Docente_materiaId_fkey";

-- AlterTable
ALTER TABLE "Carrera" ADD COLUMN     "duracion" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Docente" DROP COLUMN "materiaId",
ADD COLUMN     "apellido" TEXT NOT NULL,
ADD COLUMN     "carreraId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Estudiante" DROP COLUMN "ciclo",
ADD COLUMN     "apellido" TEXT NOT NULL,
ADD COLUMN     "cicloId" INTEGER NOT NULL,
ADD COLUMN     "correo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Materia" ADD COLUMN     "docenteId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Ciclo" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "carreraId" INTEGER NOT NULL,

    CONSTRAINT "Ciclo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscripcion" (
    "id" SERIAL NOT NULL,
    "cicloAcademico" TEXT NOT NULL,
    "notaFinal" DOUBLE PRECISION,
    "estudianteId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_correo_key" ON "Estudiante"("correo");

-- AddForeignKey
ALTER TABLE "Ciclo" ADD CONSTRAINT "Ciclo_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_cicloId_fkey" FOREIGN KEY ("cicloId") REFERENCES "Ciclo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Docente" ADD CONSTRAINT "Docente_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Docente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
