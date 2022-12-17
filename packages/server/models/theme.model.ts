import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export interface ITheme {
  userId: number;
  isDark: boolean;
}

const {INTEGER, BOOLEAN} = DataType;

export const ThemeModel: ModelAttributes<Model, ITheme> = {
  userId: {
    type: INTEGER,
    allowNull: false,
  },
  isDark: {
    type: BOOLEAN,
    defaultValue: false,
  },
};