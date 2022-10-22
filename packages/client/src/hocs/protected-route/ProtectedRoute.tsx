import { Navigate } from 'react-router-dom';
import { LOGIN_URL } from '../../utils/constants';
import { IProps } from './IProps';

function ProtectedRoute({ loggedIn, children }: IProps) {
  if (!loggedIn) {
    return <Navigate to={LOGIN_URL} replace />;
  }
  return children;
}

export default ProtectedRoute;
