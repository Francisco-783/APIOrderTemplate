/*
  Warnings:

  - You are about to drop the column `isPromo` on the `ClientRequestExtra` table. All the data in the column will be lost.
  - You are about to drop the column `isPromo` on the `ClientRequestOrder` table. All the data in the column will be lost.
  - Added the required column `promoId` to the `ClientRequestExtra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promoId` to the `ClientRequestOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClientRequestExtra" DROP COLUMN "isPromo",
ADD COLUMN     "promoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ClientRequestOrder" DROP COLUMN "isPromo",
ADD COLUMN     "promoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ClientRequestOrder" ADD CONSTRAINT "ClientRequestOrder_promoId_fkey" FOREIGN KEY ("promoId") REFERENCES "ClientRequestPromo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientRequestExtra" ADD CONSTRAINT "ClientRequestExtra_promoId_fkey" FOREIGN KEY ("promoId") REFERENCES "ClientRequestPromo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
