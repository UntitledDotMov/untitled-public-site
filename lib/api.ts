export async function fetchVideo(videoID: string): Promise<Video> {
  const response = await fetch(`/api/videos/${videoID}`);
  const data: Video = await response.json();
  return data;
}

export async function fetchAllVideoIDs(): Promise<string[]> {
  try {
    const response = await fetch('/api/videos/ids/all');
    if (!response.ok) {
      throw new Error('Failed to fetch video IDs');
    }
    const data: string[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch video IDs');
  }
}

export async function fetchIDsFromPlaylist(playlistID: string): Promise<string[]> {
  try {
    const response = await fetch(`/api/playlists/${playlistID}/videos`);
    if (!response.ok) {
      throw new Error('Failed to fetch video IDs from playlist');
    }
    const data: string[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch video IDs from playlist');
  }
}

export async function fetchRecentVideoIDs(): Promise<string[]> {
  try {
    const response = await fetch('/api/videos/ids/recent');
    if (!response.ok) {
      throw new Error('Failed to fetch recent video IDs');
    }
    const data: { id: string }[] = await response.json();
    return data.map((video) => video.id);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch recent video IDs');
  }
}

export interface Video {
  youtubeID: string;
  title: string;
  description: string;
  uploadedAt: Date;
  live: boolean;
}
