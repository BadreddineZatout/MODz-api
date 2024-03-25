/*
  Warnings:

  - You are about to drop the column `verfied_at` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `verfied_at`,
    ADD COLUMN `verified_at` DATETIME(3) NULL;
