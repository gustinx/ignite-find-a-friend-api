/*
  Warnings:

  - You are about to drop the `PetPictures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Requeriments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PetPictures" DROP CONSTRAINT "PetPictures_petId_fkey";

-- DropForeignKey
ALTER TABLE "Requeriments" DROP CONSTRAINT "Requeriments_petId_fkey";

-- DropTable
DROP TABLE "PetPictures";

-- DropTable
DROP TABLE "Requeriments";

-- CreateTable
CREATE TABLE "pet_pictures" (
    "id" TEXT NOT NULL,
    "picture_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petId" TEXT NOT NULL,

    CONSTRAINT "pet_pictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requeriments" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petId" TEXT NOT NULL,

    CONSTRAINT "requeriments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet_pictures" ADD CONSTRAINT "pet_pictures_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requeriments" ADD CONSTRAINT "requeriments_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
