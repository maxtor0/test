'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_reviews', {
      id: {type:Sequelize.BIGINT, autoIncrement:true, primaryKey:true, allowNull:false},
      rate: {type: Sequelize.FLOAT(1,1), defaultValue:0 },
      comment: {type: Sequelize.TEXT},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_reviews');
  }
};
