const config = require("config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    host: host,
    port: port,
    dialect: "mysql",
    retry: {
      match: [/ETIMEDOUT/],
      max: 5,
    },
  });
  // const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

  // init models and add them to the exported db object
  db.Serveing_User = require("../serving_Users/user.model")(sequelize);
  db.Company_User = require("../company_User/user.model")(sequelize);
  db.User_Register = require("../user_Register/user.model")(sequelize);
  db.Son_Register = require("../son_Register/user.model")(sequelize);
  db.Retired_User = require("../retired_User/user.model")(sequelize);
  db.job_fair = require("../employment/employment.model")(sequelize);
  db.job_posts = require("../job_post/employment.model")(sequelize);
  db.Notification = require("../sendNotification/notification.model")(sequelize);

  // sync all models with database
  await sequelize.sync();
}
