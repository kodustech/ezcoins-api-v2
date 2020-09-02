import TypesAdditionalActivities from '../models/TypesAdditionalActivities';

class FindTypesAdditionalActivitiesServicer {
  async run({ transaction = null, type_additional_activities: pTypeAdditionalActivitiesId }) {
    let options = {
      attributes: ['id', 'code', 'description', 'ezc'],
    };
    if (transaction) options = { ...options, transaction };

    return TypesAdditionalActivities.findByPk(pTypeAdditionalActivitiesId, options);
  }
}

export default new FindTypesAdditionalActivitiesServicer();
