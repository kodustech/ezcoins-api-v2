import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';

class Exchanges extends Model {
  static init(sequelize) {
    super.init(
      {
        cost: Sequelize.INTEGER,
        delivered: Sequelize.STRING(500),
        user_id: Sequelize.INTEGER,
        product_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static paginate() {
    sequelizePaginate.paginate(Exchanges.init());
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'rescuedBy',
    });

    this.belongsTo(models.Products, {
      foreignKey: 'product_id',
      as: 'product',
    });
  }
}

export default Exchanges;
