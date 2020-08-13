import Sequelize from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';
import databaseConfig from '../config/database';
import Users from '../app/models/Users';
import Wallets from '../app/models/Wallets';
import Donations from '../app/models/Donations';

const models = [Users, Wallets, Donations];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map((model) => {
        if (model.associate) model.associate(this.connection.models);
        return model;
      })
      .map((model) => model.paginate && sequelizePaginate.paginate(model));
  }
}

export default new Database();
