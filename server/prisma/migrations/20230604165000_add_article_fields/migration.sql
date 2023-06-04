/*
  Warnings:

  - You are about to drop the column `description` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Article` table. All the data in the column will be lost.
  - Added the required column `text` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "description",
DROP COLUMN "url",
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
