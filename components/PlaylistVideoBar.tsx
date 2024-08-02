import React, { useEffect, useState } from 'react';
import VideoBar from '@/components/VideoBar';
import { fetchIDsFromPlaylist } from '@/lib/api';
import { title } from 'process';

interface PlaylistVideoBarProps {
  playlistId: string;
  row?: number;
  title?: string;
}

export default function PlaylistVideoBar({ playlistId, row, title }: PlaylistVideoBarProps) {
  const [videoIDs, setVideoIDs] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchIDsFromPlaylist(playlistId);
        setVideoIDs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [playlistId]);

  return <VideoBar videoIDs={videoIDs} row={row} title={title} />;
}
