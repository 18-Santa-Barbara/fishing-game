import { Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { GAME_URL, SIGNUP_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserQuery, useLogInMutation } from '../services/userApi';

const useStyles = makeStyles(() => ({
  paper: {
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

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const classes = useStyles();
  const [logIn] = useLogInMutation();
  const navigator = useNavigate();
  const { data } = useGetUserQuery(undefined);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (login === '') {
      setError("Login can't be empty");
      return;
    }
    if (password === '') {
      setError("Password can't be empty");
      return;
    }
    logIn({ login, password }).then(response => {
      if (response.error) {
        if (response.error.data === 'OK') {
          navigator(GAME_URL);
        } else {
          setError(response.error.data.reason); //Ну это жесть, как это можно переделать?
        }
      }
    });
  }

  if (data !== undefined) {
    return <Navigate to={GAME_URL} replace />;
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
