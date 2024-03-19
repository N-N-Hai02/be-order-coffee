'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuCoffee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MenuCoffee.belongsTo(models.User) // user => group : 1 - 1
      // User.belongsToMany(models.Project, { through: 'Project_User' }) // user => project: 1 - n and project => user: 1 - n <--> n - n
    }
  };
  MenuCoffee.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'MenuCoffee',
  });
  return MenuCoffee;
};