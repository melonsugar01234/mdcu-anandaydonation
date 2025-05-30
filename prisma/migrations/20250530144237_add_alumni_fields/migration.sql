-- AlterTable
ALTER TABLE `Register` ADD COLUMN `alumni` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `alumni_gen` VARCHAR(191) NULL;
