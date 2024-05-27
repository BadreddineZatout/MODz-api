-- AddForeignKey
ALTER TABLE `constructions` ADD CONSTRAINT `constructions_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
