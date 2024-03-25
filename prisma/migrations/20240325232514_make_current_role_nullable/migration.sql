-- AlterTable
ALTER TABLE `users` MODIFY `current_role` ENUM('ADMIN', 'CLIENT', 'EMPLOYEE') NULL;
