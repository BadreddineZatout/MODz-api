-- AlterTable
ALTER TABLE `categories` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `description` TEXT NULL;

-- CreateTable
CREATE TABLE `constructions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `description` TEXT NULL,
    `date` DATETIME(3) NOT NULL,
    `hour` VARCHAR(191) NOT NULL,
    `type` ENUM('NEW', 'RENOVATION') NOT NULL,
    `floors_nbr` INTEGER NULL,
    `chambres_nbr` INTEGER NULL,
    `status` ENUM('PENDING', 'PROCESSING', 'DONE', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `accepted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_category_construction` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_category_construction_AB_unique`(`A`, `B`),
    INDEX `_category_construction_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_construction_employee` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_construction_employee_AB_unique`(`A`, `B`),
    INDEX `_construction_employee_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_construction_group` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_construction_group_AB_unique`(`A`, `B`),
    INDEX `_construction_group_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_category_construction` ADD CONSTRAINT `_category_construction_A_fkey` FOREIGN KEY (`A`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_category_construction` ADD CONSTRAINT `_category_construction_B_fkey` FOREIGN KEY (`B`) REFERENCES `constructions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_construction_employee` ADD CONSTRAINT `_construction_employee_A_fkey` FOREIGN KEY (`A`) REFERENCES `constructions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_construction_employee` ADD CONSTRAINT `_construction_employee_B_fkey` FOREIGN KEY (`B`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_construction_group` ADD CONSTRAINT `_construction_group_A_fkey` FOREIGN KEY (`A`) REFERENCES `constructions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_construction_group` ADD CONSTRAINT `_construction_group_B_fkey` FOREIGN KEY (`B`) REFERENCES `groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
