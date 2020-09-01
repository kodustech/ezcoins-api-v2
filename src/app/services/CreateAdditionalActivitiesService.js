import AdditionalActivities from '../models/AdditionalActivities';
import CreditToWalletService from './CreditToWalletService';
import FindWalletByUserIdService from './FindWalletByUserIdService';
import WalletNotFoundExceptions from '../validations/WalletNotFoundExceptions';
import FindTypesAdditionalActivitiesService from './FindTypesAdditionalActivitiesService';
import CreditToWalletExtrasService from './CreditToWalletExtrasService';

class CreateAdditionalActivitiesService {
  async run({ transaction = null, additionalActivities: pAdditionalActivities }) {
    let options = {};
    if (transaction) options = { transaction };
    const { id, user_id, type_additional_activities_id, url, created_at } = await AdditionalActivities.create(pAdditionalActivities, {
      ...options,
    });

    const type = await FindTypesAdditionalActivitiesService.run({
      type_additional_activities: pAdditionalActivities.type_additional_activities_id,
      transaction,
    });

    const wallet = await FindWalletByUserIdService.run({
      userId: pAdditionalActivities.user_id,
      transaction,
    });

    if (!wallet) throw new WalletNotFoundExceptions();

    // Credito os EZC para o colaborador
    await CreditToWalletService.run({
      deposit_amount: type.ezc,
      wallet_id: wallet.id,
      transaction,
    });

    // Credito os EZC para os extras
    await CreditToWalletExtrasService.run({
      deposit_amount: type.ezc,
      wallet_id: wallet.id,
      transaction,
    });

    return {
      id,
      user_id,
      type_additional_activities_id,
      url,
      created_at,
      gainedEzc: type.ezc,
    };
  }
}

export default new CreateAdditionalActivitiesService();
