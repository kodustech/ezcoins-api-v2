import { Router } from 'express';
import UsersController from './app/controllers/UsersController';
import DonationsController from './app/controllers/DonationsController';
import authMiddleware from './middlewares/auth';
import UserBalanceController from './app/controllers/UserBalanceController';
import TypesAdditionalActivitiesController from './app/controllers/TypesAdditionalActivitiesController';
import AdditionalActivitiesController from './app/controllers/AdditionalActivitiesController';
import RankController from './app/controllers/RankController';
import ProductController from './app/controllers/ProductController';
import UserAdditionalActivitiesController from './app/controllers/UserAdditionalActivitiesController';
import ExchangesController from './app/controllers/ExchangesController';
import UserExchangeController from './app/controllers/UserExchangeController';

const routes = Router();

// Rotas
// #region - Users
routes.get('/users', authMiddleware, UsersController.index);
routes.post('/users', authMiddleware, UsersController.store);
routes.get('/users/balance', authMiddleware, UserBalanceController.index);
routes.get('/users/activities', authMiddleware, UserAdditionalActivitiesController.index);
routes.get('/users/exchanges', authMiddleware, UserExchangeController.index);
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

// #region - Products
routes.get('/products', ProductController.index);
routes.get('/products/:id', authMiddleware, ProductController.findById);
routes.post('/products', authMiddleware, ProductController.store);
routes.put('/products/:id', authMiddleware, ProductController.update);
routes.delete('/products/:id', authMiddleware, ProductController.delete);
// #endregion

routes.get('/rank', RankController.index);

// #region - Exchanges
routes.get('/exchanges', authMiddleware, ExchangesController.index);
routes.post('/exchanges', authMiddleware, ExchangesController.store);

// #endregion
export default routes;
