export default class InsufficientFundsExceptions extends Error {
  constructor() {
    super();
    this.message = 'Saldo Insuficiente ';
  }
}
