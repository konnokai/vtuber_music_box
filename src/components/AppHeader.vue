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
        <i-mdi-github class="cursor-pointer" @click="openGitHub" />
        <i-mdi-discord class="cursor-pointer" @click="loginDiscord" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue';
import Async from './Async.vue';
import Button from 'primevue/button';

const discordClientId = inject('discordClientId');
const apiURL = inject('apiURL');

const emit = defineEmits(['auth']);
const userInfo = ref<DiscordUser>({} as DiscordUser);
const isFetching = ref<boolean>(false);

const isAuthed = computed<boolean>(() => !!userInfo.value.id);

interface DiscordUser {
  avatar: string;
  banner: string;
  discriminator: string;
  id: string;
  username: string;
}

interface CallBackResponse {
  code: number;
  message: ApiResult;
}

interface ApiResult {
  token: string;
  discordData: DiscordUser;
}

interface DiscordTokenRespnose {
  discordToken?: string;
  error?: any;
}

onMounted(async () => {
  const discordData = sessionStorage.getItem('DD');
  const discordToken = sessionStorage.getItem('DT');

  if (discordData) {
    userInfo.value = JSON.parse(discordData);
  }
  await fetchDiscordToken();

  if (discordToken) {
    emit('auth', true);
  }
});

const fetchDiscordToken: AsyncFn<DiscordTokenRespnose> = async () => {
  const currentUrl = new URL(location.href);

  if (currentUrl.searchParams.get('state') != 'discord') return { error: 'invalid state' };
  const discordCode = currentUrl.searchParams.get('code');

  isFetching.value = true;

  try {
    const result = await fetch(`${apiURL}/Discord/GetToken?code=${discordCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!result.ok) throw result;

    const response = (await result.json()) as CallBackResponse;
    if (response.code != 200) throw response;
    const discordToken = response.message.token;
    userInfo.value = response.message.discordData;

    sessionStorage.setItem('DT', discordToken);
    sessionStorage.setItem('DD', JSON.stringify(userInfo.value)); // discordData
    window.history.replaceState({}, '', location.href.split('?')[0]);
    emit('auth', true);

    return { discordToken };
  } catch (error: any) {
    console.error(error);
    return { error };
  } finally {
  }
};

function addSong() {
  console.debug('Add Song');
}

function openGitHub() {
  window.open('https://github.com/konnokai/vtuber_music_box', '_blank');
}

function loginDiscord() {
  if (isAuthed.value) return;

  document.location = `https://discord.com/api/oauth2/authorize
    ?client_id=${discordClientId}
    &response_type=code
    &redirect_uri=${location.origin}
    &scope=identify
    &state=discord`.replace(/\n| /g, '');
}
</script>
