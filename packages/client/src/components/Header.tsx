import { AppBar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useGetUserQuery } from '../services/userApi';
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

const links = [GAME_URL, PROFILE_URL, LEADERBOARD_URL, FORUM_URL];

const Header = () => {
  const data = useLocation();
  const { data: user, isError } = useGetUserQuery();
  return (
    <AppBar
      position="static"
      enableColorOnDark
      sx={{
        p: '12px',
        mb: '12px',
        minHeight: '64px',
        flexDirection: 'row',
      }}
      color="primary">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <span style={{color: '#fff'}}>{setHeader(data.pathname)}</span>
        {user && !isError && (
          <div>
            {links.map(linkTo => (
              <Link
                key={linkTo}
                style={{
                  margin: '0 12px',
                  color: '#fff',
                  textDecoration: 'none',
                }}
                to={linkTo}>
                {setHeader(linkTo)}
              </Link>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ThemeSwitch />
        </div>
      </div>
    </AppBar>
  );
};

export default Header;
