'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasOne(models.User, {as: "customer", sourceKey: "customer_id", foreignKey: "id"});
            this.hasOne(models.product, {as: "product", sourceKey: "product_id", foreignKey: "id"});
        }
    };
    cart.init({
        id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false},
        product_id: {
            type: DataTypes.BIGINT,
            after: "id",
            references: {
                model: 'products',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        customer_id: {
            type: DataTypes.BIGINT,
            after: "product_id",
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        is_checkout: {type: DataTypes.BOOLEAN, defaultValue: false},
        review: {type: DataTypes.BOOLEAN, defaultValue: false}

    }, {
        sequelize,
        modelName: 'cart',
    });
    return cart;
};
