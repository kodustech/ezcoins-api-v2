module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert('Configurations', [
      {
        name: 'LIMIT_DONATION',
        value: 25,
      },
    ]),

  down: async (queryInterface) => queryInterface.bulkDelete('Configurations', null, {}),
};
