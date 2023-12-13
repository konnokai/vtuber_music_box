import { defineStore, acceptHMRUpdate } from 'pinia';
import { computed, ref } from 'vue';
import type { DiscordUser } from '~/types';

export const useUserStore = defineStore('user-store', () => {
  const userInfo = ref<DiscordUser>({
    id: '',
    username: '',
    avatar: '',
    discriminator: '',
    banner: '',
  });

  const discordToken = ref<string>('');

  const hasAuthenticated = computed(() => userInfo.value.id !== '');

  return {
    userInfo,
    discordToken,
    hasAuthenticated,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
