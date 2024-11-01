const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = sequelize.define('User', {

    userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
        },
    }, 
    {
    tableName: 'users'
    });

module.exports = User;