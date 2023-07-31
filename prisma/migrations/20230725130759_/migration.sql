/*
  Warnings:

  - You are about to drop the `pet_pictures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pet_pictures" DROP CONSTRAINT "pet_pictures_petId_fkey";

-- DropTable
DROP TABLE "pet_pictures";
