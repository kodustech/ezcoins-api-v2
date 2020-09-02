import TypesAdditionalActivities from '../models/TypesAdditionalActivities';

class ListTypesAdditionalActivitiesService {
  async run({ page, paginate, transaction = null }) {
    let options = {
      attributes: ['id', 'code', 'description', 'ezc'],
    };
    if (transaction) options = { transaction };

    if (page || paginate) {
      page = page || 1;
      paginate = paginate || 5;

      return TypesAdditionalActivities.paginate({
        page: +page,
        paginate: +paginate,
        ...options,
      });
    }

    return TypesAdditionalActivities.findAll(options);
  }
}

export default new ListTypesAdditionalActivitiesService();
