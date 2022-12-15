// const dbConfig = require("../config/db.config.ts");

const Sequelize = require("sequelize");

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: '127.0.0.1',
  port: 5432,
  dialect: 'postgres',
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.forums = require("./forum.model.ts")(sequelize, Sequelize);

module.exports = db;
