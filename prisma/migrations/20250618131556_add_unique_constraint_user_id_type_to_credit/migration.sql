-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Credit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "remaining" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME,
    CONSTRAINT "Credit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Lab" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Credit" ("createdAt", "expiresAt", "id", "quantity", "remaining", "type", "userId") SELECT "createdAt", "expiresAt", "id", "quantity", "remaining", "type", "userId" FROM "Credit";
DROP TABLE "Credit";
ALTER TABLE "new_Credit" RENAME TO "Credit";
CREATE UNIQUE INDEX "Credit_userId_type_key" ON "Credit"("userId", "type");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
