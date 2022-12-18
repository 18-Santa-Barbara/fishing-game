import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';

import { MemoryRouter } from 'react-router-dom';

import ChangePassPage from '../pages/ChangePassPage';

it('ChangePassPage page', () => {
  const mockStore = configureStore();
  const store = mockStore({ userApi: 'test' });
  const tree = renderer
    .create(
      <MemoryRouter>
        <Provider store={store}>
          <ChangePassPage />
        </Provider>
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
