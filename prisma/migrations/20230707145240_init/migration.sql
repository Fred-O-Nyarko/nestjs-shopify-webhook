/*
  Warnings:

  - You are about to drop the column `dump` on the `Order` table. All the data in the column will be lost.
  - Added the required column `metaData` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "dump",
ADD COLUMN     "metaData" JSONB NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
