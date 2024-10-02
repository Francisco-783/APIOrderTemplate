/*
  Warnings:

  - You are about to drop the `_ClientRequestAddItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClientRequestExtras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClientRequestOrders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClientRequestPromos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClientRequestAddItem" DROP CONSTRAINT "_ClientRequestAddItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClientRequestAddItem" DROP CONSTRAINT "_ClientRequestAddItem_B_fkey";

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

-- DropTable
DROP TABLE "_ClientRequestAddItem";

-- DropTable
DROP TABLE "_ClientRequestExtras";

-- DropTable
DROP TABLE "_ClientRequestOrders";

-- DropTable
DROP TABLE "_ClientRequestPromos";

-- CreateTable
CREATE TABLE "ClientRequestOrder" (
    "id" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "clientRequestId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "isPromo" TEXT NOT NULL,

    CONSTRAINT "ClientRequestOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientRequestAdds" (
    "id" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "idOfAdd" TEXT NOT NULL,
    "clientRequestOrderId" TEXT NOT NULL,
    "addItemId" TEXT NOT NULL,
    "howMany" INTEGER NOT NULL,

    CONSTRAINT "ClientRequestAdds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientRequestPromo" (
    "id" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "clientRequestId" TEXT NOT NULL,
    "idOfPromo" TEXT NOT NULL,

    CONSTRAINT "ClientRequestPromo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientRequestExtra" (
    "id" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "addItemId" TEXT NOT NULL,
    "clientRequestId" TEXT NOT NULL,

    CONSTRAINT "ClientRequestExtra_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientRequestOrder_id_key" ON "ClientRequestOrder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClientRequestAdds_id_key" ON "ClientRequestAdds"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClientRequestPromo_id_key" ON "ClientRequestPromo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClientRequestExtra_id_key" ON "ClientRequestExtra"("id");

-- AddForeignKey
ALTER TABLE "ClientRequestOrder" ADD CONSTRAINT "ClientRequestOrder_clientRequestId_fkey" FOREIGN KEY ("clientRequestId") REFERENCES "ClientRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientRequestAdds" ADD CONSTRAINT "ClientRequestAdds_clientRequestOrderId_fkey" FOREIGN KEY ("clientRequestOrderId") REFERENCES "ClientRequestOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientRequestPromo" ADD CONSTRAINT "ClientRequestPromo_clientRequestId_fkey" FOREIGN KEY ("clientRequestId") REFERENCES "ClientRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientRequestExtra" ADD CONSTRAINT "ClientRequestExtra_clientRequestId_fkey" FOREIGN KEY ("clientRequestId") REFERENCES "ClientRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
