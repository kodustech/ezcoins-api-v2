import Events from '../models/Events';

class ListEventsService {
  async run({ page, paginate, transaction = null }) {
    let options = {
      attributes: ['id', 'name', 'description', 'earned_ezc', 'created_at'],
      raw: true,
      include: [
        {
          model: Users,
          as: 'rescuedBy',
          attributes: ['id', 'name'],
        },
      ],
    };
    if (transaction) options = { transaction };

    if (page || paginate) {
      page = page || 1;
      paginate = paginate || 5;

      return Events.paginate({
        page: +page,
        paginate: +paginate,
        ...options,
      });
    }

    return Events.findAll(options);
  }
}

export default new ListEventsService();
