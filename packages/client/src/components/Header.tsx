import { AppBar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import {
  GAME_URL,
  BASE_URL,
  LOGIN_URL,
  SIGNUP_URL,
  PROFILE_URL,
  CHANGE_PASS_URL,
  LEADERBOARD_URL,
  FORUM_URL,
} from '../utils/constants';
import ThemeSwitch from './ThemeSwitch';

function setHeader(link: string) {
  switch (link) {
    case BASE_URL || LOGIN_URL || SIGNUP_URL || GAME_URL:
      return 'Valkyrie Adventure';
    case PROFILE_URL:
      return 'User Profile';
    case CHANGE_PASS_URL:
      return 'Change Password';
    case LEADERBOARD_URL:
      return 'Leaderboard';
    case FORUM_URL:
      return 'Forum';
    default:
      return 'Valkyrie Adventure';
  }
}

const Header = () => {
  const data = useLocation();
  return (
    <AppBar
      position="static"
      enableColorOnDark
      sx={{
        p: '12px',
        mb: '12px',
      }}
      color="primary">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <span>{setHeader(data.pathname)}</span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ThemeSwitch />
        </div>
      </div>
    </AppBar>
  );
};

export default Header;
