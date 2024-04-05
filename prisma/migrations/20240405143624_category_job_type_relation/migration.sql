/*
  Warnings:

  - You are about to drop the `_categorytojobtype` table. If the table is not empty, all the data it contains will be lost.

*/

-- CreateTable
CREATE TABLE `_category_jobtype`
(
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_category_jobtype_AB_unique`
(`A`, `B`),
    INDEX `_category_jobtype_B_index`
(`B`)
) DEFAULT CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_category_jobtype`
ADD CONSTRAINT `_category_jobtype_A_fkey` FOREIGN KEY
(`A`) REFERENCES `categories`
(`id`) ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_category_jobtype`
ADD CONSTRAINT `_category_jobtype_B_fkey` FOREIGN KEY
(`B`) REFERENCES `job_types`
(`id`) ON
DELETE CASCADE ON
UPDATE CASCADE;
