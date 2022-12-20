import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export interface ILikes {
  commentId: number;
  author: string;
}

const { STRING, INTEGER } = DataType;

export const LikesModel: ModelAttributes<Model, ILikes> = {
  commentId: {
    type: INTEGER,
    allowNull: false,
  },
  author: {
    type: STRING,
    allowNull: false,
  },
};
