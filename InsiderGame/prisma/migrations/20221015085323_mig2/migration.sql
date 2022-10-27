/*
  Warnings:

  - You are about to drop the column `commonFive` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `commonFour` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `commonOne` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `commonSix` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `commonThree` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `commonTwo` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `host` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `insider` on the `game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "game" DROP COLUMN "commonFive",
DROP COLUMN "commonFour",
DROP COLUMN "commonOne",
DROP COLUMN "commonSix",
DROP COLUMN "commonThree",
DROP COLUMN "commonTwo",
DROP COLUMN "host",
DROP COLUMN "insider",
ADD COLUMN     "numberOfPlayer" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "isActive" SET DEFAULT false;

-- AlterTable
ALTER TABLE "player" ADD COLUMN     "role" VARCHAR(10);
