-- CreateTable
CREATE TABLE `DonationStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isOpen` BOOLEAN NOT NULL DEFAULT true,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
