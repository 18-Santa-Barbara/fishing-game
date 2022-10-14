
import { Routes, Route } from 'react-router-dom';
import './App.css';
import GamePage from './pages/GamePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { BASE_URL, GAME_URL, LOGIN_URL, SIGNUP_URL } from './utils/constants';

function App() {
  // useEffect(() => {
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}`
  //     const response = await fetch(url)
  //     const data = await response.json()
  //     console.log(data)
  //   }

  //   fetchServerData()
  // }, [])
  return (
    <>
      <Routes>
        <Route path={BASE_URL} element={<Login />} />
        <Route path={LOGIN_URL} element={<Login />} />
        <Route path={SIGNUP_URL} element={<SignUp />} />
        <Route path={GAME_URL} element={<GamePage />} />
      </Routes>
    </>
  );
}

export default App;
