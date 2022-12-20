import * as renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ status: 200, json: () => Promise.resolve({}) })
);

// jest.mock('../hocs/protected-route/ProtectedRoute', () => ({
//   ProtectedRoute: jest.fn(({ children }) => (
//     <div data-testid="ProtectedRoute">{children}</div>
//   )),
// }));

import App from '../App';

it('Main page', () => {
  const mockStore = configureStore();
  const store = mockStore({ userApi: 'test' });
  const tree = renderer
    .create(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
