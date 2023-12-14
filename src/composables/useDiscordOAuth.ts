import { useUserStore } from '~/stores/user';
import { useFetch } from '@vueuse/core';
import type { GetDiscordTokenResponse } from '~/types';

const API_URL = import.meta.env.VITE_API_PATH;
const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;

export const useDiscordOAuth = () => {
  const store = useUserStore();

  const fetchDiscordToken = async () => {
    const currentUrl = new URL(location.href);

    if (currentUrl.searchParams.get('state') != 'discord') return;

    const discordCode = currentUrl.searchParams.get('code');
    if (!discordCode) return;

    const { data } = await useFetch(
      `${API_URL}/Discord/GetToken?code=${discordCode}`
    ).json<GetDiscordTokenResponse>();

    if (data.value) {
      store.discordToken = data.value.message.token;
      store.userInfo = data.value.message.discordData;
    }

    window.history.replaceState({}, '', location.href.split('?')[0]);
  };

  function loginWithDiscord() {
    if (store.hasAuthenticated) return;

    document.location = `https://discord.com/api/oauth2/authorize
      ?client_id=${DISCORD_CLIENT_ID}
      &response_type=code
      &redirect_uri=${location.origin}
      &scope=identify
      &state=discord`.replace(/\n| /g, '');
  }

  return {
    fetchDiscordToken,
    loginWithDiscord,
  };
};
