import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useChangeThemeMutation, useGetThemeQuery } from '../services/themeApi';
import { useGetUserQuery } from '../services/userApi';

const ThemeSwitch = () => {
  const { isSuccess, data, isError } = useGetUserQuery();
  const { data: isDarkTheme } = useGetThemeQuery(
    isSuccess ? data.id : skipToken
  );
  const [changeTheme] = useChangeThemeMutation();
  if (!data || isError) {
    return null;
  }
  return (
    <>
      <IconButton
        onClick={() => {
          changeTheme({ userId: data.id, isDark: !isDarkTheme.isDark });
        }}>
        {isDarkTheme?.isDark ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </>
  );
};

export default ThemeSwitch;
