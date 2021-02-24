'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Role.init({
    id: {type:DataTypes.BIGINT, autoIncrement:true, primaryKey:true, allowNull:false},
    role: {type:DataTypes.STRING, allowNull:false},
  }, {
    sequelize,
    modelName: 'role',
    timestamps: false
  });
  // Role.belongsTo(Model.User(sequelize, DataTypes), {as: "users", foreignKey: "id", targetKey: "role_id"});
  return Role;
};
