import { AccountCircle, PhotoCamera } from '@mui/icons-material';
import { Avatar, Badge, IconButton } from '@mui/material';
import { ChangeEvent } from 'react';
import {
  useChangeAvatarMutation,
  useGetUserQuery,
} from '../../../services/userApi';
import { API } from '../../../utils/constants';

const PersonAvatar = () => {
  const { data } = useGetUserQuery();
  if (!data) {
    return null;
  }

  const [changeAvatar] = useChangeAvatarMutation();

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const formData = new FormData();
      formData.append('avatar', e.target?.files[0]);
      changeAvatar(formData);
    }
  };

  return (
    <IconButton component="label" disableRipple>
      <input hidden accept="image/*" type="file" onChange={change} />
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={<PhotoCamera color="primary" />}>
        <Avatar
          sx={{ m: 1, bgcolor: 'primary', width: '60px', height: '60px' }}
          src={`${API}/resources${data.avatar}`}>
          <AccountCircle />
        </Avatar>
      </Badge>
    </IconButton>
  );
};

export default PersonAvatar;
