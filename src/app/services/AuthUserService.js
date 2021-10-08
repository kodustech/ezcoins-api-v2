import Users from '../models/Users';
import UserNotFoundExceptions from '../validations/UserNotFoundExceptions';
import bcrypt from 'bcryptjs';

class AuthUserService {
  async run({ transaction = null, email: pEmail, password: pPassword }) {
    const user = await Users.findOne({
      where: {
        email: pEmail,
        status: 0,
      },
    });
    if (!user) {
      throw new UserNotFoundExceptions();
    }

    const compare = await bcrypt.compare(pPassword, user.password_hash);
    if (!compare) {
      throw new UserNotFoundExceptions();
    }
    console.log('my user', user);
    return user;
  }
}
export default new AuthUserService();
