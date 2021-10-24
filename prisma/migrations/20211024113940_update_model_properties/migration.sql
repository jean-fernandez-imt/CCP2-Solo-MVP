/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `Manufacturer` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `Price` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `ProjectId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `Provider` on the `Item` table. All the data in the column will be lost.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Project` table. All the data in the column will be lost.
  - The required column `id` was added to the `Item` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Project` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_ProjectId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "Id",
DROP COLUMN "Manufacturer",
DROP COLUMN "Name",
DROP COLUMN "Price",
DROP COLUMN "ProjectId",
DROP COLUMN "Provider",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "manufacturer" VARCHAR(255),
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "projectId" TEXT NOT NULL,
ADD COLUMN     "provider" VARCHAR(255),
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "Id",
DROP COLUMN "Name",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
