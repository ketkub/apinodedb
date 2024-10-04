const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('apinodedb_f5l2', 'node_db_user', 'J6tse6tP0NXNP0j0bOtoJ7kqTh5qORrU', {
host: 'dpg-crvpkj3tq21c738og07g-a',
dialect: 'postgres',
});

module.exports = sequelize;