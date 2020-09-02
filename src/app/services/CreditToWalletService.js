import FindWalletService from './FindWalletService';
import WalletNotFoundExceptions from '../validations/WalletNotFoundExceptions';

class CreditToWalletService {
  async run({ transaction = null, wallet_id: pWalletId, deposit_amount: pDepositAmount }) {
    // const options = {};
    // if (transaction) options = { transaction };

    // Procuro a wallet
    const wallet = await FindWalletService.run({
      transaction,
      wallet_id: pWalletId,
    });

    if (!wallet) throw new WalletNotFoundExceptions();

    wallet.balance = +wallet.balance + +pDepositAmount;

    await wallet.save({ transaction });

    return wallet;
  }
}

export default new CreditToWalletService();
