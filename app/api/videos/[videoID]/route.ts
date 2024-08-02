import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { videoID: string } }) {
  const { videoID } = params;

  if (!videoID) {
    return NextResponse.json({ error: 'Invalid videoID' }, { status: 400 });
  }

  try {
    const video = await prisma.video.findUnique({
      where: { public: true, id: parseInt(videoID) },
    });

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json(video);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
