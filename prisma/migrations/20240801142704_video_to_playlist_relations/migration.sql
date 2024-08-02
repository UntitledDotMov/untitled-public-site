/*
  Warnings:

  - You are about to drop the `_VideoToPlaylist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_VideoToPlaylist" DROP CONSTRAINT "_VideoToPlaylist_A_fkey";

-- DropForeignKey
ALTER TABLE "_VideoToPlaylist" DROP CONSTRAINT "_VideoToPlaylist_B_fkey";

-- DropTable
DROP TABLE "_VideoToPlaylist";

-- CreateTable
CREATE TABLE "VideoToPlaylist" (
    "id" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,
    "playlistId" INTEGER NOT NULL,
    "playlistIndex" INTEGER NOT NULL,

    CONSTRAINT "VideoToPlaylist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoToPlaylist_videoId_playlistId_key" ON "VideoToPlaylist"("videoId", "playlistId");

-- AddForeignKey
ALTER TABLE "VideoToPlaylist" ADD CONSTRAINT "VideoToPlaylist_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoToPlaylist" ADD CONSTRAINT "VideoToPlaylist_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
