import FindWalletByUserIdService from './FindWalletByUserIdService';
import InsufficientFundsExceptions from '../validations/InsufficientFundsExceptions';

class ValidateBalanceToDonateService {
  async run({ userId: pUserId, quantity: pQuantity, transaction = null }) {
    /**
     * Coleto qual a carteira para verificar se o usúario ainda tem saldo para doar
     */
    const wallet = await FindWalletByUserIdService.run({
      userId: pUserId,
      transaction,
    });

    if (pQuantity > wallet.to_offer) {
      throw new InsufficientFundsExceptions();
    }
  }
}

export default new ValidateBalanceToDonateService();
