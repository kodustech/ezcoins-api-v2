import Events from '../models/Events';

class FindEventsByUserIdService {
  async run({ userId: pUserId, page, paginate, transaction = null }) {
    let options = {};
    if (transaction) options = { transaction };

    if (page || paginate) {
      page = page || 1;
      paginate = paginate || 5;

      return Events.paginate({
        page: +page,
        paginate: +paginate,
        where: {
          user_id: pUserId,
        },
        ...options,
      });
    }

    return Events.findAll({
      attributes: ['id', 'name', 'description', 'earned_ezc', 'created_at'],
      where: {
        user_id: pUserId,
      },
      ...options,
    });
  }
}

export default new FindEventsByUserIdService();
