import { Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { apiRequestPost } from '../utils/api';
import { API, GAME_URL, SIGNUP_URL } from '../utils/constants';

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
    margin: '16px 0',
    width: '33%',
  },
  err: {
    color: 'red',
  },
}));

function Login({ setLogged, checkLoggedIn, checkLogged }) {
  if (checkLogged) {
    return <Navigate to={GAME_URL} replace />;
  }
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const classes = useStyles();
  const navigator = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (login === '') {
      setError("Login can't be empty");
      return;
    }
    if (password === '') {
      setError("Password can't be empty");
      return;
    }
    apiRequestPost(`${API}/auth/signin`, { login, password })
      .then(res => {
        if ('reason' in res) {
          setError(res.reason);
        } else {
          console.log(res);
          checkLoggedIn();
          setLogged(true);
          navigator(GAME_URL);
        }
      })
      .catch(err => {
        console.warn(err);
      });
    console.log({ login, password });
  }

  return (
    <Container className={classes.paper} maxWidth={'xs'}>
      <Typography variant="h5" style={{ marginBottom: '12px' }}>
        Login
      </Typography>
      <form onSubmit={submit}>
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
        {error && (
          <Typography className={classes.err} variant="h6">
            {error || 'Ошибка!'}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          onClick={submit}
          variant="contained"
          color="primary"
          className={classes.btn}>
          Sign In
        </Button>
      </form>
      <Link to={SIGNUP_URL}>Don't have account? Sign up!</Link>
    </Container>
  );
}

export default Login;
