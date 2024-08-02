-- AlterTable
ALTER TABLE `constructions` ADD COLUMN `province_id` INTEGER NULL,
    ADD COLUMN `state_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `province_id` INTEGER NULL,
    ADD COLUMN `state_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `states`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `constructions` ADD CONSTRAINT `constructions_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `states`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `constructions` ADD CONSTRAINT `constructions_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
