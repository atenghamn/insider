-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(15) NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
