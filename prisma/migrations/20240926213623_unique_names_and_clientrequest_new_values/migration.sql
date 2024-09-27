/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Extra` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Promo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ClientRequest" ADD COLUMN     "delivery" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "totalPrice" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Extra_name_key" ON "Extra"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Order_name_key" ON "Order"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Promo_name_key" ON "Promo"("name");
