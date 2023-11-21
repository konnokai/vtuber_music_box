<template>
  <div ref="youtube" />
</template>

<script setup lang="ts">
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

const videoId = ref('bmSkGGTcIx8');
const youtube = ref();

const { onReady } = usePlayer(videoId, youtube, {
  cookie: true,
  playerVars: {
    mute: 0,
    enablejsapi: 1,
    listType: 'user_uploads',
  },
});

onReady(event => {
  setTimeout(() => {
    console.log('1. ' + event.target.getVideoUrl());
    event.target.cueVideoById('ytJ_yfyELm4', 5, 'default');
    setTimeout(() => {
      console.log('2. ' + event.target.getVideoUrl());
    }, 3 * 100);
  }, 5 * 1000);
});
</script>
