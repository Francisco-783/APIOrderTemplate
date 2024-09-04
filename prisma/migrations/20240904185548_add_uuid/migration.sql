/*
  Warnings:

  - The primary key for the `AddItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ClientRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clientId` on the `ClientRequest` table. All the data in the column will be lost.
  - The primary key for the `Extra` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Promo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `AddItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `ClientRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Extra` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Promo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdBy` to the `Promo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AddItem" DROP CONSTRAINT "AddItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "_ClientRequestExtras" DROP CONSTRAINT "_ClientRequestExtras_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClientRequestExtras" DROP CONSTRAINT "_ClientRequestExtras_B_fkey";

-- DropForeignKey
ALTER TABLE "_ClientRequestOrders" DROP CONSTRAINT "_ClientRequestOrders_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClientRequestOrders" DROP CONSTRAINT "_ClientRequestOrders_B_fkey";

-- DropForeignKey
ALTER TABLE "_ClientRequestPromos" DROP CONSTRAINT "_ClientRequestPromos_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClientRequestPromos" DROP CONSTRAINT "_ClientRequestPromos_B_fkey";

-- DropForeignKey
ALTER TABLE "_PromoExtras" DROP CONSTRAINT "_PromoExtras_A_fkey";

-- DropForeignKey
ALTER TABLE "_PromoExtras" DROP CONSTRAINT "_PromoExtras_B_fkey";

-- DropForeignKey
ALTER TABLE "_PromoOrders" DROP CONSTRAINT "_PromoOrders_A_fkey";

-- DropForeignKey
ALTER TABLE "_PromoOrders" DROP CONSTRAINT "_PromoOrders_B_fkey";

-- AlterTable
ALTER TABLE "AddItem" DROP CONSTRAINT "AddItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AddItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AddItem_id_seq";

-- AlterTable
ALTER TABLE "ClientRequest" DROP CONSTRAINT "ClientRequest_pkey",
DROP COLUMN "clientId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ClientRequest_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ClientRequest_id_seq";

-- AlterTable
ALTER TABLE "Extra" DROP CONSTRAINT "Extra_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Extra_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Extra_id_seq";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Order_id_seq";

-- AlterTable
ALTER TABLE "Promo" DROP CONSTRAINT "Promo_pkey",
ADD COLUMN     "createdBy" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Promo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Promo_id_seq";

-- AlterTable
ALTER TABLE "_ClientRequestExtras" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ClientRequestOrders" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ClientRequestPromos" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_PromoExtras" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_PromoOrders" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "AddItem_id_key" ON "AddItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_key" ON "Admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_name_key" ON "Admin"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ClientRequest_id_key" ON "ClientRequest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Extra_id_key" ON "Extra"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Promo_id_key" ON "Promo"("id");

-- AddForeignKey
ALTER TABLE "AddItem" ADD CONSTRAINT "AddItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientRequestPromos" ADD CONSTRAINT "_ClientRequestPromos_A_fkey" FOREIGN KEY ("A") REFERENCES "ClientRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientRequestPromos" ADD CONSTRAINT "_ClientRequestPromos_B_fkey" FOREIGN KEY ("B") REFERENCES "Promo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientRequestOrders" ADD CONSTRAINT "_ClientRequestOrders_A_fkey" FOREIGN KEY ("A") REFERENCES "ClientRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientRequestOrders" ADD CONSTRAINT "_ClientRequestOrders_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientRequestExtras" ADD CONSTRAINT "_ClientRequestExtras_A_fkey" FOREIGN KEY ("A") REFERENCES "ClientRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientRequestExtras" ADD CONSTRAINT "_ClientRequestExtras_B_fkey" FOREIGN KEY ("B") REFERENCES "Extra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PromoOrders" ADD CONSTRAINT "_PromoOrders_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PromoOrders" ADD CONSTRAINT "_PromoOrders_B_fkey" FOREIGN KEY ("B") REFERENCES "Promo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PromoExtras" ADD CONSTRAINT "_PromoExtras_A_fkey" FOREIGN KEY ("A") REFERENCES "Extra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PromoExtras" ADD CONSTRAINT "_PromoExtras_B_fkey" FOREIGN KEY ("B") REFERENCES "Promo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
