import { defineStore, acceptHMRUpdate } from 'pinia';
import { computed, ref, watchEffect } from 'vue';
import type { DiscordUser } from '~/types';

export const useUserStore = defineStore('user-store', () => {
  const userInfo = ref<DiscordUser>({
    id: '',
    username: '',
    avatar: '',
    discriminator: '',
    banner: '',
  });

  const discordToken = ref('');

  const hasAuthenticated = computed(() => userInfo.value.id !== '');

  loadFromSessionStorage();

  watchEffect(() => {
    sessionStorage.setItem('DD', JSON.stringify(userInfo.value));
    sessionStorage.setItem('DT', discordToken.value);
  });

  function loadFromSessionStorage() {
    try {
      const data = sessionStorage.getItem('DD');
      if (data) {
        userInfo.value = JSON.parse(data) as DiscordUser;
      }
      discordToken.value = sessionStorage.getItem('DT') ?? '';
    } catch (error) {
      console.error('Error parsing sessionStorage data', error);
    }
  }

  return {
    userInfo,
    discordToken,
    hasAuthenticated,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
