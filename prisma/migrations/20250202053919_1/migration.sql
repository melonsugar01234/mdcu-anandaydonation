-- CreateTable
CREATE TABLE `Registrations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` TINYINT UNSIGNED NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `telephone` VARCHAR(50) NOT NULL,
    `address` MEDIUMTEXT NOT NULL,
    `donate` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `donateAmount` DECIMAL(8, 2) NOT NULL,
    `singlePinAmount` INTEGER UNSIGNED NOT NULL,
    `pinSetAmount` INTEGER UNSIGNED NOT NULL,
    `receipt` TINYINT NOT NULL,
    `nationalId` VARCHAR(13) NOT NULL,
    `receiptName` VARCHAR(50) NOT NULL,
    `receiptAddress` MEDIUMTEXT NOT NULL,
    `buyShirt` TINYINT NOT NULL,
    `order` MEDIUMTEXT NOT NULL,
    `transferTime` VARCHAR(255) NOT NULL,
    `transferDate` VARCHAR(255) NOT NULL,
    `trackingNumber1` VARCHAR(255) NULL,
    `trackingNumber2` VARCHAR(255) NULL,
    `problems` MEDIUMTEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `allPinAmount` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
