'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', "date_of_birth", {type: Sequelize.DATEONLY, after:"email"})
    await queryInterface.addColumn('users', 'gender', {type: Sequelize.ENUM('male', 'female'), after: "date_of_birth"});
    await queryInterface.addColumn('users', 'address', {type: Sequelize.STRING, after: "gender"});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'date_of_birth');
    await queryInterface.removeColumn('users', 'gender');
    await queryInterface.removeColumn('users', 'address');
  }
};
