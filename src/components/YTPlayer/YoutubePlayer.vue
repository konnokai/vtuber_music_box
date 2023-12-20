<script setup lang="ts">
import { ref, watch, withDefaults } from 'vue';
import { usePlayer } from '@vue-youtube/core';
import type { YTPlayerProps } from './Prop';

const props = withDefaults(defineProps<YTPlayerProps>(), {
  width: 720,
  height: 405,
  playerVars: () => ({
    autoplay: 0,
    time: 0,
    mute: 0,
  }),
  cookie: true,
});

const emit = defineEmits([
  'playback-quality-change',
  'playback-rate-change',
  'state-change',
  'api-change',
  'error',
  'ready',
]);

const player = ref<HTMLDivElement>();

const {
  instance,
  togglePlay,
  toggleMute,
  onPlaybackQualityChange,
  onPlaybackRateChange,
  onStateChange,
  onApiChange,
  onError,
  onReady,
} = usePlayer(props.track.videoId, player, {
  playerVars: props.playerVars,
  height: props.height,
  cookie: props.cookie,
  width: props.width,
});

onPlaybackQualityChange(event => {
  emit('playback-quality-change', event);
});

onPlaybackRateChange(event => {
  emit('playback-rate-change', event);
});

onStateChange(event => {
  emit('state-change', event);
});

onApiChange(event => {
  emit('api-change', event);
});

onError(event => {
  emit('error', event);
});

onReady(event => {
  emit('ready', event);
});

watch(
  () => props.track.guid,
  (newId, oldId) => {
    if (newId !== oldId) {
      instance.value?.loadVideoById({
        videoId: props.track.videoId,
        startSeconds: props.track.startAt,
        endSeconds: props.track.endAt,
      });
    }
  }
);

defineExpose({
  togglePlay,
  toggleMute,
  instance,
});
</script>

<template>
  <div ref="player"></div>
</template>
