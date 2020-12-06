export default class AmountMinimalExceptions extends Error {
  constructor(value = 0) {
    super();
    this.message = `Valor minimo deve ser ${value} ou maior`;
  }
}
