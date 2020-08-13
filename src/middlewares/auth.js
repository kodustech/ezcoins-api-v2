import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { promisify } from 'util';
import FindUserByDiscordIdService from '../app/services/FindUserByDiscordIdService';
import UserSessionNotFoundExceptions from '../app/validations/UserSessionNotFoundExceptions';
import Users from '../app/models/Users';
import UserDiscordNotFoundExceptions from '../app/validations/UserDiscordNotFoundExceptions';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      error: 'Sessão Encerrada, por favor conecte-se novamente.',
    });
  }

  const [discordId, token] = authHeader.split(' ');
  // Identifico o usuário que está pelo discord
  if (discordId !== 'Bearer') {
    const user = await FindUserByDiscordIdService.run({
      id: discordId,
    });

    if (!user) {
      throw new UserDiscordNotFoundExceptions();
    }
    req.session = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.is_admin === 'S',
      isDiscordSession: true,
    };
    return next();
  }

  try {
    const decoded = await promisify(jwt.verify)(token, {
      expiresIn: process.env.EXPIRES_TOKEN,
      secret: process.env.SECRET,
    });

    const user = await Users.findByPk(decoded.id);
    if (!user) {
      throw new UserSessionNotFoundExceptions();
    }

    req.session = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.is_admin === 'S',
      isDiscordSession: false,
    };
    return next();
  } catch (err) {
    return res.status(401).json({
      error: 'Token Invalid',
    });
  }
};
// import jwt from 'jsonwebtoken';
// import { promisify } from 'util';

// import authConfig from '../config/auth';
// import User from '../app/models/User';
// import { UserSessionNotFound } from '../app/validations/UserException';

// export default async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({
//       error: 'Sessão Encerrada, por favor conecte-se novamente.',
//     });
//   }

//   const [, token] = authHeader.split(' ');

//   try {
//     const decoded = await promisify(jwt.verify)(token, authConfig.secret);
//     req.userId = decoded.id;

//     const user = await User.findByPk(decoded.id);
//     if (!user) {
//       throw new UserSessionNotFound();
//     }

//     req.session = user;
//     return next();
//   } catch (err) {
//     return res.status(401).json({
//       error: 'Token Invalid',
//     });
//   }
// };
