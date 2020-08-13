import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';
import bcrypt from 'bcryptjs';

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING(150),
        email: Sequelize.STRING(150),
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        hired_at: Sequelize.DATE,
        resigned_at: Sequelize.DATE,
        is_admin: Sequelize.STRING(1),
        status: Sequelize.INTEGER,
        discord_id: Sequelize.STRING(50),
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static paginate() {
    sequelizePaginate.paginate(Users.init());
  }

  static associate(models) {
    this.belongsTo(models.Wallets, {
      foreignKey: 'id',
      as: 'wallets',
    });

    this.hasMany(models.Donations, {
      foreignKey: 'receiver_user_id',
      as: 'received',
    });

    this.hasMany(models.Donations, {
      foreignKey: 'sender_user_id',
      as: 'donations',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

export default Users;
