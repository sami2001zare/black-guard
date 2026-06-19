-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'about',
    "titleEn" TEXT NOT NULL,
    "titleFa" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "contentEn" TEXT NOT NULL,
    "contentFa" TEXT NOT NULL,
    "contentAr" TEXT NOT NULL,
    "missionEn" TEXT,
    "missionFa" TEXT,
    "missionAr" TEXT,
    "visionEn" TEXT,
    "visionFa" TEXT,
    "visionAr" TEXT,
    "valuesEn" TEXT,
    "valuesFa" TEXT,
    "valuesAr" TEXT,
    "imageMediaId" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "About_imageMediaId_fkey" FOREIGN KEY ("imageMediaId") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
