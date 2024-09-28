-- CreateTable
CREATE TABLE "_ClientRequestAddItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClientRequestAddItem_AB_unique" ON "_ClientRequestAddItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ClientRequestAddItem_B_index" ON "_ClientRequestAddItem"("B");

-- AddForeignKey
ALTER TABLE "_ClientRequestAddItem" ADD CONSTRAINT "_ClientRequestAddItem_A_fkey" FOREIGN KEY ("A") REFERENCES "AddItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientRequestAddItem" ADD CONSTRAINT "_ClientRequestAddItem_B_fkey" FOREIGN KEY ("B") REFERENCES "ClientRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
