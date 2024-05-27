-- CreateTable
CREATE TABLE `groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emplopyee_group` (
    `group_id` INTEGER NOT NULL,
    `employee_id` INTEGER NOT NULL,
    `is_leader` BOOLEAN NOT NULL,

    PRIMARY KEY (`group_id`, `employee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity_log` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `log_name` VARCHAR(255) NULL,
    `description` TEXT NOT NULL,
    `subject_type` VARCHAR(255) NULL,
    `event` VARCHAR(255) NULL,
    `subject_id` BIGINT UNSIGNED NULL,
    `causer_type` VARCHAR(255) NULL,
    `causer_id` BIGINT UNSIGNED NULL,
    `properties` JSON NULL,
    `batch_uuid` CHAR(36) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `activity_log_log_name_index`(`log_name`),
    INDEX `causer`(`causer_type`, `causer_id`),
    INDEX `subject`(`subject_type`, `subject_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
