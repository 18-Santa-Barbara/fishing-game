import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export interface IForum {
  title: string;
  author: string;
  updateTime: string;
  body: string;
}

const { STRING } = DataType;

export const ForumModel: ModelAttributes<Model, IForum> = {
  title: {
    type: STRING,
    allowNull: false
  },
  author: {
    type: STRING,
    allowNull: false,
  },
  updateTime: {
    type: STRING,
    allowNull: false,
  },
  body: {
    type: STRING,
    allowNull: false
  },
};

