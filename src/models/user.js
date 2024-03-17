'use strict';
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
      // define association here
      User.belongsTo(models.Group) // user => group : 1 - 1
      
      // User.belongsTo(models.MenuCoffee) // user => MenuCoffee : 1 - 1

      // User.belongsToMany(models.Project, { through: 'Project_User' }) // user => project: 1 - n and project => user: 1 - n <--> n - n
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    coffeeName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};