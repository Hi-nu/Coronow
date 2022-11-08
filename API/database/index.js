const Sequelize = require('sequelize');

const config = {
  host: process.env.CORONOW_MYSQL_HOST || '127.0.0.1',
  port: 3306,
  database: 'coronow',
  user: 'coronow_admin',
  password: process.env.CORONOW_MYSQL_PASSWORD || 'rabbit1104',
};

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
});

module.exports = {
  sequelize,
  stats: require('./stats')(sequelize),
  //localstat: require('./local-stat')(sequelize)
};