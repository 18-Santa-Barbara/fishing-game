// const dbConfig = require("../config/db.config.ts");

const Sequelize = require("sequelize");

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env

const sequelize = new Sequelize("vdnhvqcc", "vdnhvqcc", "RMsiJ25jyvI4pZCw6Vx0kOL7aYY6Pdp9", {
  host: 'mouse.db.elephantsql.com',
  dialect: 'postgres',
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.forums = require("./forum.model.ts")(sequelize, Sequelize);

module.exports = db;
