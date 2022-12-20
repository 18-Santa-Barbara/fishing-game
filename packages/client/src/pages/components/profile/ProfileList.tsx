import {
  Button,
  List,
  ListItem,
  ListItemText,
  Link as LinkM,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useGetUserQuery, useLogoutMutation } from '../../../services/userApi';
import { fields } from '../../ProfilePage';

const useStyles = makeStyles(() => ({
  linkBlock: {
    margin: '0 0 8px',
  },
  a: {
    color: 'red',
    cursor: 'pointer',
  },
  li: {
    width: '40vw',
    padding: '0 12px',
    '&:not(:last-child)': {
      borderBottom: '1px solid #c6c6c6',
    },
  },
  btn: {
    margin: '12px 0',
    width: '33%',
  },
}));

type ProfileListProps = {
  classes: ClassNameMap;
  editProfile: () => void;
};

function ProfileList(props: ProfileListProps) {
  const { classes, editProfile } = props;
  const { data: user } = useGetUserQuery();
  const [logout] = useLogoutMutation();
  const classes = useStyles();

  const logOut = () => {
    logout();
  };

  return (
    <List style={{ width: '100%' }}>
      {fields.map(({ name, label }) => (
        <ListItem key={name} className={classes.li}>
          <ListItemText primary={user[name] || '-'} secondary={label} />
        </ListItem>
      ))}
      <Button
        type="submit"
        fullWidth
        onClick={editProfile}
        variant="contained"
        color="primary"
        className={classes.btn}>
        Edit profile
      </Button>
      <div className={classes.linkBlock}>
        <Link  to={'/pass'}>Change password</Link>
      </div>
      <div className={classes.linkBlock}>
        <Link to={'/game'}>Back to the game</Link>
      </div>
      <div>
        <LinkM className={classes.a} onClick={logOut}>
          Log out
        </LinkM>
      </div>
    </List>
  );
}

export default ProfileList;
