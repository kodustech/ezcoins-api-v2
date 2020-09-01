import { Router } from 'express';
import UsersController from './app/controllers/UsersController';
import DonationsController from './app/controllers/DonationsController';
import authMiddleware from './middlewares/auth';
import UserBalanceController from './app/controllers/UserBalanceController';
import TypesAdditionalActivitiesController from './app/controllers/TypesAdditionalActivitiesController';
import AdditionalActivitiesController from './app/controllers/AdditionalActivitiesController';

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

// #region - Types Additional Activities
routes.get('/typesAdditionalActivities', TypesAdditionalActivitiesController.index);
// #endregion

// #region - Additional Activities
routes.get('/activities', authMiddleware, AdditionalActivitiesController.index);
routes.post('/activities/:code', authMiddleware, AdditionalActivitiesController.store);
// #endregion
export default routes;
