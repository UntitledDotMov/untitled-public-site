import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { playlistID: string } }) {
  const { playlistID } = params;

  if (!playlistID) {
    return NextResponse.json({ message: 'Playlist ID is required' }, { status: 400 });
  }

  try {
    const videos = await prisma.videoToPlaylist.findMany({
      where: {
        playlistId: parseInt(playlistID, 10),
        video: {
          public: true,
        },
      },
      orderBy: {
        playlistIndex: 'asc',
      },
      select: {
        videoId: true,
      },
    });

    const videoIds = videos.map((video) => video.videoId);

    return NextResponse.json(videoIds, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
