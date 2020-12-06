import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';

class Events extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING(50),
        description: Sequelize.STRING(200),
        earned_ezc: Sequelize.DECIMAL(16, 2),
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static paginate() {
    sequelizePaginate.paginate(Events.init());
  }
}

export default Events;
