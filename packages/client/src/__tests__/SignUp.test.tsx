import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';

import { MemoryRouter } from 'react-router-dom';

import SignUp from '../pages/SignUp';

it('SignUp page', () => {
  const mockStore = configureStore();
  const store = mockStore();
  const tree = renderer
    .create(
      <MemoryRouter>
        <Provider store={store}>
          <SignUp />
        </Provider>
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
