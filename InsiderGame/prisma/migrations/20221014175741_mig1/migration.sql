-- DropForeignKey
ALTER TABLE "role" DROP CONSTRAINT "role_gameId_fkey";

-- AlterTable
ALTER TABLE "role" ALTER COLUMN "gameId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
