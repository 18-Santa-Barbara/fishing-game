import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { createStore } from './store/Store';
import { lightTheme } from './utils/theme';
// const theme = createTheme();

const mainElement = (
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Provider store={createStore()}>
            <CssBaseline />
            <App />
          </Provider>
        </BrowserRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  </React.StrictMode>
);

if (typeof window !== 'undefined') {
  createRoot(document.getElementById('root') as HTMLElement).render(
    mainElement
  );
} else {
  hydrateRoot(document.getElementById('root') as HTMLElement, mainElement);
}
