import cron from 'node-cron';
import GetConfigurationsService from '../services/GetConfigurationsService';
import logger from '../../logger';
import ListWalletsService from '../services/ListWalletsService';

const CreditEZCToOffer = async () => {
  logger.message(`..::Iniciando o Job:: ${CreditEZCToOffer.name}`);
  const configurations = await GetConfigurationsService.run({});
  const limitDonation = configurations.find((config) => config.name === 'LIMIT_DONATION');
  const wallets = await ListWalletsService.run({});
  wallets.forEach(async (wallet) => {
    wallet.to_offer = limitDonation.value;
    await wallet.save();
    logger.message(`..::Carteira: ${wallet.id}:: Recarregada`);
  });
  logger.message(`..::Fim do Job:: ${CreditEZCToOffer.name}`);
};

export const test = async () => CreditEZCToOffer();

export default cron.schedule('0 1 1 * *', CreditEZCToOffer, {
  scheduled: false,
  timezone: 'America/Sao_Paulo',
});
