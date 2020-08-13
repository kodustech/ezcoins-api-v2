'use strict';

module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert('Configurations', [
      {
        name: 'LIMIT_DONATION',
        value: 25,
      },
    ]),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Configurations', null, {}),
};
