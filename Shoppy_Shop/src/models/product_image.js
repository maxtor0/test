'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class product_image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasOne(models.product, {as: "product", sourceKey: "product_id", foreignKey: "id"});
        }
    };
    product_image.init({
        id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false},
        image: {type: DataTypes.STRING, allowNull: false, unique: true},
        is_main: {type: DataTypes.BOOLEAN, defaultValue: false},
        product_id:
            {
                type: DataTypes.BIGINT,
                after: "id",
                references: {
                    model: 'products',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }
    }, {
        sequelize,
        modelName: 'product_image',
    });
    return product_image;
};
