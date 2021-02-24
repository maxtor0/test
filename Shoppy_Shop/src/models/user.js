'use strict';
const crypto = require("crypto");

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasOne(models.role, {as: "role", sourceKey: "role_id", foreignKey: "id"});
            this.hasMany(models.product, {as: "products", foreignKey: "owner_id", targetKey: "id"});
            this.hasMany(models.cart, {as: "cart", foreignKey: "customer_id", targetKey: "id"});
            this.hasMany(models.product_review, {as: "reviews", foreignKey: "user_id", targetKey: "id"});
        }
    }

    console.log(User.associations)
    User.init({
        id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false},
        name: {type: DataTypes.STRING(50), validate: {is: /^[A-Za-z][A-Za-z ]+$/i}},
        username: {type: DataTypes.STRING(16), allowNull: false, unique: true, validate:{ isAlphanumeric:true}},
        password: {
            type: DataTypes.STRING,
            set(password) {
                const sha256 = crypto.createHmac('sha256', process.env.APP_KEY);
                this.setDataValue('password', sha256.update(password).digest('base64'));
            },
        },
        email: {type: DataTypes.STRING, unique: true, validate: {isEmail: true}},
        date_of_birth: {type: DataTypes.DATEONLY},
        gender: {type: DataTypes.ENUM('male', 'female')},
        address: {type: DataTypes.STRING},
        phone_number: {type: DataTypes.STRING(15), validate:{max:15, min:3}},
        credit_card: {type: DataTypes.STRING(15), unique: true, validate: {isCreditCard: true}},
        profile_picture: {type: DataTypes.STRING},
        role_id:
            {
                type: DataTypes.BIGINT,
                after: "id",
                references: {
                    model: 'roles',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },

    }, {
        sequelize,
        modelName: 'User',
        defaultScope: {
            attributes: {exclude: ['password']},
        },
        scopes: {
            withHiddenData:{}
        }
    });

    User.checkPassword = (password, userPassword) => {
        const sha256 = crypto.createHmac('sha256', process.env.APP_KEY);
        return userPassword === sha256.update(password).digest('base64');
    }

    return User;
};
