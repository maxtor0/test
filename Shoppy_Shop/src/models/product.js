'use strict';

const slugify = require('slugify')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.hasOne(models.User, {as: "owner", sourceKey: "owner_id", foreignKey: "id"})
        this.hasMany(models.product_image, {as: "images", foreignKey: "product_id", targetKey: "id"});
        this.hasMany(models.product_review, {as: "reviews", foreignKey: "product_id", targetKey: "id"});
        this.hasMany(models.cart, {as: "cart", foreignKey: "product_id", targetKey: "id"});
    }
  };
  product.init({
    id: {type:DataTypes.BIGINT, autoIncrement:true, primaryKey:true, allowNull:false},
    name: {type: DataTypes.STRING, allowNull:false},
    slug: {type: DataTypes.STRING, allowNull:false, unique:true},
    stock: {type:DataTypes.INTEGER, allowNull:false, defaultValue:1},
    price: {type: DataTypes.FLOAT, allowNull:false},
    is_available: {type: DataTypes.BOOLEAN, allowNull:false, defaultValue:true},
    description: {type: DataTypes.TEXT, allowNull:true},
    rate: {type: DataTypes.FLOAT(2,1), defaultValue:0, validate:{min: 0.0, max:5.0}},
    owner_id: {
          type: DataTypes.BIGINT,
          after: "id",
          references: {
            model: 'users', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
  }, {
    sequelize,
    modelName: 'product',
  });

  product.slugify = value => slugify(value+"-"+Number.parseInt(Math.random()*1E10+""), {lower:true, strict: true});


  return product;
};
