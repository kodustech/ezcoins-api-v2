import Wallets from '../models/Wallets';

class ListWalletsService {
  async run({ transaction = null }) {
    let options = {};
    if (transaction) options = { transaction };

    return Wallets.findAll(options);
  }
}

export default new ListWalletsService();
