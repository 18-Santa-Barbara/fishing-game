import { Sequelize } from "sequelize";
import { forumModels } from "./forum.model";

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB }: any = process.env

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: '127.0.0.1',
  port: 5432,
  dialect: 'postgres',
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.forums = forumModels(sequelize, db.Sequelize);

export default db;
