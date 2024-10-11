const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('apinodedb_aoqa', 'nodeapi', 'dSmqzXdcsrbFIZ1RqpGrE81mw6mVJvhz', {
host: 'dpg-cs4evdd2ng1s739jbgt0-a',
dialect: 'postgres',
});

module.exports = sequelize;