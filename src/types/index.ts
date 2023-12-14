export interface DiscordUser {
  avatar: string;
  banner: string;
  discriminator: string;
  id: string;
  username: string;
}

export interface GetDiscordTokenResponse {
  code: number;
  message: DiscordGetTokenResult;
}

export interface DiscordGetTokenResult {
  token: string;
  discordData: DiscordUser;
}
