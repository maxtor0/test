'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await  queryInterface.changeColumn('product_reviews', 'rate', {
      type: Sequelize.FLOAT,
      defaultValue: 3.14,
    });
    await queryInterface.changeColumn('products', 'rate', {
      type: Sequelize.FLOAT(2,1),
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
