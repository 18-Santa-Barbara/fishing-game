import * as renderer from 'react-test-renderer';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ status: 200, json: () => Promise.resolve({}) })
);

import { Leaderboard } from '../pages/Leaderboard';

it('Leaderboard page', () => {
  // @ts-ignore
  const tree = renderer.create(<Leaderboard />).toJSON();
  expect(tree).toMatchSnapshot();
});
