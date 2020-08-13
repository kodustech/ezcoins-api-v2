import Users from '../models/Users';
import Wallets from '../models/Wallets';
import Donations from '../models/Donations';

class ListUsersService {
  async run({ transaction = null }) {
    let options = {
      attributes: ['name', 'email', 'id'],
      include: [
        {
          model: Wallets,
          as: 'wallets',
        },
        {
          model: Donations,
          as: 'donations',
          include: [
            {
              attributes: ['name', 'created_at'],
              model: Users,
              as: 'receiverBy',
            },
          ],
        },
        {
          model: Donations,
          as: 'received',
          include: [
            {
              attributes: ['name', 'created_at'],
              model: Users,
              as: 'senderBy',
            },
          ],
        },
      ],
    };
    if (transaction) options = { transaction };

    return Users.findAll(options);
  }
}

export default new ListUsersService();
