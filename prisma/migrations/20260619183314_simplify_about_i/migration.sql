/*
  Warnings:

  - You are about to drop the column `imageMediaId` on the `About` table. All the data in the column will be lost.

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
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_About" ("contentAr", "contentEn", "contentFa", "createdAt", "id", "published", "titleAr", "titleEn", "titleFa", "updatedAt") SELECT "contentAr", "contentEn", "contentFa", "createdAt", "id", "published", "titleAr", "titleEn", "titleFa", "updatedAt" FROM "About";
DROP TABLE "About";
ALTER TABLE "new_About" RENAME TO "About";
CREATE INDEX "About_published_idx" ON "About"("published");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
