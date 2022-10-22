import { Routes, Route } from 'react-router-dom';
import { Leaderboard } from './pages/leaderboard';
import {
  LEADERBOARD_URL,
} from './utils/constants';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route
          path={LEADERBOARD_URL}
          element={
            <Leaderboard />
          }
        />
      </Routes>
    </>
  );
}

export default App;