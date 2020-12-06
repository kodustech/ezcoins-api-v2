import FindEventsByUserIdService from '../services/FindEventsByUserIdService';

class UserEventsController {
  async index(req, res) {
    try {
      const { page = null, paginate = null } = req.query;
      const events = await FindEventsByUserIdService.run({
        userId: req.session.id,
        page,
        paginate,
      });

      return res.json(events);
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new UserEventsController();
