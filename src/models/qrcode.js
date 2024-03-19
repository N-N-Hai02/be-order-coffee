'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QRcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QRcode.belongsTo(models.User) // user => group : 1 - 1
      // User.belongsToMany(models.Project, { through: 'Project_User' }) // user => project: 1 - n and project => user: 1 - n <--> n - n
    }
  };
  QRcode.init({
    newDay: DataTypes.STRING,
    timeNew: DataTypes.STRING,
    code: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'QRcode',
  });
  return QRcode;
};