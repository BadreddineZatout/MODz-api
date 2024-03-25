/*
  Warnings:

  - You are about to drop the `_categorytomedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_employeetomedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `media` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_categorytomedia` DROP FOREIGN KEY `_CategoryToMedia_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytomedia` DROP FOREIGN KEY `_CategoryToMedia_B_fkey`;

-- DropForeignKey
ALTER TABLE `_employeetomedia` DROP FOREIGN KEY `_EmployeeToMedia_A_fkey`;

-- DropForeignKey
ALTER TABLE `_employeetomedia` DROP FOREIGN KEY `_EmployeeToMedia_B_fkey`;

-- DropTable
DROP TABLE `_categorytomedia`;

-- DropTable
DROP TABLE `_employeetomedia`;

-- DropTable
DROP TABLE `media`;

-- CreateTable
CREATE TABLE `images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `type` ENUM('CATEGORY', 'SELFIE', 'ID') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmployeeToImage` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmployeeToImage_AB_unique`(`A`, `B`),
    INDEX `_EmployeeToImage_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToImage` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToImage_AB_unique`(`A`, `B`),
    INDEX `_CategoryToImage_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EmployeeToImage` ADD CONSTRAINT `_EmployeeToImage_A_fkey` FOREIGN KEY (`A`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToImage` ADD CONSTRAINT `_EmployeeToImage_B_fkey` FOREIGN KEY (`B`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToImage` ADD CONSTRAINT `_CategoryToImage_A_fkey` FOREIGN KEY (`A`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToImage` ADD CONSTRAINT `_CategoryToImage_B_fkey` FOREIGN KEY (`B`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
