const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Restaurant = sequelize.define('restaurant', {
    restaurantId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'restaurants'
});

module.exports = Restaurant;
