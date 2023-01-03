import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { createStore } from './store/Store';
// const theme = createTheme();

const mainElement = (
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={createStore()}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

if (typeof window !== 'undefined') {
  createRoot(document.getElementById('root') as HTMLElement).render(
    mainElement
  );
} else {
  hydrateRoot(document.getElementById('root') as HTMLElement, mainElement);
}
