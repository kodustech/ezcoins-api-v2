module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('Exchanges', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      delivered: {
        type: Sequelize.STRING(1),
        allowNull: false,
        defaultValue: 'N',
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    }),

  down: async (queryInterface) => queryInterface.dropTable('Exchanges'),
};
