/*
  Warnings:

  - Added the required column `slug` to the `CeremonialService` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CeremonialService" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titleEn" TEXT NOT NULL,
    "titleFa" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionFa" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageMediaId" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CeremonialService_imageMediaId_fkey" FOREIGN KEY ("imageMediaId") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CeremonialService" ("createdAt", "descriptionAr", "descriptionEn", "descriptionFa", "id", "imageMediaId", "order", "published", "titleAr", "titleEn", "titleFa", "updatedAt") SELECT "createdAt", "descriptionAr", "descriptionEn", "descriptionFa", "id", "imageMediaId", "order", "published", "titleAr", "titleEn", "titleFa", "updatedAt" FROM "CeremonialService";
DROP TABLE "CeremonialService";
ALTER TABLE "new_CeremonialService" RENAME TO "CeremonialService";
CREATE UNIQUE INDEX "CeremonialService_slug_key" ON "CeremonialService"("slug");
CREATE INDEX "CeremonialService_slug_idx" ON "CeremonialService"("slug");
CREATE INDEX "CeremonialService_published_idx" ON "CeremonialService"("published");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
