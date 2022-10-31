import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetUserQuery } from '../../services/userApi';
import { LOGIN_URL } from '../../utils/constants';

function ProtectedRoute({ children }: PropsWithChildren) {
  const { data, isLoading } = useGetUserQuery({}, {skip: true});

  if (isLoading || data === undefined) {
    return <Navigate to={LOGIN_URL} replace />;
  }
  return children;
}

export default ProtectedRoute;
