/*
  Warnings:

  - You are about to drop the `_category_construction_offer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `construction_offers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_category_construction_offer` DROP FOREIGN KEY `_category_construction_offer_A_fkey`;

-- DropForeignKey
ALTER TABLE `_category_construction_offer` DROP FOREIGN KEY `_category_construction_offer_B_fkey`;

-- DropForeignKey
ALTER TABLE `construction_offers` DROP FOREIGN KEY `construction_offers_construction_id_fkey`;

-- DropForeignKey
ALTER TABLE `construction_offers` DROP FOREIGN KEY `construction_offers_employee_id_fkey`;

-- DropTable
DROP TABLE `_category_construction_offer`;

-- DropTable
DROP TABLE `construction_offers`;

-- CreateTable
CREATE TABLE `_construction_employee` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_construction_employee_AB_unique`(`A`, `B`),
    INDEX `_construction_employee_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_construction_employee` ADD CONSTRAINT `_construction_employee_A_fkey` FOREIGN KEY (`A`) REFERENCES `constructions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_construction_employee` ADD CONSTRAINT `_construction_employee_B_fkey` FOREIGN KEY (`B`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
