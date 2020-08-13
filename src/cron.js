import CreditEZCToOffer, { test as CreditEZCToOfferTest } from './app/crons/CreditEZCToOffer';

class Cron {
  async run() {
    try {
      // if (process.env.CRON_ACTIVE === 'S') this.jobs.forEach((job) => job.start());
      if (process.env.CRON_ACTIVE === 'S') {
        await CreditEZCToOffer.start();
        // this.jobs.forEach(async (job) => await job.test());
        // for (let job of this.jobs) {
        //   // console.log(job);
        //   // await job.test();
        //   await job.job.start();
        // }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default new Cron();
