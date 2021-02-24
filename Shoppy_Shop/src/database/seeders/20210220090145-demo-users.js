'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('users', [{
            name: 'Tester',
            username: "test",
            password: "123",
            email: 'test@example.com',
        }]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};
