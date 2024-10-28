/*
  Warnings:

  - You are about to drop the `IsOpen` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "IsOpen";

-- CreateTable
CREATE TABLE "StoreSettings" (
    "id" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT false,
    "address" TEXT NOT NULL,

    CONSTRAINT "StoreSettings_pkey" PRIMARY KEY ("id")
);
