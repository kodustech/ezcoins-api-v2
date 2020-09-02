export default class WalletNotFoundExceptions extends Error {
  constructor() {
    super();
    this.message = 'Carteira não encontrada.';
  }
}
