/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "caseSize" TEXT,
ADD COLUMN     "crystal" TEXT,
ADD COLUMN     "movement" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "strap" TEXT,
ADD COLUMN     "warranty" TEXT,
ADD COLUMN     "waterResistance" TEXT,
ALTER COLUMN "description" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
