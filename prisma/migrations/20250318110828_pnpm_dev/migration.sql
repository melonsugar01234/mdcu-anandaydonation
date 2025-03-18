-- CreateTable
CREATE TABLE "Register" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT DEFAULT '',
    "home" TEXT NOT NULL,
    "tracking_code" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited_at" DATETIME NOT NULL,
    "card" INTEGER,
    "shirts" TEXT,
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

-- CreateIndex
CREATE UNIQUE INDEX "Register_tracking_code_key" ON "Register"("tracking_code");
