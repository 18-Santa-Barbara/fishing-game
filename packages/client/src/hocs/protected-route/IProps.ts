import { ReactElement } from 'react';

export default interface IProps {
  mustBeAuth?: boolean;
  children: ReactElement;
}
