import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetUserQuery } from '../../services/userApi';
import { GAME_URL, LOGIN_URL } from '../../utils/constants';

function ProtectedRoute({ mustBeAuth, children }: PropsWithChildren) {
  const { data, isLoading, isError, isUninitialized } = useGetUserQuery();
  if (isLoading) {
    return <>Loading...</>;
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
