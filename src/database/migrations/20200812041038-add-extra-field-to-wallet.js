module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.addColumn('Wallets', 'extras', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    }),

  down: async (queryInterface) => queryInterface.removeColumn('Wallets', 'extras'),
};
