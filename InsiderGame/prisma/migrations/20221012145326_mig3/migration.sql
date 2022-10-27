-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_gameId_fkey";

-- AlterTable
ALTER TABLE "game" ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "player" ALTER COLUMN "gameId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
