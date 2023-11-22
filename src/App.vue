<script setup lang="ts">
import { ref } from 'vue';
import { extractYouTubeVideoId } from '~/utils/youtubeUtils';
import YoutubePlayer from '~/components/YTPlayer/YoutubePlayer.vue';

const videoList = [
  'https://www.youtube.com/watch?v=ytJ_yfyELm4',
  'https://www.youtube.com/watch?v=bmSkGGTcIx8',
];
const videoIdList = videoList.map(url => extractYouTubeVideoId(url));

const videoId = ref('bmSkGGTcIx8'); // ytJ_yfyELm4

function handleGoNext() {
  videoId.value = 'ytJ_yfyELm4';
}

function handleGoPrev() {
  videoId.value = 'bmSkGGTcIx8';
}

function togglePlay() {
  ytPlayer.value?.togglePlay();
}

const ytPlayer = ref<InstanceType<typeof YoutubePlayer> | null>(null);
</script>

<template>
  <YoutubePlayer :video-id="videoId" ref="ytPlayer" />
  <div class="ml-2 mt-4 flex gap-4">
    <button
      type="button"
      class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      @click="handleGoPrev"
    >
      Prev
    </button>
    <button
      type="button"
      class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      @click="togglePlay"
    >
      Play
    </button>
    <button
      type="button"
      class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      @click="handleGoNext"
    >
      Next
    </button>
  </div>
  <ul class="p-4">
    <li
      class="cursor-pointer p-2 hover:bg-yellow-100"
      v-for="id in videoIdList"
      :key="id + ''"
      @click="videoId = id || ''"
    >
      videoId: {{ id }}
    </li>
  </ul>
</template>
