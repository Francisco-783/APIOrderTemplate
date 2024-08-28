-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'REJECTED', 'COMPLETED');

-- CreateTable
CREATE TABLE "ClientRequest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "ClientRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClientRequestPromos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClientRequestOrders" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClientRequestExtras" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClientRequestPromos_AB_unique" ON "_ClientRequestPromos"("A", "B");

-- CreateIndex
CREATE INDEX "_ClientRequestPromos_B_index" ON "_ClientRequestPromos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClientRequestOrders_AB_unique" ON "_ClientRequestOrders"("A", "B");

-- CreateIndex
CREATE INDEX "_ClientRequestOrders_B_index" ON "_ClientRequestOrders"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClientRequestExtras_AB_unique" ON "_ClientRequestExtras"("A", "B");

-- CreateIndex
CREATE INDEX "_ClientRequestExtras_B_index" ON "_ClientRequestExtras"("B");

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
