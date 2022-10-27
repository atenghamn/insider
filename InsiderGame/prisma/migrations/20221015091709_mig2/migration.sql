/*
  Warnings:

  - You are about to drop the column `role` on the `player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "game" ADD COLUMN     "cFive" INTEGER,
ADD COLUMN     "cFour" INTEGER,
ADD COLUMN     "cOne" INTEGER,
ADD COLUMN     "cThree" INTEGER,
ADD COLUMN     "cTwo" INTEGER,
ADD COLUMN     "host" INTEGER,
ADD COLUMN     "insider" INTEGER,
ADD COLUMN     "master" INTEGER;

-- AlterTable
ALTER TABLE "player" DROP COLUMN "role";
