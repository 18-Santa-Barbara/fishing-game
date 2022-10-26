import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { LOGIN_URL } from '../../utils/constants';

function ProtectedRoute({ children }) {
  const userId = useSelector(state => state.user.id);

  if (userId === null) {
    return <Navigate to={LOGIN_URL} replace />;
  }
  return children;
}

export default ProtectedRoute;
