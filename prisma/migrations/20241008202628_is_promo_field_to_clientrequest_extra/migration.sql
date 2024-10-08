/*
  Warnings:

  - Added the required column `isPromo` to the `ClientRequestExtra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClientRequestExtra" ADD COLUMN     "isPromo" TEXT NOT NULL;
