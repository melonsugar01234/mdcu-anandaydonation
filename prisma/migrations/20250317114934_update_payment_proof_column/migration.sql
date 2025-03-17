-- CreateTable
CREATE TABLE `Register` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL DEFAULT '',
    `home` VARCHAR(191) NOT NULL,
    `tracking_code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `edited_at` DATETIME(3) NOT NULL,
    `card` VARCHAR(191) NULL,
    `shirts` VARCHAR(191) NULL,
    `shipment_status` VARCHAR(191) NULL,
    `payment_method` VARCHAR(191) NULL,
    `payment_amount` VARCHAR(191) NULL,
    `payment_proof` TEXT NULL,
    `payment_status` VARCHAR(191) NULL,
    `receipt` VARCHAR(191) NULL,
    `national_id` VARCHAR(191) NULL,
    `name_on_receipt` VARCHAR(191) NULL,
    `address_on_receipt` VARCHAR(191) NULL,

    UNIQUE INDEX `Register_tracking_code_key`(`tracking_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
