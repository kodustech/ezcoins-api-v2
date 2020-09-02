import AdditionalActivities from '../models/AdditionalActivities';
import TypesAdditionalActivities from '../models/TypesAdditionalActivities';
import Users from '../models/Users';

class ListAdditionalActivitiesService {
  async run({ page, paginate, user_id = null, transaction = null }) {
    let filter = {};
    if (user_id) filter = { user_id };

    let options = {
      attributes: ['id', 'url'],
      where: filter,
      include: [
        {
          model: TypesAdditionalActivities,
          as: 'typeAdditionalActivities',
          attributes: ['code', 'description', 'ezc'],
        },
        {
          model: Users,
          as: 'author',
        },
      ],
    };
    if (transaction) options = { transaction };

    if (page || paginate) {
      page = page || 1;
      paginate = paginate || 5;

      return AdditionalActivities.paginate({
        page: +page,
        paginate: +paginate,
        ...options,
      });
    }

    return AdditionalActivities.findAll(options);
  }
}

export default new ListAdditionalActivitiesService();
