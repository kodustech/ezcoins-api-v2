import Exchanges from '../models/Exchanges';
import ExchangeSchema from '../validations/schemas/ExchangeSchema';
import DebitToWalletService from './DebitToWalletService';
import FindProductService from './FindProductService';
import FindWalletByUserIdService from './FindWalletByUserIdService';

class CreateExchangesService {
  async run({ transaction = null, exchange: pExchange }) {
    let options = {};
    if (transaction) options = { transaction };

    const product = await FindProductService.run({
      transaction,
      id: pExchange.product_id,
    });

    pExchange.cost = product.price;
    await ExchangeSchema.validate(pExchange, {
      abortEarly: false,
    });
    const exchange = await Exchanges.create(pExchange, options);

    //Busco a carteira do usuario solicitando a troca
    const wallet = await FindWalletByUserIdService.run({
      userId: pExchange.user_id,
      transaction,
    });

    await DebitToWalletService.run({
      transaction,
      wallet_id: wallet.id,
      amount: product.price,
    });

    return exchange;
  }
}

export default new CreateExchangesService();
