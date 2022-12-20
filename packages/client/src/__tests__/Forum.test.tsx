import * as renderer from 'react-test-renderer';

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

import Forum from '../pages/Forum';

it('Forum page', () => {
  const tree = renderer.create(<Forum />).toJSON();
  expect(tree).toMatchSnapshot();
});
