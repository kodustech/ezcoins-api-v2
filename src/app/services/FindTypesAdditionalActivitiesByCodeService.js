import TypesAdditionalActivities from '../models/TypesAdditionalActivities';

class FindTypesAdditionalActivitiesByCodeService {
  async run({ code: pCode, transaction = null }) {
    let options = {};
    if (transaction) options = { transaction };

    return TypesAdditionalActivities.findOne({
      attributes: ['id', 'name', 'ezc'],
      where: {
        code: pCode,
      },
      ...options,
    });
  }
}

export default new FindTypesAdditionalActivitiesByCodeService();
