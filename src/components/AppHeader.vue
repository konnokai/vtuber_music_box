<script setup lang="ts">
import Button from 'primevue/button';
import { useDiscordOAuth } from '~/composables/useDiscordOAuth';

const { fetchDiscordToken, loginWithDiscord } = useDiscordOAuth();

fetchDiscordToken();

function addSong() {
  console.debug('Add Song');
}
</script>

<template>
  <header
    class="static w-full border-b-2 border-gray-400/50 bg-[#2e2d35] px-2.5 py-4 text-white md:px-8 lg:px-14"
  >
    <div class="flex justify-between">
      <h1 class="text-3xl">VTuber Music Box</h1>
      <div class="flex gap-4 text-3xl">
        <Button
          severity="secondary"
          label="增加歌曲"
          outlined
          :pt="{
            root: { class: 'text-xl rounded bg-gray-300 px-2 text-black hover:bg-gray-500' },
          }"
          @click="addSong"
        />
        <a href="https://github.com/konnokai/vtuber_music_box" target="_blank" rel="noopener noreferrer">
          <i-mdi-github class="cursor-pointer" />
        </a>
        <a href="javascript:;">
          <i-mdi-discord class="cursor-pointer" @click="loginWithDiscord" />
        </a>
      </div>
    </div>
  </header>
</template>
