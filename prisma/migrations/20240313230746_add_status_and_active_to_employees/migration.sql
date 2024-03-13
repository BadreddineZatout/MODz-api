/*
  Warnings:

  - Added the required column `is_active` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employees` ADD COLUMN `is_active` BOOLEAN NOT NULL,
    ADD COLUMN `status` ENUM('PENDING', 'VALID', 'REFUSED') NOT NULL DEFAULT 'PENDING';
