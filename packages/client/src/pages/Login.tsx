import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { GAME_URL, SIGNUP_URL, REDIRECT_URI } from '../utils/constants';
import { useLogInMutation, useServiceIDMutation } from '../services/userApi';

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
  const [serviceID] = useServiceIDMutation();

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
      // @ts-ignore
      if (response.error) {
        // @ts-ignore
        if (response.error.data === 'OK') {
          navigator(GAME_URL);
        } else {
          // @ts-ignore
          setError(response.error.data.reason); //Ну это жесть, как это можно переделать?
        }
      }
    });
  }

  const onYandexClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const data = await serviceID(REDIRECT_URI);
    window.open(
      // @ts-ignore
      `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.data.service_id}&redirect_uri=${REDIRECT_URI}`,
      '_self'
    );
  };

  return (
    <Container maxWidth={'xs'}>
      <Paper className={classes.paper}>
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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={onYandexClick}>
          Log in via Yandex
        </Button>
        </form>
        <Link to={SIGNUP_URL}>Don't have account? Sign up!</Link>
      </Paper>
    </Container>
  );
}

export default Login;
