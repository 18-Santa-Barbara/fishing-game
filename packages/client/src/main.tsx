import { createTheme, StyledEngineProvider } from '@mui/material';
import { ThemeProvider,  } from '@mui/styles';
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { createStore } from './store/Store';
const theme = createTheme();

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Provider store={createStore()}>
            <App />
          </Provider>
        </BrowserRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  </React.StrictMode>
);