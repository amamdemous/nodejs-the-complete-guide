const { Sequelize } = require("sequelize");
const { config } = require("../config");

const sequelize = new Sequelize(
  "node-complete",
  "root",
  config.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
    logging: false,
  }
);

module.exports = sequelize;
