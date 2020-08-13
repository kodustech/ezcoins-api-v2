import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';

class Donations extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: Sequelize.INTEGER,
        reason: Sequelize.STRING(500),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static paginate() {
    sequelizePaginate.paginate(Donations.init());
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'sender_user_id',
      as: 'senderBy',
    });

    this.belongsTo(models.Users, {
      foreignKey: 'receiver_user_id',
      as: 'receiverBy',
    });
  }
}

export default Donations;
