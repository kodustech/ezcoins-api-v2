import FindWalletByUserIdService from './FindWalletByUserIdService';

class DonationWithdrawlService {
  async run({ quantity: pQuantity, userId: pUserId, transaction = null }) {
    const wallet = await FindWalletByUserIdService.run({
      userId: pUserId,
      transaction,
    });

    wallet.to_offer = +wallet.to_offer - +pQuantity;
    return wallet.save();
  }
}

export default new DonationWithdrawlService();
