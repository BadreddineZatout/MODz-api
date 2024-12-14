/*
  Warnings:

  - You are about to drop the column `province_id` on the `constructions` table. All the data in the column will be lost.
  - You are about to drop the column `state_id` on the `constructions` table. All the data in the column will be lost.
  - You are about to drop the column `province_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `state_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `province_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `state_id` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `constructions` DROP FOREIGN KEY `constructions_province_id_fkey`;

-- DropForeignKey
ALTER TABLE `constructions` DROP FOREIGN KEY `constructions_state_id_fkey`;

-- DropForeignKey
ALTER TABLE `employees` DROP FOREIGN KEY `employees_province_id_fkey`;

-- DropForeignKey
ALTER TABLE `employees` DROP FOREIGN KEY `employees_state_id_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_province_id_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_state_id_fkey`;

-- AlterTable
ALTER TABLE `constructions` DROP COLUMN `province_id`,
    DROP COLUMN `state_id`,
    ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL;

-- AlterTable
ALTER TABLE `employees` DROP COLUMN `province_id`,
    DROP COLUMN `state_id`,
    ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `province_id`,
    DROP COLUMN `state_id`,
    ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL;
