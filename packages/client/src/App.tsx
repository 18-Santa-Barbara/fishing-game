import { ThemeProvider } from '@emotion/react';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import RootRouter from './components/RootRouter';
import StartSpinner from './components/StartSpinner';
import { useGetThemeQuery } from './services/themeApi';
import { useGetUserQuery, useSignInYandexMutation } from './services/userApi';
import { darkTheme, lightTheme } from './utils/theme';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function App() {
  const { isSuccess, data, isFetching, isError } = useGetUserQuery();
  const { data: isDarkTheme } = useGetThemeQuery(
    isSuccess ? data.id : skipToken
  );
  const [signInYandex] = useSignInYandexMutation();
  const appTheme = isDarkTheme?.isDark ? darkTheme : lightTheme;

  const [seacrhParams, setSearchParams] = useSearchParams();
  const code = seacrhParams.get('code');

  useEffect(() => {
    if (code) {
      signInYandex(code)
      setSearchParams({});
    }
  }, []);

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
