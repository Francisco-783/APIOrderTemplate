/*
  Warnings:

  - You are about to drop the column `value` on the `AddItem` table. All the data in the column will be lost.
  - Added the required column `limit` to the `AddItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AddItem" DROP COLUMN "value",
ADD COLUMN     "limit" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "price" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Extra" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Extra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Promo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PromoOrders" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PromoOrders_AB_unique" ON "_PromoOrders"("A", "B");

-- CreateIndex
CREATE INDEX "_PromoOrders_B_index" ON "_PromoOrders"("B");

-- AddForeignKey
ALTER TABLE "_PromoOrders" ADD CONSTRAINT "_PromoOrders_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PromoOrders" ADD CONSTRAINT "_PromoOrders_B_fkey" FOREIGN KEY ("B") REFERENCES "Promo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
