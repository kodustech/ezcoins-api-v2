'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.addColumn('Wallets', 'earning_events', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    }),

  down: async (queryInterface) => queryInterface.removeColumn('Wallets', 'earning_events'),
};
