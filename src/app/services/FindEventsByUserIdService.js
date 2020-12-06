import Events from '../models/Events';

class FindEventsByUserIdService {
  async run({ userId: pUserId, transaction = null }) {
    let options = {};
    if (transaction) options = { transaction };

    return Events.findAll({
      attributes: ['id', 'name', 'description', 'earned_ezc', 'created_at'],
      where: {
        user_id: pUserId,
      },
      raw: true,
      ...options,
    });
  }
}

export default new FindEventsByUserIdService();
