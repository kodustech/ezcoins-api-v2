module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('Wallets', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      to_offer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 25,
      },
      received: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      owner_user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    }),

  down: async (queryInterface) => queryInterface.dropTable('Wallets'),
};
