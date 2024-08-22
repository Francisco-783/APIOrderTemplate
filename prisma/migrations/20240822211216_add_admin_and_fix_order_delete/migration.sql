-- DropForeignKey
ALTER TABLE "AddItem" DROP CONSTRAINT "AddItem_orderId_fkey";

-- AlterTable
ALTER TABLE "AddItem" ALTER COLUMN "orderId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AddItem" ADD CONSTRAINT "AddItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
