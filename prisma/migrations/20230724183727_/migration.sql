/*
  Warnings:

  - Added the required column `about` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "about" TEXT NOT NULL;
