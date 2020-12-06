import Events from '../models/Events';
import EventSchema from '../validations/schemas/EventSchema';
import CreditToWalletEventsService from './CreditToWalletEventsService';
import CreditToWalletService from './CreditToWalletService';
import FindWalletByUserIdService from './FindWalletByUserIdService';

class CreateEventService {
  async run({ transaction = null, event: pEvent }) {
    let options = {};
    if (transaction) options = { transaction };

    await EventSchema.validate(pEvent, {
      abortEarly: false,
    });

    const events = pEvent.participants.map((member) => ({
      user_id: member.user_id,
      name: pEvent.name,
      description: pEvent.description,
      earned_ezc: member.earned_ezc,
    }));

    for (let i = 0; i < events.length; i++) {
      await Events.create(events[i], options);
      //Atualiza a carteira
      const wallet = await FindWalletByUserIdService.run({
        userId: events[i].user_id,
        transaction,
      });

      await CreditToWalletService.run({
        transaction,
        wallet_id: wallet.id,
        deposit_amount: events[i].earned_ezc,
      });

      await CreditToWalletEventsService.run({
        transaction,
        wallet_id: wallet.id,
        amount: events[i].earned_ezc,
      });
    }

    return pEvent;
  }
}

export default new CreateEventService();
