import ListTypesAdditionalActivitiesService from '../services/ListTypesAdditionalActivitiesService';

class TypesAdditionalActivitiesController {
  async index(req, res) {
    try {
      const { page = null, paginate = null } = req.query;

      const typesAdditionalActivities = await ListTypesAdditionalActivitiesService.run({ page, paginate });
      return res.json(typesAdditionalActivities);
    } catch (err) {
      console.log(err);
      return res.json({
        error: err,
      });
    }
  }
}

export default new TypesAdditionalActivitiesController();
