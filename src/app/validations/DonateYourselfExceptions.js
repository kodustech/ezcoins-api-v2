export default class DonateYourselfExceptions extends Error {
  constructor() {
    super();
    this.message = 'Você não pode doar para você mesmo!';
  }
}
