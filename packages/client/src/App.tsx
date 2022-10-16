import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './hocs/protected-route/ProtectedRoute';
import ChangePassPage from './pages/ChangePassPage';
import GamePage from './pages/GamePage';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import SignUp from './pages/SignUp';
import { apiRequestGet } from './utils/api';
import {
  API,
  BASE_URL,
  CHANGE_PASS_URL,
  GAME_URL,
  LOGIN_URL,
  PROFILE_URL,
  SIGNUP_URL,
} from './utils/constants';

function App() {
  const [isLogged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  function checkLoggedIn() {
    apiRequestGet(`${API}/auth/user`)
      .then(res => {
        setLoading(false);
        console.log(res);
      })
      .catch(err => {
        console.warn(111, err);
        setLoading(false);
      });
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Routes>
        <Route
          path={BASE_URL}
          element={
            <Login checkLoggedIn={checkLoggedIn} setLogged={setLogged} />
          }
        />
        <Route
          path={LOGIN_URL}
          element={
            <Login checkLoggedIn={checkLoggedIn} setLogged={setLogged} />
          }
        />
        <Route path={SIGNUP_URL} element={<SignUp setLogged={setLogged} />} />
        <Route path={PROFILE_URL} element={<ProfilePage />} />
        <Route path={CHANGE_PASS_URL} element={<ChangePassPage />} />
        <Route
          path={GAME_URL}
          element={
            <ProtectedRoute loggedIn={isLogged}>
              <GamePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
