/*
  Warnings:

  - You are about to drop the `provider` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `provider`;

-- CreateTable
CREATE TABLE `providers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `shop_name` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `phone_number2` VARCHAR(191) NULL,

    UNIQUE INDEX `providers_shop_name_key`(`shop_name`),
    UNIQUE INDEX `providers_phone_number_key`(`phone_number`),
    UNIQUE INDEX `providers_phone_number2_key`(`phone_number2`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
