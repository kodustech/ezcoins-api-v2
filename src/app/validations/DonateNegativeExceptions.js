export default class DonateNegativeExceptions extends Error {
  constructor() {
    super();
    this.message = 'Eiii! Você não pode saquear o amiguinho!';
  }
}
