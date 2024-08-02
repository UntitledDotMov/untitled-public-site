'use client';
import { useEffect, useState } from 'react';
import { Skeleton, Text, Title } from '@mantine/core';
import RecentVideoBar from '@/components/RecentVideoBar';
import structure from '@/modules/Structure.module.css';
import VideoPlayer from '@/components/VideoPlayer';
import { fetchRecentVideoIDs, fetchVideo, Video } from '@/lib/api';
import text from '@/modules/Text.module.css';
import scrollers from '@/modules/Scrollers.module.css';
import videoplayer from '@/modules/VideoPlayer.module.css';

export default function Home() {
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    async function loadVideo() {
      try {
        const videoIDs = await fetchRecentVideoIDs();
        if (videoIDs.length > 0) {
          const firstVideo = await fetchVideo(videoIDs[0]);
          setVideo(firstVideo);
        }
      } catch (error) {
        console.error('Failed to load video', error);
      }
    }

    loadVideo();
  }, []);
  const mockVideo: Video = {
    youtubeID: 'mockID',
    title: 'Loading...',
    description: 'Loading description...',
    uploadedAt: new Date(),
    live: false,
  };
  return (
    <div className={structure.pagegrid}>
      <Title className={text.title} style={{ gridRow: '1' }}>
        Welcome to Untitled.Mov!
      </Title>
      <div className={videoplayer.homePlayer}>
        {video ? (
          <VideoPlayer video={video} />
        ) : (
          <Skeleton>
            <VideoPlayer video={mockVideo}></VideoPlayer>
          </Skeleton>
        )}
      </div>
      <div className={scrollers.scroller} style={{ gridRow: '10' }}>
        <RecentVideoBar title='Recent Videos' />
      </div>
    </div>
  );
}
