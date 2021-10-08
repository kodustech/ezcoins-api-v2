import ListUsersService from '../services/ListUsersService';
import CreateUserService from '../services/CreateUserService';
import AuthUserService from '../services/AuthUserService';
import database from '../../database';

class UsersController {
  async index(req, res) {
    try {
      const users = await ListUsersService.run({});
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.json({
        error: err,
      });
    }
  }

  async store(req, res) {
    const transaction = await database.connection.transaction();
    try {
      const user = await CreateUserService.run({
        user: req.body,
        transaction,
      });
      await transaction.commit();
      return res.json(user);
    } catch (err) {
      if (transaction) await transaction.rollback();
      return res.json({
        error: err,
      });
    }
  }

  async auth(req, res) {
    const transaction = await database.connection.transaction();
    try {
      const user = await AuthUserService.run({ transaction, email: req.body.email, password: req.body.password });
      res.json(user);
    } catch (err) {
      if (transaction) await transaction.rollback();
      return res.json({
        error: err,
      });
    }
  }
}

export default new UsersController();
