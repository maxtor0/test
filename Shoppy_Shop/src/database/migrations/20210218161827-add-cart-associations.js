'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
        'carts', // name of Source model
        'product_id', // name of the key we're adding
        {
          type: Sequelize.BIGINT,
          after: "id",
          references: {
            model: 'products', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
    ).then(() => {
      queryInterface.addColumn(
          'carts', // name of Source model
          'customer_id', // name of the key we're adding
          {
            type: Sequelize.BIGINT,
            after: "product_id",
            references: {
              model: 'users', // name of Target model
              key: 'id', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          })
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
        'carts', // name of Source model
        'product_id' // key we want to remove
    ).then(() => {
      queryInterface.removeColumn(
          'carts', // name of Source model
          'customer_id' // key we want to remove
      )
    });
  }
};
