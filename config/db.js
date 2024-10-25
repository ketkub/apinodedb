const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodeproject_om00', 'nodeproject_om00_user', 'LCOnPJ73AQ1MukLqNjKeBvHLOVBiE5yf', {
host: 'dpg-csdk4srqf0us7394tpig-a',
dialect: 'postgres',
});

module.exports = sequelize;