import WalletSchema from '../validations/schemas/WalletSchema';
import Wallets from '../models/Wallets';

class CreateWalletService {
  async run({ transaction = null, userId: pUserId, wallet: pWallet = {} }) {
    let options = {};
    if (transaction) options = { transaction };
    if (pUserId) pWallet.owner_user_id = pUserId;
    pWallet = {
      ...pWallet,
      balance: 0,
      received: 0,
      to_offer: 25,
    };

    await WalletSchema.validate(pWallet, {
      abortEarly: false,
    });

    return Wallets.create(pWallet, options);
  }
}

export default new CreateWalletService();
