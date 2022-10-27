/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `player` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "player_username_key" ON "player"("username");
