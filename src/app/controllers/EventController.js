import database from '../../database';
import CreateEventService from '../services/CreateEventService';
import ListEventsService from '../services/ListEventsService';

class EventController {
  async index(req, res) {
    try {
      if (!req.session.isAdmin) {
        throw new UserIsNotAdminExceptions();
      }
      const exchanges = await ListEventsService.run({});
      return res.json(exchanges);
    } catch (error) {
      return res.json({ error });
    }
  }
  async store(req, res) {
    const transaction = await database.connection.transaction();
    try {
      if (!req.session.isAdmin) {
        throw new UserIsNotAdminExceptions();
      }
      const event = await CreateEventService.run({
        transaction,
        event: {
          name: req.body.name,
          description: req.body.description,
          participants: req.body.participants,
        },
      });
      await transaction.commit();
      return res.json(event);
    } catch (error) {
      if (transaction) await transaction.rollback();
      return res.json({ error });
    }
  }
}

export default new EventController();
