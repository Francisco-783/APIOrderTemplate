-- CreateTable
CREATE TABLE "_PromoExtras" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PromoExtras_AB_unique" ON "_PromoExtras"("A", "B");

-- CreateIndex
CREATE INDEX "_PromoExtras_B_index" ON "_PromoExtras"("B");

-- AddForeignKey
ALTER TABLE "_PromoExtras" ADD CONSTRAINT "_PromoExtras_A_fkey" FOREIGN KEY ("A") REFERENCES "Extra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PromoExtras" ADD CONSTRAINT "_PromoExtras_B_fkey" FOREIGN KEY ("B") REFERENCES "Promo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
