import FindWalletService from './FindWalletService';
import WalletNotFoundExceptions from '../validations/WalletNotFoundExceptions';

class CreditToWalletEventsService {
  async run({ transaction = null, wallet_id: pWalletId, amount: pAmount }) {
    // Procuro a wallet
    const wallet = await FindWalletService.run({
      transaction,
      wallet_id: pWalletId,
    });

    if (!wallet) throw new WalletNotFoundExceptions();

    wallet.earning_events = Number(wallet.earning_events) + Number(pAmount);

    await wallet.save({ transaction });

    return wallet;
  }
}

export default new CreditToWalletEventsService();
