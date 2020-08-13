import cron from 'node-cron';
import GetConfigurationsService from '../services/GetConfigurationsService';
const CreditEZCToOffer = async () => {
  const configurations = await GetConfigurationsService.run({});
  console.log(configurations);
  const limitDonation = configurations.find((config) => config.name === 'LIMIT_DONATION');

  console.log('CreditEZCToOffer -> limitDonation -> ', limitDonation.value);
};

export const test = async () => await CreditEZCToOffer();

export default cron.schedule('*/1 * * * *', CreditEZCToOffer, {
  scheduled: false,
  timezone: 'America/Sao_Paulo',
});
