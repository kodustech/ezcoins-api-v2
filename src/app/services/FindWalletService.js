import Wallets from '../models/Wallets';

class FindWalletService {
  async run({ transaction = null, wallet_id: pWalletId }) {
    let options = {};
    if (transaction) options = { transaction };

    return Wallets.findByPk(pWalletId, options);
  }
}

export default new FindWalletService();
