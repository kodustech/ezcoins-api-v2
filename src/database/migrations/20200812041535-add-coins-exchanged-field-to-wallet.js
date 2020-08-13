module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.addColumn('Wallets', 'to_exchange', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    }),

  down: async (queryInterface) => queryInterface.removeColumn('Wallets', 'to_exchange'),
};
