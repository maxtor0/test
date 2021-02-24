'use strict';

const roles = require("../../models/role");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},

            name: {type: Sequelize.STRING(50)},
            username: {type: Sequelize.STRING(16), allowNull: false, unique:true, },
            password: {
                type: Sequelize.STRING,
                set(value) {
                    const md5 = crypto.createHash('md5');
                    this.setDataValue('password', md5.update(value).digest('hex'));
                }
            },
            email: {type: Sequelize.STRING, unique: true},
            phone_number: {type: Sequelize.STRING(15)},
            credit_card: {type: Sequelize.STRING(15), unique: true},
            profile_picture: {type: Sequelize.STRING},
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};
