-- CreateTable
CREATE TABLE `job_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `has_items` BOOLEAN NOT NULL,

    UNIQUE INDEX `job_types_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryTojobType` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryTojobType_AB_unique`(`A`, `B`),
    INDEX `_CategoryTojobType_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoryTojobType` ADD CONSTRAINT `_CategoryTojobType_A_fkey` FOREIGN KEY (`A`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryTojobType` ADD CONSTRAINT `_CategoryTojobType_B_fkey` FOREIGN KEY (`B`) REFERENCES `job_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
