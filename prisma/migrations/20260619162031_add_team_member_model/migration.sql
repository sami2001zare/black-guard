-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameEn" TEXT NOT NULL,
    "nameFa" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "roleEn" TEXT NOT NULL,
    "roleFa" TEXT NOT NULL,
    "roleAr" TEXT NOT NULL,
    "credEn" TEXT NOT NULL,
    "credFa" TEXT NOT NULL,
    "credAr" TEXT NOT NULL,
    "imageMediaId" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TeamMember_imageMediaId_fkey" FOREIGN KEY ("imageMediaId") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titleEn" TEXT NOT NULL,
    "titleFa" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionFa" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageMediaId" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Service_imageMediaId_fkey" FOREIGN KEY ("imageMediaId") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Service" ("createdAt", "descriptionAr", "descriptionEn", "descriptionFa", "id", "imageMediaId", "published", "slug", "titleAr", "titleEn", "titleFa", "updatedAt") SELECT "createdAt", "descriptionAr", "descriptionEn", "descriptionFa", "id", "imageMediaId", "published", "slug", "titleAr", "titleEn", "titleFa", "updatedAt" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");
CREATE INDEX "Service_slug_idx" ON "Service"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "TeamMember_order_idx" ON "TeamMember"("order");
