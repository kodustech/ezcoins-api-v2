import Users from '../models/Users';
import UserNotFoundExceptions from '../validations/UserNotFoundExceptions';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: process.env.EXPIRES_TOKEN,
    });
    return { token, auth: true };
  }
}
export default new AuthUserService();
