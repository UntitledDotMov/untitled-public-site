import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { Video } from '@/lib/api';

interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  return (
    <MediaPlayer
      title={video.title}
      src={'https://www.youtube.com/watch?v=' + video.youtubeID}
      aspectRatio='16/9'
      streamType={video.live ? 'live:dvr' : 'on-demand'}
    >
      <MediaProvider>
        <Poster
          className='vds-poster'
          src={'https://i3.ytimg.com/vi/' + video.youtubeID + '/maxresdefault.jpg'}
          alt="This is the video's thumbnail"
        />
      </MediaProvider>
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
};

export default VideoPlayer;
