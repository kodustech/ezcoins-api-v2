export default class UserDiscordNotFoundExceptions extends Error {
  constructor() {
    super();
    this.message = 'Falha ao identificar o usuário do discord.';
  }
}
