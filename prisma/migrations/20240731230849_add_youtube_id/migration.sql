-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "description" TEXT,
ALTER COLUMN "title" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "youtubeID" TEXT,
ALTER COLUMN "title" SET DATA TYPE TEXT;
