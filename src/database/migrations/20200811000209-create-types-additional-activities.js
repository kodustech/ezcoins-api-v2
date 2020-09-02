module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('TypesAdditionalActivities', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      ezc: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    }),

  down: async (queryInterface) => queryInterface.dropTable('TypesAdditionalActivities'),
};
