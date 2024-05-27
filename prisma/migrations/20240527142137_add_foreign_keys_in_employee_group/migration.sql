-- AddForeignKey
ALTER TABLE `emplopyee_group` ADD CONSTRAINT `emplopyee_group_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `emplopyee_group` ADD CONSTRAINT `emplopyee_group_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
