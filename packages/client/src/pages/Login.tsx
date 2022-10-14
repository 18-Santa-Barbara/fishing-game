import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  paper: {
    // display: 'flex',
    // justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0px 0px 6px rgb(0 0 0 / 14%)',
    borderRadius: '12px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '16px',
  },
  btn: {
    margin: '12px 0',
    width: '33%',
  },
}));

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  function submit() {
    console.log({ login, password });
  }

  return (
    <Container className={classes.paper} maxWidth={'xs'}>
      <Typography variant="h5" style={{ marginBottom: '12px' }}>
        Login
      </Typography>
      <div>
        <TextField
          name="login"
          variant="outlined"
          label="Enter login"
          margin="normal"
          value={login}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLogin(e.target.value)
          }
          autoFocus
          fullWidth
        />
        <TextField
          name="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          variant="outlined"
          value={password}
          type="password"
          label="Enter password"
          margin="normal"
          fullWidth
        />
        <Button
          type="submit"
          fullWidth
          onClick={submit}
          variant="contained"
          color="primary"
          className={classes.btn}>
          Sign In
        </Button>
      </div>
      <Link to={'/signup'}>Don't have account? Sign up!</Link>
    </Container>
  );
}

export default Login;
