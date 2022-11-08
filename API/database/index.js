const Sequelize = require('sequelize');

const config = {
  host: process.env.CORONOW_MYSQL_HOST || 'coronow.c0g7u8xpkve4.ap-northeast-2.rds.amazonaws.com',
  port: 3306,
  database: 'coronow',
  user: 'coronow_admin',
  password: process.env.CORONOW_MYSQL_PASSWORD || 'rabbit110#',
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
