'use client';
import { useEffect, useState } from 'react';
import { Skeleton, Text, Title } from '@mantine/core';
import RecentVideoBar from '@/components/RecentVideoBar';
import structure from '@/modules/Structure.module.css';
import VideoPlayer from '@/components/VideoPlayer';
import { fetchRecentVideoIDs, fetchVideo, Video } from '@/lib/api';
import { title } from 'process';

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
      <Title style={{ gridColumn: '1 / span 10', gridRow: '1' }}> Welcome to Untitled.Mov!</Title>
      <div style={{ gridColumn: `5 / span 10`, gridRow: '2 / span 8' }}>
        {video ? (
          <VideoPlayer video={video} />
        ) : (
          <Skeleton>
            <VideoPlayer video={mockVideo}></VideoPlayer>
          </Skeleton>
        )}
      </div>
      <div style={{ gridColumn: '1 / span 18', gridRow: '10' }}>
        <RecentVideoBar title='Recent Videos' />
      </div>
    </div>
  );
}
