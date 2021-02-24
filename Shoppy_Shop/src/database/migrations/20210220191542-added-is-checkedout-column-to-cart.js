'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('carts', "is_checkout", {type: Sequelize.BOOLEAN, after:"customer_id", defaultValue:false})
    await queryInterface.addColumn('carts', "review", {type: Sequelize.BOOLEAN, after:"is_checkout", defaultValue:false})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('carts', 'is_checkout');
    await queryInterface.removeColumn('carts', 'review');
  }
};
