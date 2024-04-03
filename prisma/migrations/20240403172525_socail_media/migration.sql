-- CreateTable
CREATE TABLE `social_media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provider_socialmedia` (
    `provider_id` INTEGER NOT NULL,
    `social_media_id` INTEGER NOT NULL,
    `link` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`provider_id`, `social_media_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `provider_socialmedia` ADD CONSTRAINT `provider_socialmedia_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `providers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `provider_socialmedia` ADD CONSTRAINT `provider_socialmedia_social_media_id_fkey` FOREIGN KEY (`social_media_id`) REFERENCES `social_media`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
