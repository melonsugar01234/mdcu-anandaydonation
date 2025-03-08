-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Register" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT DEFAULT '',
    "home" TEXT NOT NULL,
    "tracking_code" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "card" TEXT,
    "shirt" TEXT,
    "shipment_status" TEXT,
    "payment_method" TEXT,
    "payment_amount" TEXT,
    "payment_proof" TEXT,
    "payment_status" TEXT,
    "receipt" TEXT,
    "national_id" TEXT,
    "name_on_receipt" TEXT,
    "address_on_receipt" TEXT
);
INSERT INTO "new_Register" ("card", "created_at", "email", "home", "id", "name", "payment_amount", "payment_method", "payment_proof", "payment_status", "phone", "shipment_status", "shirt", "tracking_code") SELECT "card", "created_at", "email", "home", "id", "name", "payment_amount", "payment_method", "payment_proof", "payment_status", "phone", "shipment_status", "shirt", "tracking_code" FROM "Register";
DROP TABLE "Register";
ALTER TABLE "new_Register" RENAME TO "Register";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
