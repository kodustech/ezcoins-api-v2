import UserSchema from '../validations/schemas/UserSchema';
import Users from '../models/Users';
import CreateWalletService from './CreateWalletService';

class CreateUserService {
  async run({ transaction = null, user: pUser }) {
    let options = {};
    if (transaction) options = { transaction };

    await UserSchema.validate(pUser, {
      abortEarly: false,
    });

    const user = await Users.create(pUser, options);
    // Gera a carteira desse usuário novo
    await CreateWalletService.run({
      userId: user.id,
      transaction,
    });

    return user;
  }
}

export default new CreateUserService();
