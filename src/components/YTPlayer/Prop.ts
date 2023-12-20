import type { PlayerVars } from '@vue-youtube/core';

export interface YTPlayerProps {
  width?: string | number;
  height?: string | number;
  playerVars?: PlayerVars;
  track: TrackProps;
  cookie?: boolean;
}

export interface TrackProps {
  guid: string;
  videoTitle: string;
  videoId: string;
  startAt: number;
  endAt: number;
}
