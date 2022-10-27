/*
  Warnings:

  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "role" DROP CONSTRAINT "role_gameId_fkey";

-- DropForeignKey
ALTER TABLE "role" DROP CONSTRAINT "role_playerId_fkey";

-- AlterTable
ALTER TABLE "game" ADD COLUMN     "commonFive" INTEGER,
ADD COLUMN     "commonFour" INTEGER,
ADD COLUMN     "commonOne" INTEGER,
ADD COLUMN     "commonSix" INTEGER,
ADD COLUMN     "commonThree" INTEGER,
ADD COLUMN     "commonTwo" INTEGER,
ADD COLUMN     "host" INTEGER,
ADD COLUMN     "insider" INTEGER;

-- DropTable
DROP TABLE "role";
