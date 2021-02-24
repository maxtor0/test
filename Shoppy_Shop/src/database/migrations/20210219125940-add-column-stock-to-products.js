'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
        'products',
        "stock",
        {type:Sequelize.INTEGER, allowNull:false, defaultValue:1},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'stock');
  }
};
