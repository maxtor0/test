'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('roles', [
            {id: 1, role: "admin"},
            {id: 2, role: "customer"}
        ], {});

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('roles', null, {});
    }
};
