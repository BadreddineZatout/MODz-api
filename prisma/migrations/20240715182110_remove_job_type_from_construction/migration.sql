/*
  Warnings:

  - You are about to drop the column `job_type_id` on the `constructions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `constructions` DROP FOREIGN KEY `constructions_job_type_id_fkey`;

-- AlterTable
ALTER TABLE `constructions` DROP COLUMN `job_type_id`;
