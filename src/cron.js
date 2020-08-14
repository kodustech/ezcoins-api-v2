/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import CreditEZCToOffer, { test as CreditEZCToOfferTest } from './app/crons/CreditEZCToOffer';
import logger from './logger';

class Cron {
  constructor() {
    this.jobs = [
      {
        process: CreditEZCToOffer,
        test: CreditEZCToOfferTest,
      },
    ];
  }

  async run() {
    try {
      if (process.env.CRON_ACTIVE === 'S') {
        for (const job of this.jobs) {
          job.process.start();
        }
      }

      if (process.env.CRON_TEST === 'S') {
        logger.message('::Iniciado testes de Jobs::');
        for (const job of this.jobs) {
          job.test();
        }
        logger.message('::Fim de testes de Jobs::');
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default new Cron();
