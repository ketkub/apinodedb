const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Restaurant = require('./Restaurant'); // Import โมเดล Restaurant

const Image = sequelize.define('Image', {
    imageId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'images'
});

// ความสัมพันธ์ One-to-Many ระหว่าง Restaurant และ Image
Restaurant.hasMany(Image, { foreignKey: 'restaurantId' });
Image.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

module.exports = Image;
