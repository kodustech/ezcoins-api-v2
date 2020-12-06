import FindExchangeByUserIdService from '../services/FindExchangeByUserIdService';

class UserExchangeController {
  async index(req, res) {
    try {
      const exchanges = await FindExchangeByUserIdService.run({
        userId: req.session.id,
      });

      return res.json(exchanges);
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new UserExchangeController();
