-- AlterTable
ALTER TABLE `categories` ADD COLUMN `for_construction` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `items` MODIFY `job_type_id` INTEGER NULL;
