import Users from '../models/Users';

class FindUserByDiscordIdService {
  async run({ id: pId }) {
    return Users.findOne({
      where: {
        discord_id: pId,
      },
    });
  }
}

export default new FindUserByDiscordIdService();
