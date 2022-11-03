import {
  Button,
  List,
  ListItem,
  ListItemText,
  Link as LinkM,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useGetUserQuery, useLogoutMutation } from '../../../services/userApi';
import { fields } from '../../ProfilePage';

const styles = {
  linkBlock: {
    margin: '0 0 8px',
  },
  a: {
    color: 'red',
    cursor: 'pointer',
  },
  li: {
    width: '40vw',
    '&:not(:last-child)': {
      borderBottom: '1px solid #c6c6c6',
    },
  },
  btn: {
    margin: '12px 0',
    width: '33%',
  },
};

function ProfileList({ classes, editProfile }) {
  const { data: user } = useGetUserQuery(undefined);
  const [logout] = useLogoutMutation();

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
        <Link to={'/pass'}>Change password</Link>
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

export default withStyles(styles)(ProfileList);
