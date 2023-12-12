<script setup lang="ts">
import { ref } from 'vue';
import { extractYouTubeVideoId } from '~/utils/youtubeUtils';
import YoutubePlayer from '~/components/YTPlayer/YoutubePlayer.vue';
import AppHeader from '~/components/AppHeader.vue';
import Button from 'primevue/button';

const videoList = [
  'https://www.youtube.com/watch?v=ytJ_yfyELm4',
  'https://www.youtube.com/watch?v=bmSkGGTcIx8',
  'https://www.youtube.com/watch?v=k0wQRKu50AE',
];
const videoIdList = videoList.map(url => extractYouTubeVideoId(url));

const videoId = ref('bmSkGGTcIx8'); // ytJ_yfyELm4

function togglePlay() {
  ytPlayer.value?.togglePlay();
}

const ytPlayer = ref<InstanceType<typeof YoutubePlayer> | null>(null);
</script>

<template>
  <div class="grid h-screen w-screen grid-rows-[max-content_1fr] overflow-hidden bg-black text-white">
    <AppHeader />
    <main class="grid h-full grid-cols-2">
      <div class="border-r-2 border-gray-400/50">
        <YoutubePlayer class="max-h-full max-w-full" :video-id="videoId" ref="ytPlayer" />
      </div>
      <div>
        <div class="ml-2 mt-4">
          <Button
            label="Play / Pause"
            type="button"
            :pt="{
              root: { class: 'rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700' },
            }"
            @click="togglePlay"
          />
        </div>
        <ul class="p-4">
          <li
            class="cursor-pointer p-2 text-white hover:bg-yellow-100 hover:text-gray-700"
            :class="{ 'bg-yellow-100 !text-gray-600': videoId === id }"
            v-for="id in videoIdList"
            :key="id + ''"
            @click="videoId = id || ''"
          >
            videoId: {{ id }}
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>
