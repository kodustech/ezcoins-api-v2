import FindExchangeByUserIdService from '../services/FindExchangeByUserIdService';

class UserExchangeController {
  async index(req, res) {
    try {
      const { page = null, paginate = null } = req.query;

      const exchanges = await FindExchangeByUserIdService.run({
        userId: req.session.id,
        page,
        paginate,
      });

      return res.json(exchanges);
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new UserExchangeController();
