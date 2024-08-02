'use client';
import { useEffect, useState } from 'react';
import { Text, Title } from '@mantine/core';
import VideoBox from '@/components/VideoBox';
import structure from '@/modules/Structure.module.css';
import VideoBar from '@/components/VideoBar';
import { fetchAllVideoIDs } from '@/lib/api';
import PlaylistVideoBar from '@/components/PlaylistVideoBar';
import RecentVideoBar from '@/components/RecentVideoBar';

export default function Videos() {
  const [videoIDs, setVideoIDs] = useState<string[]>([]);

  useEffect(() => {
    async function fetchVideoIDs() {
      setVideoIDs(await fetchAllVideoIDs());
    }

    fetchVideoIDs();
  }, []);

  return (
    <div className={structure.pagegrid}>
      <Title style={{ gridColumn: '1 / span 18', gridRow: '1' }}>Videos</Title>

      <PlaylistVideoBar playlistId='1' title='Season 1' />
      <PlaylistVideoBar playlistId='2' title='Season 2' />
      <PlaylistVideoBar playlistId='3' title='Season 3' />
      <PlaylistVideoBar playlistId='4' title='Season 4' />
      <PlaylistVideoBar playlistId='5' title='Season 5' />
    </div>
  );
}
