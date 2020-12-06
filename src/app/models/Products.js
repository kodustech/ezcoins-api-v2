import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';

class Products extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING(200),
        price: Sequelize.DECIMAL(16, 2),
        image: Sequelize.TEXT,
        url: Sequelize.TEXT,
        status: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static paginate() {
    sequelizePaginate.paginate(Products.init());
  }
}

export default Products;
