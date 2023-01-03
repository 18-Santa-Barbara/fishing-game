import { ForumModel } from './models/forum.model';
import type { SequelizeOptions } from 'sequelize-typescript';
import { Sequelize } from 'sequelize-typescript';
import { ThemeModel } from './models/theme.model';
import { CommentsModel } from './models/comments.model';
import { LikesModel } from './models/likes.models';

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  ssl: false,
  dialectOptions: {},
};

const sequelize = new Sequelize(sequelizeOptions);

export const Theme = sequelize.define('Theme', ThemeModel, {});
export const Forum = sequelize.define('Forum', ForumModel, {});
export const Comments = sequelize.define('Comments', CommentsModel, {});
export const Like = sequelize.define('Likes', LikesModel, {});

export async function connect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connected to db');
  } catch (err) {
    console.error("Can't connect to db: ", err);
  }
}

export function startBackWithBase() {
  connect().then();
}
