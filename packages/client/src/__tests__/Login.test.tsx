import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Login from '../pages/Login';

it('Login page', () => {
  const mockStore = configureStore();
  const store = mockStore({ userApi: 'test' });
  const tree = renderer
    .create(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
