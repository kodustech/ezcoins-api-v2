import FindWalletService from './FindWalletService';
import WalletNotFoundExceptions from '../validations/WalletNotFoundExceptions';

class CreditToWalletExtrasService {
  async run({ transaction = null, wallet_id: pWalletId, deposit_amount: pDepositAmount }) {
    // Procuro a wallet
    const wallet = await FindWalletService.run({
      transaction,
      wallet_id: pWalletId,
    });

    if (!wallet) throw new WalletNotFoundExceptions();

    wallet.extras = +wallet.extras + +pDepositAmount;

    await wallet.save({ transaction });

    return wallet;
  }
}

export default new CreditToWalletExtrasService();
