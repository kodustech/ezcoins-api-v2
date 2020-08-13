import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import Youch from 'youch';
import routes from './routes';
import './database';
import Cron from './cron';

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
    Cron.run();
    this.exceptionHandler();
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const { message, errors, original = '' } = await new Youch(err, req).error;
      return res.status(200).json({
        message: errors || message || original.sqlMessage,
      });
    });
  }
}

export default new App().server;
