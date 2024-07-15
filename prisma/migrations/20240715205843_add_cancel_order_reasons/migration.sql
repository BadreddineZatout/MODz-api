-- AlterTable
ALTER TABLE `orders` ADD COLUMN `cancel_reason` TEXT NULL;

-- CreateTable
CREATE TABLE `cancel_reasons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` VARCHAR(191) NOT NULL,
    `cancelBy` ENUM('CLIENT', 'EMPLOYEE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
