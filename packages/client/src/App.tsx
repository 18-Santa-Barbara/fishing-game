import { CssBaseline } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import GamePage from './pages/GamePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { apiRequestGet } from './utils/api';
import {
  API,
  BASE_URL,
  GAME_URL,
  LOGIN_URL,
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
  });

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path={BASE_URL} element={<Login />} />
        <Route path={LOGIN_URL} element={<Login />} />
        <Route path={SIGNUP_URL} element={<SignUp />} />
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
