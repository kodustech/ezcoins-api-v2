import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';

class AdditionalActivities extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        type_additional_activities_id: Sequelize.INTEGER,
        url: Sequelize.STRING(1000),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static paginate() {
    sequelizePaginate.paginate(AdditionalActivities.init());
  }

  static associate(models) {
    this.belongsTo(models.TypesAdditionalActivities, {
      foreignKey: 'type_additional_activities_id',
      as: 'typeAdditionalActivities',
    });

    this.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'author',
    });
  }
}

export default AdditionalActivities;
