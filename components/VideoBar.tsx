import { ScrollArea } from '@mantine/core';
import VideoBox from '@/components/VideoBox';
import styles from '@/modules/VideoBar.module.css';

interface VideoBarProps {
  videoIDs: string[];
  row?: number;
  title?: string;
}

export default function VideoBar({ videoIDs, row, title }: VideoBarProps) {
  return (
    <div className={styles.videoBarContainer}>
      {title && <h2 className={styles.videoBarTitle}>{title}</h2>}
      <ScrollArea
        style={{ width: '100%' }}
        type='hover'
        scrollbarSize={12}
        className={styles.videoBarContainer}
        styles={{ root: { gridRow: row } }}
        offsetScrollbars
      >
        <div className={styles.videoBar}>
          {videoIDs.map((id) => (
            <VideoBox key={id} videoID={id} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
