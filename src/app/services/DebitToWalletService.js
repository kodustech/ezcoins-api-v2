import FindWalletService from './FindWalletService';
import WalletNotFoundExceptions from '../validations/WalletNotFoundExceptions';
import AmountMinimalExceptions from '../validations/AmountMinimalExceptions';
import InsufficientFundsExceptions from '../validations/InsufficientFundsExceptions';

class DebitToWalletService {
  async run({ transaction = null, wallet_id: pWalletId, amount: pAmount }) {
    // Procuro a wallet
    const wallet = await FindWalletService.run({
      transaction,
      wallet_id: pWalletId,
    });

    if (!wallet) throw new WalletNotFoundExceptions();
    if (pAmount < 0) throw new AmountMinimalExceptions(0);
    wallet.balance = Number(wallet.balance) - Number(pAmount);
    if (wallet.balance < 0) throw new InsufficientFundsExceptions();
    wallet.to_exchange = Number(wallet.to_exchange) + Number(pAmount);
    await wallet.save({ transaction });

    return wallet;
  }
}

export default new DebitToWalletService();
