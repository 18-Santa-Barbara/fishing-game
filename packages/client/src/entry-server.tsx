import React from 'react';
import {renderToString} from 'react-dom/server';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/Store';

export const render = () =>
  renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );