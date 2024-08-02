import React, { useEffect, useState } from 'react';
import VideoBar from '@/components/VideoBar';
import { fetchRecentVideoIDs } from '@/lib/api';

interface RecentVideoBarProps {
  row?: number;
  title?: string;
}

export default function RecentVideoBar({ row, title }: RecentVideoBarProps) {
  const [videoIDs, setVideoIDs] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecentVideoIDs();
        setVideoIDs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <VideoBar videoIDs={videoIDs} row={row} title={title} />;
}
