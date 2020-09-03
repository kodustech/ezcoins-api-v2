import database from '../../database';
import CreateDonateService from '../services/CreateDonateService';
import FindUserByDiscordIdService from '../services/FindUserByDiscordIdService';
import DonateYourselfExceptions from '../validations/DonateYourselfExceptions';

class DonationsController {
  async store(req, res) {
    const transaction = await database.connection.transaction();
    let { receiverId } = req.params;
    try {
      if (req.session.isDiscordSession) {
        const { id } = await FindUserByDiscordIdService.run({
          id: receiverId,
        });

        receiverId = id;
      }
      if (receiverId === req.session.id) {
        throw new DonateYourselfExceptions();
      }
      const donation = await CreateDonateService.run({
        donation: {
          sender_user_id: req.session.id,
          receiver_user_id: receiverId,
          quantity: req.params.quantity,
          reason: req.body.reason,
        },
        transaction,
      });
      await transaction.commit();
      return res.json(donation);
    } catch (err) {
      console.log('ERro!');
      console.log(err);
      if (transaction) await transaction.rollback();
      return res.json({
        error: err,
      });
    }
  }
}

export default new DonationsController();
