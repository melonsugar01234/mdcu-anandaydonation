-- CreateTable
CREATE TABLE "Register" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT DEFAULT '',
    "home" TEXT NOT NULL,
    "tracking_code" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "card" TEXT NOT NULL DEFAULT '',
    "shirt" TEXT NOT NULL DEFAULT '',
    "shipment_status" TEXT NOT NULL DEFAULT '',
    "payment_method" TEXT NOT NULL DEFAULT '',
    "payment_amount" TEXT NOT NULL DEFAULT '',
    "payment_proof" TEXT NOT NULL DEFAULT '',
    "payment_status" TEXT NOT NULL DEFAULT ''
);
