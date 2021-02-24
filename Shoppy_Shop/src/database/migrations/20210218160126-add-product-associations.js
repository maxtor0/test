'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
        'products', // name of Source model
        'owner_id', // name of the key we're adding
        {
          type: Sequelize.BIGINT,
          after: "id",
          references: {
            model: 'users', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
    )
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn(
          'products', // name of Source model
          'owner_id' // key we want to remove
      );
  }
};
