import type { PlayerVars } from '@vue-youtube/core';

export interface YTPlayerProps {
  width?: string | number;
  height?: string | number;
  playerVars?: PlayerVars;
  videoId: string;
  cookie?: boolean;
}
