import { Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './hocs/protected-route/ProtectedRoute';
import ChangePassPage from './pages/ChangePassPage';
import GamePage from './pages/GamePage';
import Forum from './pages/Forum';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import SignUp from './pages/SignUp';
import { Leaderboard } from './pages/leaderboard';
import {
  BASE_URL,
  CHANGE_PASS_URL,
  GAME_URL,
  LOGIN_URL,
  PROFILE_URL,
  FORUM_URL,
  SIGNUP_URL,
  LEADERBOARD_URL,
} from './utils/constants';
import { useGetUserQuery } from './services/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/user';

function App() {
  const { isLoading, data } = useGetUserQuery(undefined);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Routes>
        <Route path={BASE_URL} element={<Login />} />
        <Route path={LOGIN_URL} element={<Login />} />
        <Route path={SIGNUP_URL} element={<SignUp />} />
        <Route
          path={PROFILE_URL}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={FORUM_URL}
          element={
            // <ProtectedRoute>
            <Forum />
            /* </ProtectedRoute> */
          }
        />
        <Route path={CHANGE_PASS_URL} element={<ChangePassPage />} />
        <Route
          path={GAME_URL}
          element={
            // <ProtectedRoute>
            <GamePage />
            /* </ProtectedRoute> */
          }
        />
        <Route path={LEADERBOARD_URL} element={<Leaderboard />} />
      </Routes>
    </>
  );
}

export default App;
