-- DropForeignKey
ALTER TABLE "role" DROP CONSTRAINT "role_playerId_fkey";

-- AlterTable
ALTER TABLE "role" ALTER COLUMN "playerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
