-- CreateTable
CREATE TABLE `Provider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `shop_name` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `phone_number2` VARCHAR(191) NULL,

    UNIQUE INDEX `Provider_shop_name_key`(`shop_name`),
    UNIQUE INDEX `Provider_phone_number_key`(`phone_number`),
    UNIQUE INDEX `Provider_phone_number2_key`(`phone_number2`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
