const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // ต้องมีการตั้งค่าการเชื่อมต่อกับฐานข้อมูล

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true, // เพื่อให้มีการบันทึกเวลาที่สร้างและปรับปรุง
});

module.exports = User;
