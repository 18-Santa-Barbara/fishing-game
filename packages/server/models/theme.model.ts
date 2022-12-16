import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export interface ITheme {
  id: number;
  userId: number;
  isDark: boolean;
}

const {INTEGER, BOOLEAN} = DataType;

export const ThemeModel: ModelAttributes<Model, ITheme> = {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: INTEGER,
    allowNull: false,
  },
  isDark: {
    type: BOOLEAN,
  },
};