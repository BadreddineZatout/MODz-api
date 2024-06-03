/*
  Warnings:

  - You are about to drop the column `chambers_nbr` on the `constructions` table. All the data in the column will be lost.
  - You are about to drop the column `employee_id` on the `constructions` table. All the data in the column will be lost.
  - You are about to drop the column `floors_nbr` on the `constructions` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `constructions` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `constructions` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the `emplopyee_group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `groups` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `job_type_id` to the `constructions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `constructions` DROP FOREIGN KEY `constructions_employee_id_fkey`;

-- DropForeignKey
ALTER TABLE `constructions` DROP FOREIGN KEY `constructions_group_id_fkey`;

-- DropForeignKey
ALTER TABLE `emplopyee_group` DROP FOREIGN KEY `emplopyee_group_employee_id_fkey`;

-- DropForeignKey
ALTER TABLE `emplopyee_group` DROP FOREIGN KEY `emplopyee_group_group_id_fkey`;

-- DropForeignKey
ALTER TABLE `employees` DROP FOREIGN KEY `employees_category_id_fkey`;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN `constructionOfferId` INTEGER NULL;

-- AlterTable
ALTER TABLE `constructions` DROP COLUMN `chambers_nbr`,
    DROP COLUMN `employee_id`,
    DROP COLUMN `floors_nbr`,
    DROP COLUMN `group_id`,
    DROP COLUMN `type`,
    ADD COLUMN `job_type_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `employees` DROP COLUMN `category_id`,
    ADD COLUMN `can_work_construction` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `job_types` ADD COLUMN `is_construction_type` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `emplopyee_group`;

-- DropTable
DROP TABLE `groups`;

-- CreateTable
CREATE TABLE `construction_offers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `construction_id` INTEGER NOT NULL,
    `can_travel` BOOLEAN NOT NULL DEFAULT true,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `status` ENUM('PENDING', 'ACCEPTED', 'REFUSED') NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_category_employee` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_category_employee_AB_unique`(`A`, `B`),
    INDEX `_category_employee_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_category_construction_offer` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_category_construction_offer_AB_unique`(`A`, `B`),
    INDEX `_category_construction_offer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `constructions` ADD CONSTRAINT `constructions_job_type_id_fkey` FOREIGN KEY (`job_type_id`) REFERENCES `job_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `construction_offers` ADD CONSTRAINT `construction_offers_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `construction_offers` ADD CONSTRAINT `construction_offers_construction_id_fkey` FOREIGN KEY (`construction_id`) REFERENCES `constructions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `problems` ADD CONSTRAINT `problems_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `problems` ADD CONSTRAINT `problems_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `problems` ADD CONSTRAINT `problems_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `problems` ADD CONSTRAINT `problems_construction_id_fkey` FOREIGN KEY (`construction_id`) REFERENCES `constructions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_category_employee` ADD CONSTRAINT `_category_employee_A_fkey` FOREIGN KEY (`A`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_category_employee` ADD CONSTRAINT `_category_employee_B_fkey` FOREIGN KEY (`B`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_category_construction_offer` ADD CONSTRAINT `_category_construction_offer_A_fkey` FOREIGN KEY (`A`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_category_construction_offer` ADD CONSTRAINT `_category_construction_offer_B_fkey` FOREIGN KEY (`B`) REFERENCES `construction_offers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
