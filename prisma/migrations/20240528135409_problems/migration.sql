-- CreateTable
CREATE TABLE `problems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `employee_id` INTEGER NOT NULL,
    `report_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `order_id` INTEGER NULL,
    `construction_id` INTEGER NULL,
    `description` TEXT NOT NULL,
    `reporter` ENUM('CLIENT', 'EMPLOYEE') NOT NULL,
    `is_treated` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
