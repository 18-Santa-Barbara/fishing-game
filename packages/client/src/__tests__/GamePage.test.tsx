import * as renderer from 'react-test-renderer';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ status: 200, json: () => Promise.resolve({}) })
);

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

import GamePage from '../pages/GamePage';

it('GamePage page', () => {
  const tree = renderer.create(<GamePage />).toJSON();
  expect(tree).toMatchSnapshot();
});
