module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('Donations', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sender_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      receiver_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      reason: {
        type: Sequelize.STRING(500),
        allowNull: false,
        defaultValue: 'Motivo não informado',
      },
    }),

  down: async (queryInterface) => queryInterface.dropTable('Donations'),
};
