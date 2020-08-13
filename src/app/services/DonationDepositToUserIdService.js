import FindWalletByUserIdService from './FindWalletByUserIdService';

class DonationDepositToUserIdService {
  async run({ userId: pUserId, quantity: pQuantity, transaction = null }) {
    const wallet = await FindWalletByUserIdService.run({
      userId: pUserId,
      transaction,
    });

    wallet.balance = +wallet.balance + +pQuantity;
    wallet.received = +wallet.received + +pQuantity;
    return wallet.save();
  }
}

export default new DonationDepositToUserIdService();
