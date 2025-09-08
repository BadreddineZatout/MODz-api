-- AlterTable
ALTER TABLE `activity_log` MODIFY `properties` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `media` MODIFY `manipulations` LONGTEXT NOT NULL,
    MODIFY `custom_properties` LONGTEXT NOT NULL,
    MODIFY `generated_conversions` LONGTEXT NOT NULL,
    MODIFY `responsive_images` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `problems` ADD COLUMN `tag` VARCHAR(191) NULL,
    MODIFY `client_id` INTEGER NULL,
    MODIFY `employee_id` INTEGER NULL;
