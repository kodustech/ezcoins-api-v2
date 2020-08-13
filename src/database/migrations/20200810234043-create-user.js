module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      avatar_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      hired_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      resigned_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      is_admin: {
        type: Sequelize.STRING(1),
        defaultValue: 'N',
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      discord_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    }),

  down: async (queryInterface) => queryInterface.dropTable('Users'),
};
