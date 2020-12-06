import AdditionalActivities from '../models/AdditionalActivities';
import TypesAdditionalActivities from '../models/TypesAdditionalActivities';

class FindActivitiesByUserIdService {
  async run({ userId: pUserId, transaction = null }) {
    let options = {};
    if (transaction) options = { transaction };

    return AdditionalActivities.findAll({
      attributes: ['id', 'url'],
      include: [
        {
          model: TypesAdditionalActivities,
          as: 'typeAdditionalActivities',
          attributes: ['description', 'ezc', 'code'],
        },
      ],
      where: {
        user_id: pUserId,
      },
      raw: true,
      ...options,
    });
  }
}

export default new FindActivitiesByUserIdService();
