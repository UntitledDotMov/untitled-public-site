import { useEffect, useState } from 'react';
import { Card, Image, Text, Loader, Box, Skeleton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { fetchVideo, Video } from '@/lib/api';
import dayjs from 'dayjs';

interface VideoBoxProps {
  videoID: string;
}

const VideoBox: React.FC<VideoBoxProps> = ({ videoID }) => {
  const [video, setVideo] = useState<Video | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadVideo = async () => {
      if (videoID) {
        const fetchedVideo = await fetchVideo(videoID);
        setVideo(fetchedVideo);
      }
    };

    loadVideo();
  }, [videoID]);

  if (!video) {
    return (
      <Skeleton style={{ gridColumn: 'span 3' }} visible={true} height={'auto'} radius={'sm'}>
        <Card shadow='sm' padding='lg'>
          <Card.Section>
            <Image
              src={`https://i3.ytimg.com/vi/dwy4iOY_1IM/maxresdefault.jpg`}
              alt='Placeholder Thumbnail'
              height='auto'
              width='auto'
              fit='contain'
            />
          </Card.Section>
          <Text size='lg' mt='md'>
            Placeholder Title
          </Text>
        </Card>
      </Skeleton>
    );
  }

  return (
    <Card
      shadow='sm'
      padding='lg'
      style={{ cursor: 'pointer', gridColumn: 'span 3' }}
      onClick={() => router.push(`/videos/${videoID}`)}
    >
      <Card.Section>
        <Image
          src={`https://i3.ytimg.com/vi/${video.youtubeID}/maxresdefault.jpg`}
          alt={video.title}
          height='auto'
          width='auto'
          fit='contain'
        />
      </Card.Section>
      <Text size='lg' mt='md'>
        {video.title}
      </Text>
      <Text size='sm'>{dayjs(video.uploadedAt).format('DD/MM/YYYY')}</Text>
    </Card>
  );
};

export default VideoBox;
