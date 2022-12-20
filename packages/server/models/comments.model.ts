import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export interface IComments {
  postId: number;
  author: string;
  body: string;
  date: string;
  comment: Record<string, unknown>;
}

const { STRING, INTEGER, JSON } = DataType;

export const CommentsModel: ModelAttributes<Model, IComments> = {
  postId: {
    type: INTEGER,
    allowNull: false,
  },
  author: {
    type: STRING,
    allowNull: false,
  },
  body: {
    type: STRING,
    allowNull: false,
  },
  date: {
    type: STRING,
    allowNull: false,
  },
  comment: {
    type: JSON,
    allowNull: true
  }
};
