import { ReactElement } from 'react';

export type ProtectedRouteProps = {
  mustBeAuth?: boolean,
  children: ReactElement,
}
