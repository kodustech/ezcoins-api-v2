import ListAdditionalActivitiesService from '../services/ListAdditionalActivitiesService';
import FindTypesAdditionalActivitiesByCodeService from '../services/FindTypesAdditionalActivitiesByCodeService';
import database from '../../database';
import CreateAdditionalActivitiesService from '../services/CreateAdditionalActivitiesService';

class AdditionalActivities {
  async index(req, res) {
    try {
      const { page = null, paginate = null } = req.query;

      const additionalActivities = await ListAdditionalActivitiesService.run({ page, user_id: req.session.id, paginate });

      return res.json(additionalActivities);
    } catch (err) {
      console.log(err);
      return res.json({
        error: err,
      });
    }
  }

  async store(req, res) {
    const transaction = await database.connection.transaction();
    try {
      const user_id = req.session.id;
      const typeCode = req.params.code || '';
      const { url } = req.body;

      const typeAdditionalActivities = await FindTypesAdditionalActivitiesByCodeService.run({
        code: typeCode,
        transaction,
      });

      const additionalActivities = await CreateAdditionalActivitiesService.run({
        transaction,
        additionalActivities: {
          user_id,
          type_additional_activities_id: typeAdditionalActivities.id,
          url,
        },
      });

      await transaction.commit();
      return res.json(additionalActivities);
    } catch (err) {
      console.log(err);
      if (transaction) await transaction.rollback();
      return res.json({
        error: err,
      });
    }
  }
}

export default new AdditionalActivities();
