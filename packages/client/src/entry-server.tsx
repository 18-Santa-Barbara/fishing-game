import React from 'react';
import {renderToString} from 'react-dom/server';
import { Provider } from 'react-redux';
import App from './App';
import {StaticRouter} from 'react-router-dom/server';
import { createStore } from './store/Store';

export const render = (url:string) => {
  let result = renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <Provider store={createStore()}>
          <App />
        </Provider>
      </StaticRouter>
    </React.StrictMode>
  );

  const storeInitialState = createStore().getState();
  const serializedinitialState = JSON.stringify(storeInitialState);

  result += `<script>window.__INITIAL_STATE__ = ${serializedinitialState};</script>`;
  return result;
}
  