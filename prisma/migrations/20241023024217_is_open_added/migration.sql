-- CreateTable
CREATE TABLE "IsOpen" (
    "open" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "IsOpen_open_key" ON "IsOpen"("open");
