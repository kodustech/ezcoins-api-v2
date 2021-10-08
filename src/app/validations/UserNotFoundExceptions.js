export default class UserNotFoundExceptions extends Error {
  constructor() {
    super();
    this.message = 'O usuário não existe';
  }
}
