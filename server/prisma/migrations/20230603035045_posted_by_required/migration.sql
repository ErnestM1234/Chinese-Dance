/*
  Warnings:

  - Made the column `postedById` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_postedById_fkey";

-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "postedById" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
