import Wallets from '../models/Wallets';

class FindWalletByIdService {
  async run({ walletId: pWalletId, transaction = null }) {
    let options = {};
    if (transaction) options = { transaction };

    return Wallets.findByPk(pWalletId, options);
  }
}

export default new FindWalletByIdService();
