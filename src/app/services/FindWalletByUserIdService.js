import Wallets from '../models/Wallets';
import Users from '../models/Users';
import Donations from '../models/Donations';

class FindWalletByUserIdService {
  async run({ userId: pUserId, transaction = null }) {
    let options = {};
    if (transaction) options = { transaction };

    return Wallets.findOne({
      ...options,
      include: {
        model: Users,
        as: 'ownerUser',
        attributes: ['id', 'name'],
        include: [
          {
            attributes: ['quantity'],
            model: Donations,
            as: 'received',
          },
          {
            attributes: ['quantity'],
            model: Donations,
            as: 'donations',
          },
        ],
      },
      where: {
        owner_user_id: pUserId,
      },
    });
  }
}

export default new FindWalletByUserIdService();
