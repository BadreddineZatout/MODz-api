-- CreateTable
CREATE TABLE `construction_item` (
    `item_id` INTEGER NOT NULL,
    `construction_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`item_id`, `construction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `construction_item` ADD CONSTRAINT `construction_item_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `construction_item` ADD CONSTRAINT `construction_item_construction_id_fkey` FOREIGN KEY (`construction_id`) REFERENCES `constructions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
