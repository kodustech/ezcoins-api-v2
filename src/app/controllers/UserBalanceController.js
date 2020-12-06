import FindWalletByUserIdService from '../services/FindWalletByUserIdService';

class UserBalanceController {
  async index(req, res) {
    const wallet = await FindWalletByUserIdService.run({
      userId: req.session.id,
    });

    res.json({
      balance: +wallet.balance,
      received: +wallet.received,
      to_offer: +wallet.to_offer,
      earning_events: +wallet.earning_events,
      to_exchange: +wallet.to_exchange,
      extras: +wallet.extras,
    });
  }
}

export default new UserBalanceController();
