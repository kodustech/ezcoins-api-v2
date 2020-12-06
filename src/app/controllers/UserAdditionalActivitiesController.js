import FindActivitiesByUserIdService from '../services/FindActivitiesByUserIdService';

class UserAdditionalActivitiesController {
  async index(req, res) {
    try {
      const activities = await FindActivitiesByUserIdService.run({
        userId: req.session.id,
      });
      return res.json(activities);
    } catch (err) {
      return res.json({ error: err });
    }
  }
}

export default new UserAdditionalActivitiesController();
