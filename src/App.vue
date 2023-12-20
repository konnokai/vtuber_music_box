<script setup lang="ts">
import { ref } from 'vue';
import YoutubePlayer from '~/components/YTPlayer/YoutubePlayer.vue';
import AppHeader from '~/components/AppHeader.vue';
import type { TrackProps } from './components/YTPlayer/Prop';

const trackList: Array<TrackProps> = [
  {
    guid: 'kNEbj7Fp1k3v6PJZXcxLDoEBnOyYFJZf',
    videoTitle: '今天沒呼吸的心情',
    videoId: 'ytJ_yfyELm4',
    startAt: 0,
    endAt: 0,
  },
  {
    guid: 'iZgTewTJJ9p3kE8VLjuiCGxk42LsrR67',
    videoTitle: '我反芻著你留下的寂寞',
    videoId: 'bmSkGGTcIx8',
    startAt: 0,
    endAt: 0,
  },
  {
    guid: 'TOVeH1yV6bTKbC6xk4JTSMBKScF1TUr7',
    videoTitle: 'オトナブルー',
    videoId: 'Jt0O_UqE7FU',
    startAt: 200,
    endAt: 384,
  },
  {
    guid: 'xED4sa9EVdGoYJCm5rg0GvQ9miAuUfLb',
    videoTitle: 'ギラギラ',
    videoId: 'Jt0O_UqE7FU',
    startAt: 766,
    endAt: 1041,
  },
];

const track = ref<TrackProps>(trackList[0]);

const ytPlayer = ref<InstanceType<typeof YoutubePlayer> | null>(null);
</script>

<template>
  <div class="grid h-screen w-screen grid-rows-[max-content_1fr] overflow-hidden bg-black text-white">
    <AppHeader />
    <main class="grid h-full grid-cols-2">
      <div class="border-r-2 border-gray-400/50">
        <YoutubePlayer class="max-h-full max-w-full" :track="track" ref="ytPlayer" />
      </div>
      <div>
        <ul class="p-4">
          <li
            class="cursor-pointer p-2 text-white hover:bg-yellow-100 hover:text-gray-700"
            :class="{ 'bg-yellow-100 !text-gray-600': track.guid === trackItem.guid }"
            v-for="trackItem in trackList"
            :key="trackItem.guid + ''"
            @click="track = trackItem || ''"
          >
            {{ trackItem.videoTitle }} ({{ trackItem.videoId }}, {{ trackItem.startAt }})
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>
