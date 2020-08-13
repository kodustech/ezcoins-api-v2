export default class UserSessionNotFoundExceptions extends Error {
  constructor() {
    super();
    this.message = 'O usuário logado não existe ou token expirado';
  }
}
