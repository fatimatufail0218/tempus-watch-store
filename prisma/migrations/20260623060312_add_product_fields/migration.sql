/*
  Warnings:

  - Added the required column `collection` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "collection" TEXT NOT NULL,
ADD COLUMN     "leftBadge" TEXT,
ADD COLUMN     "rightBadge" TEXT;
