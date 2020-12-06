import database from '../../database';
import CreateExchangesService from '../services/CreateExchangesService';

const { default: ListExchangesService } = require('../services/ListExchangesService');

class ExchangesController {
  async index(req, res) {
    try {
      if (!req.session.isAdmin) {
        throw new UserIsNotAdminExceptions();
      }
      const exchanges = await ListExchangesService.run({});
      return res.json(exchanges);
    } catch (error) {
      return res.json({ error });
    }
  }
  async store(req, res) {
    const transaction = await database.connection.transaction();
    try {
      const exchange = await CreateExchangesService.run({
        transaction,
        exchange: {
          product_id: req.body.product_id,
          user_id: req.session.id,
          created_at: req.body.created_at || new Date(),
        },
      });
      await transaction.commit();

      return res.json(exchange);
    } catch (error) {
      if (transaction) await transaction.rollback();
      return res.json({ error });
    }
  }
}

export default new ExchangesController();
