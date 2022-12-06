import React from 'react';
import {renderToString} from 'react-dom/server';
import { Provider } from 'react-redux';
import App from './App';
import {StaticRouter} from 'react-router-dom/server';
import { store } from './store/Store';

export const render = (url:string) =>
  renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    </React.StrictMode>
  );