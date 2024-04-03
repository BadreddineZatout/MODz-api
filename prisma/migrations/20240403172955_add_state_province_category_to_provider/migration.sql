/*
  Warnings:

  - You are about to drop the column `address` on the `providers` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `providers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province_id` to the `providers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_id` to the `providers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `providers` DROP COLUMN `address`,
    ADD COLUMN `category_id` INTEGER NOT NULL,
    ADD COLUMN `province_id` INTEGER NOT NULL,
    ADD COLUMN `state_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `providers` ADD CONSTRAINT `providers_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `providers` ADD CONSTRAINT `providers_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `states`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `providers` ADD CONSTRAINT `providers_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
