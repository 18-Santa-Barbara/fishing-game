import { Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './hocs/protected-route/ProtectedRoute';
import ChangePassPage from './pages/ChangePassPage';
// import GamePage from './pages/GamePage';
import Forum from './pages/Forum';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import SignUp from './pages/SignUp';
import { Leaderboard } from './pages/Leaderboard';
import ErrorBoundary from './pages/components/ErrorBoundary';
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
import { leaderApi } from './services/leaderApi';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';

function App() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route
            path={BASE_URL}
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path={LOGIN_URL}
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path={SIGNUP_URL}
            element={
              <ProtectedRoute>
                <SignUp />
              </ProtectedRoute>
            }
          />
          <Route
            path={PROFILE_URL}
            element={
              <ProtectedRoute mustBeAuth>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path={FORUM_URL} element={<Forum />} />
          <Route
            path={CHANGE_PASS_URL}
            element={
              <ProtectedRoute mustBeAuth>
                <ChangePassPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={GAME_URL}
            element={
              <ProtectedRoute mustBeAuth>
                <div>test</div>
                {/* <GamePage /> */}
              </ProtectedRoute>
            }
          />
          <Route path={LEADERBOARD_URL} element={<Leaderboard />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
