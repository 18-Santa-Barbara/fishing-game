import { ThemeProvider } from '@emotion/react';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import './App.css';
import ProtectedRoute from './hocs/protected-route/ProtectedRoute';
import ChangePassPage from './pages/ChangePassPage';
import Forum from './pages/Forum';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import SignUp from './pages/SignUp';
import { Leaderboard } from './pages/Leaderboard';
import ErrorBoundary from './pages/components/ErrorBoundary';
import Comments from './pages/Comments';
import {
  BASE_URL,
  CHANGE_PASS_URL,
  GAME_URL,
  LOGIN_URL,
  PROFILE_URL,
  FORUM_URL,
  SIGNUP_URL,
  LEADERBOARD_URL,
  COMMENTS_URL,
} from './utils/constants';
import { NoSsr } from '@mui/material';
import GamePage from './pages/GamePage';

function App() {
  const { isSuccess, data, isFetching, isError } = useGetUserQuery();
  const { data: isDarkTheme } = useGetThemeQuery(
    isSuccess ? data.id : skipToken
  );
  const appTheme = isDarkTheme?.isDark ? darkTheme : lightTheme;

  if (isFetching && isError) {
    return (
      <ThemeProvider theme={appTheme}>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <StartSpinner />
        </StyledEngineProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={appTheme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Header />
        <div
          style={{
            minHeight: 'calc(100vh - 153px)',
          }}>
          <RootRouter />
        </div>
        <Footer />
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
