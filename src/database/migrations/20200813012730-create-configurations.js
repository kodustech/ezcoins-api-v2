'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('Configurations', {
      name: Sequelize.STRING,
      value: Sequelize.STRING,
    }),

  down: async (queryInterface) => queryInterface.dropTable('Configurations'),
};
