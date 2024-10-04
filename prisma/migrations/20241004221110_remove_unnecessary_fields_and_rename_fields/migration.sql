/*
  Warnings:

  - You are about to drop the column `idOfAdd` on the `ClientRequestAdds` table. All the data in the column will be lost.
  - You are about to drop the column `addItemId` on the `ClientRequestExtra` table. All the data in the column will be lost.
  - You are about to drop the column `idOfPromo` on the `ClientRequestPromo` table. All the data in the column will be lost.
  - Added the required column `extraId` to the `ClientRequestExtra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promoId` to the `ClientRequestPromo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClientRequestAdds" DROP COLUMN "idOfAdd";

-- AlterTable
ALTER TABLE "ClientRequestExtra" DROP COLUMN "addItemId",
ADD COLUMN     "extraId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ClientRequestPromo" DROP COLUMN "idOfPromo",
ADD COLUMN     "promoId" TEXT NOT NULL;
