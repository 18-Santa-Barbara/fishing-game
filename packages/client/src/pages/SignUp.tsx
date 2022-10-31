import { Container, Typography, TextField, Button } from '@mui/material';
import { Component, ReactNode } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import { apiRequestPost } from '../utils/api';
import { API, GAME_URL } from '../utils/constants';
import withNavigation from '../hocs/with-navigation/WithNavigation';
import { validateValue } from '../utils/validator';
import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState';
import { userApi } from '../services/userApi';
import { connect } from 'react-redux';

interface SignUpState {
  form: User;
  check: User;
  error: string;
}

const styles = {
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
    margin: '12px 0',
    width: '33%',
  },
  err: {
    color: 'red',
  },
};

class SignUp extends Component {
  state: SignUpState = {
    form: {
      login: '',
      password: '',
      first_name: '',
      second_name: '',
      email: '',
      phone: '',
    },
    check: {
      login: '',
      password: '',
      first_name: '',
      second_name: '',
      email: '',
      phone: '',
    },
    error: '',
  };

  names: { name: string; label: string }[] = [
    { name: 'first_name', label: 'First name' },
    { name: 'second_name', label: 'Second name' },
    { name: 'login', label: 'Enter login' },
    { name: 'email', label: 'E-mail' },
    { name: 'phone', label: 'Phone number' },
    { name: 'password', label: 'Enter password' },
  ];

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    this.setState((oldState: SignUpState) => {
      const newState = { ...oldState };
      newState.form[name] = value;
      newState.check[name] = '';
      return newState;
    });
  };

  checkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const checkValue: string = validateValue(name, value);
    if (checkValue) {
      this.setState((oldState: SignUpState) => {
        const newState = { ...oldState };
        newState.check[name] = checkValue;
        return newState;
      });
    }
  };

  submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { setLogged, navigate, signUp } = this.props;
    const { form } = this.state;
    let isError = false;
    this.names.forEach(({ name }) => {
      const errorText: string = validateValue(name, form[name]);
      if (errorText !== '') {
        this.setState((oldState: SignUpState) => {
          //Знаю, что можно собрать объект с ошибками и потом сделать один setState, да, мне стыдно :)
          const newState = { ...oldState };
          newState.check[name] = errorText;
          return newState;
        });
        isError = true;
      }
    });
    if (!isError) {
      signUp(this.state.form);
    }
  };

  render(): ReactNode {
    const { classes} = this.props;
    const { form, check, error } = this.state;

    return (
      <Container className={classes.paper} maxWidth={'xs'}>
        <Typography variant="h5" style={{ marginBottom: '12px' }}>
          Sign Up
        </Typography>
        <form onSubmit={this.submit}>
          {this.names.map(({ name, label }, index: number) => (
            <TextField
              name={name}
              key={name}
              variant="outlined"
              label={label}
              margin="normal"
              autoFocus={index === 0}
              value={form[name]}
              helperText={check[name]}
              error={!!check[name]}
              type={name === 'password' ? 'password' : 'text'}
              onBlur={this.checkInput}
              onChange={this.handleChange}
              fullWidth
            />
          ))}
          {error && (
            <Typography variant="h6" className={classes.err}>
              {error || 'Ошибка!'}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.btn}>
            Sign Up
          </Button>
        </form>
        <Link to={'/'}>Log in</Link>
      </Container>
    );
  }
}

const mapDispatch = {
  signUp: userApi.endpoints.signUp.initiate,
};

export default connect(undefined, mapDispatch)(withStyles(styles)(withNavigation(SignUp)));
