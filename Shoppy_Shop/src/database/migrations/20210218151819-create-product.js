'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {type:Sequelize.BIGINT, autoIncrement:true, primaryKey:true, allowNull:false},
      name: {type: Sequelize.STRING, allowNull:false},
      slug: {type: Sequelize.STRING, allowNull:false, unique:true},
      price: {type: Sequelize.FLOAT, allowNull:false},
      is_available: {type: Sequelize.BOOLEAN, allowNull:false, defaultValue:true},
      description: {type: Sequelize.TEXT, allowNull:true},
      rate: {type: Sequelize.FLOAT(1,1), defaultValue:0 },
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
    await queryInterface.dropTable('products');
  }
};
