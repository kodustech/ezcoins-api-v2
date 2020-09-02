module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('TypesAdditionalActivities', 'code', Sequelize.STRING(40)),
  down: async (queryInterface) => queryInterface.removeColumn('TypesAdditionalActivities', 'code'),
};
