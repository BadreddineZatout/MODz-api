/*
  Warnings:

  - You are about to drop the `_categorytojobtype` table. If the table is not empty, all the data it contains will be lost.

*/

-- CreateTable
CREATE TABLE `orders`
(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `description` VARCHAR
(191) NULL,
    `date` DATETIME
(3) NOT NULL,
    `hour` VARCHAR
(191) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `job_type_id` INTEGER NOT NULL,

    PRIMARY KEY
(`id`)
) DEFAULT CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_order`
(
    `item_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY
(`item_id`, `order_id`)
) DEFAULT CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders`
ADD CONSTRAINT `orders_client_id_fkey` FOREIGN KEY
(`client_id`) REFERENCES `clients`
(`id`) ON
DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders`
ADD CONSTRAINT `orders_category_id_fkey` FOREIGN KEY
(`category_id`) REFERENCES `categories`
(`id`) ON
DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders`
ADD CONSTRAINT `orders_job_type_id_fkey` FOREIGN KEY
(`job_type_id`) REFERENCES `job_types`
(`id`) ON
DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_order`
ADD CONSTRAINT `item_order_item_id_fkey` FOREIGN KEY
(`item_id`) REFERENCES `items`
(`id`) ON
DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_order`
ADD CONSTRAINT `item_order_order_id_fkey` FOREIGN KEY
(`order_id`) REFERENCES `orders`
(`id`) ON
DELETE RESTRICT ON
UPDATE CASCADE;
