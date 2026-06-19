/*
  Warnings:

  - You are about to drop the column `missionAr` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `missionEn` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `missionFa` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `valuesAr` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `valuesEn` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `valuesFa` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `visionAr` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `visionEn` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `visionFa` on the `About` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_About" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titleEn" TEXT NOT NULL,
    "titleFa" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "contentEn" TEXT NOT NULL,
    "contentFa" TEXT NOT NULL,
    "contentAr" TEXT NOT NULL,
    "imageMediaId" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "About_imageMediaId_fkey" FOREIGN KEY ("imageMediaId") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_About" ("contentAr", "contentEn", "contentFa", "id", "imageMediaId", "published", "titleAr", "titleEn", "titleFa", "updatedAt") SELECT "contentAr", "contentEn", "contentFa", "id", "imageMediaId", "published", "titleAr", "titleEn", "titleFa", "updatedAt" FROM "About";
DROP TABLE "About";
ALTER TABLE "new_About" RENAME TO "About";
CREATE INDEX "About_published_idx" ON "About"("published");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
