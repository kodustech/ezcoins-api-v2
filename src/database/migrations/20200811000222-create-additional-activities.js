module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('AdditionalActivities', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      type_additional_activities_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TypesAdditionalActivities',
          key: 'id',
        },
      },
      approved: {
        type: Sequelize.STRING(1),
        defaultValue: 'P',
        allowNull: false,
      },
      approved_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: true,
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      approved_at: Sequelize.DATE,
      url: Sequelize.STRING(1000),
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    }),

  down: async (queryInterface) => queryInterface.dropTable('AdditionalActivities'),
};
