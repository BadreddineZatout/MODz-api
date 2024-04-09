/*
  Warnings:

  - You are about to drop the `_categorytojobtype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_categorytojobtype` DROP FOREIGN KEY `_CategoryTojobType_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytojobtype` DROP FOREIGN KEY `_CategoryTojobType_B_fkey`;

-- AlterTable
ALTER TABLE `items` ADD COLUMN `max_price` DOUBLE NOT NULL DEFAULT 0.0,
    ADD COLUMN `min_price` DOUBLE NOT NULL DEFAULT 0.0;

-- DropTable
DROP TABLE `_categorytojobtype`;

-- CreateTable
CREATE TABLE `Offer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `can_travel` BOOLEAN NOT NULL DEFAULT true,
    `price` DOUBLE NOT NULL DEFAULT 0.0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Offer` ADD CONSTRAINT `Offer_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offer` ADD CONSTRAINT `Offer_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
