-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Register" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT DEFAULT '',
    "home" TEXT NOT NULL,
    "tracking_code" TEXT NOT NULL,
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
INSERT INTO "new_Register" ("address_on_receipt", "card", "created_at", "email", "home", "id", "name", "name_on_receipt", "national_id", "payment_amount", "payment_method", "payment_proof", "payment_status", "phone", "receipt", "shipment_status", "shirt", "tracking_code") SELECT "address_on_receipt", "card", "created_at", "email", "home", "id", "name", "name_on_receipt", "national_id", "payment_amount", "payment_method", "payment_proof", "payment_status", "phone", "receipt", "shipment_status", "shirt", "tracking_code" FROM "Register";
DROP TABLE "Register";
ALTER TABLE "new_Register" RENAME TO "Register";
CREATE UNIQUE INDEX "Register_tracking_code_key" ON "Register"("tracking_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
