import FindWalletByUserIdService from './FindWalletByUserIdService';
import DonateNegativeExceptions from '../validations/DonateNegativeExceptions';

class DonationWithdrawlService {
  async run({ quantity: pQuantity, userId: pUserId, transaction = null }) {
    const wallet = await FindWalletByUserIdService.run({
      userId: pUserId,
      transaction,
    });

    if (Math.sign(pQuantity) === -1) throw new DonateNegativeExceptions();

    wallet.to_offer = +wallet.to_offer - +pQuantity;
    return wallet.save();
  }
}

export default new DonationWithdrawlService();
