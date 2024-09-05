/*
  Warnings:

  - Added the required column `createdBy` to the `Extra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Extra" ADD COLUMN     "createdBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "createdBy" TEXT NOT NULL;
