'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderCoffee', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dayOrder: {
        type: Sequelize.STRING
      },
      timeOrder: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      total_payment: {
        type: Sequelize.STRING
      },
      menuCoffeeId: {
        type: Sequelize.INTEGER
      },
      tableCoffeeId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrderCoffee');
  }
};