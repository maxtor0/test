'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_images', {
      id: {type:Sequelize.BIGINT, autoIncrement:true, primaryKey:true, allowNull:false},
      image: {type:Sequelize.STRING, allowNull: false, unique:true},
      is_main: {type: Sequelize.BOOLEAN, defaultValue:false},
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
    await queryInterface.dropTable('product_images');
  }
};
