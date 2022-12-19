import { Navigate } from 'react-router-dom';
import StartSpinner from '../../components/StartSpinner';
import { useGetUserQuery } from '../../services/userApi';
import { GAME_URL, LOGIN_URL } from '../../utils/constants';
import IProps from './IProps';

function ProtectedRoute({ mustBeAuth, children }: IProps) {
  const { data, isLoading, isError, isUninitialized } = useGetUserQuery();
  if (isLoading) {
    return <StartSpinner />;
  }

  if (!mustBeAuth) {
    if (data && !isError) {
      return <Navigate to={GAME_URL} replace />;
    }
    return children;
  }

  if (isError || (isUninitialized && !data)) {
    return <Navigate to={LOGIN_URL} replace />;
  }

  return children;
}

export default ProtectedRoute;
