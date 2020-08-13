import DonateSchema from '../validations/schemas/DonateSchema';
import Donations from '../models/Donations';
import Users from '../models/Users';
import ValidateBalanceToDonateService from './ValidateBalanceToDonateService';
import DonationDepositToUserIdService from './DonationDepositToUserIdService';
import DonationWithdrawlService from './DonationWithdrawlService';

class CreateDonateService {
  async run({ donation: pDonation, transaction = null }) {
    let options = {
      attributes: ['id', 'quantity', 'created_at', 'reason'],
      include: [
        {
          model: Users,
          as: 'receiverBy',
        },
        {
          model: Users,
          as: 'senderBy',
        },
      ],
    };
    if (transaction) options = { ...options, transaction };

    await DonateSchema.validate(pDonation, {
      abortEarly: false,
    });

    // Antes de Gerar a doação verifico se o usuário possui saldo suficiente para doar
    await ValidateBalanceToDonateService.run({
      userId: pDonation.sender_user_id,
      quantity: pDonation.quantity,
      transaction,
    });
    // Após ter conseguido validar o saldo do doador, registramos a donation e damos baixa
    const donate = Donations.create(pDonation, options);
    await DonationDepositToUserIdService.run({
      quantity: pDonation.quantity,
      userId: pDonation.receiver_user_id,
      transaction,
    });

    await DonationWithdrawlService.run({
      quantity: pDonation.quantity,
      userId: pDonation.sender_user_id,
    });

    return donate;
  }
}

export default new CreateDonateService();
