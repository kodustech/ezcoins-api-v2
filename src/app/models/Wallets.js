import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';

class Wallets extends Model {
  static init(sequelize) {
    super.init(
      {
        to_offer: Sequelize.INTEGER,
        to_exchange: Sequelize.INTEGER,
        earning_events: Sequelize.INTEGER,
        extras: Sequelize.INTEGER,
        received: Sequelize.INTEGER,
        balance: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static paginate() {
    sequelizePaginate.paginate(Wallets.init());
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'owner_user_id',
      as: 'ownerUser',
    });
  }
}

export default Wallets;
