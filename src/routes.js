import { Router } from 'express';
import UsersController from './app/controllers/UsersController';
import DonationsController from './app/controllers/DonationsController';
import authMiddleware from './middlewares/auth';
import UserBalanceController from './app/controllers/UserBalanceController';

const routes = Router();

// Rotas
// #region - Users
routes.get('/users', authMiddleware, UsersController.index);
routes.post('/users', authMiddleware, UsersController.store);
routes.get('/users/balance', authMiddleware, UserBalanceController.index);
// #endregion

// #region - Donation
routes.post('/donate/:quantity/:receiverId', authMiddleware, DonationsController.store);
// #endregion
export default routes;
