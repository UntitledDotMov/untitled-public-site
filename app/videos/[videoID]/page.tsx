'use client';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import structure from '@/modules/Structure.module.css';
import { Title, Text, Loader, Box } from '@mantine/core';
import dayjs from 'dayjs';
import { fetchVideo, Video } from '@/lib/api';
import VideoPlayer from '@/components/VideoPlayer';

export default function Page() {
  const { videoID } = useParams();
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    const loadVideo = async () => {
      if (videoID) {
        const fetchedVideo = await fetchVideo(videoID as string);
        setVideo(fetchedVideo);
      }
    };

    loadVideo();
  }, [videoID]);

  if (!video) {
    return (
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
          width: '100%',
        }}
      >
        <Loader />
      </Box>
    );
  }

  return (
    <div className={structure.pagegrid}>
      <div style={{ gridColumn: `1 / span 9`, gridRow: '2 / span 8' }}>
        <VideoPlayer video={video} />
      </div>
      <Title style={{ gridColumn: '1 / span 5', gridRow: '1' }}>{video.title}</Title>
      <Text style={{ gridColumn: '1 / span 5', gridRow: '11 / span 1' }}>{video.description}</Text>
      <Text size='lg' fw={700} style={{ gridColumn: '1 / span 3', gridRow: '10' }}>
        Uploaded on {dayjs(video.uploadedAt).format('MMMM D, YYYY')}
      </Text>
    </div>
  );
}
