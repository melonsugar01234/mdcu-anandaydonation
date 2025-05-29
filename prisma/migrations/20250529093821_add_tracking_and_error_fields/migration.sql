-- AlterTable
ALTER TABLE `register` ADD COLUMN `error_details` VARCHAR(191) NULL,
    ADD COLUMN `item_tracking_number` VARCHAR(191) NULL,
    ADD COLUMN `receipt_tracking_number` VARCHAR(191) NULL;
