'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderCoffee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderCoffee.belongsTo(models.User) // user => group : 1 - 1
      // User.belongsToMany(models.Project, { through: 'Project_User' }) // user => project: 1 - n and project => user: 1 - n <--> n - n
    }
  };
  OrderCoffee.init({
    dayOrder: DataTypes.STRING,
    timeOrder: DataTypes.STRING,
    quantity: DataTypes.STRING,
    total_payment: DataTypes.STRING,
    menuCoffeeId: DataTypes.INTEGER,
    tableCoffeeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'OrderCoffee',
  });
  return OrderCoffee;
};