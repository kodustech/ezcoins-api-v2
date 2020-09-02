import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';

class TypesAdditionalActivities extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING(200),
        code: Sequelize.STRING(40),
        ezc: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static paginate() {
    sequelizePaginate.paginate(TypesAdditionalActivities.init());
  }
}

export default TypesAdditionalActivities;
