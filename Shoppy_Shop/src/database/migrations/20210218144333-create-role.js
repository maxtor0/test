'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id: {type:Sequelize.BIGINT, primaryKey:true, autoIncrement:true, allowNull:false},
      role: {type:Sequelize.STRING, allowNull:false},
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('roles');
  }
};
