import { createTheme, StyledEngineProvider } from '@mui/material';
import { ThemeProvider,  } from '@mui/styles';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { leaderApi } from './services/leaderApi';
import { store } from './store/Store';
const theme = createTheme();

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <ApiProvider api={leaderApi}>
            <Provider store={store}>
              <App />
            </Provider>
          </ApiProvider>
        </BrowserRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  </React.StrictMode>
);