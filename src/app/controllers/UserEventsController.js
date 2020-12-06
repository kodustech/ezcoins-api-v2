import FindEventsByUserIdService from '../services/FindEventsByUserIdService';

class UserEventsController {
  async index(req, res) {
    try {
      const events = await FindEventsByUserIdService.run({
        userId: req.session.id,
      });

      return res.json(events);
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new UserEventsController();
