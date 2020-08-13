import cron from 'node-cron';
import CreditEZCToOffer from './app/crons/CreditEZCToOffer';

class Cron {
  run() {
    const options = {
      scheduled: true,
      timezone: 'America/Sao_Paulo',
    };
    cron.schedule('0 0 1 1 1/1 *', CreditEZCToOffer, options);
  }
}

export default new Cron();
