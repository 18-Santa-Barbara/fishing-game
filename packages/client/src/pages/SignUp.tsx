import { Container, Typography, TextField, Button } from '@mui/material';
import { Component, ReactNode } from 'react';
import { Link, NavigateFunction } from 'react-router-dom';
import { ClassNameMap, StyleRules, withStyles } from '@mui/styles';
import { GAME_URL } from '../utils/constants';
import withNavigation from '../hocs/with-navigation/WithNavigation';
import { validateValue } from '../utils/validator';
import { userApi } from '../services/userApi';
import { connect } from 'react-redux';
import { UserToServer } from '../types/client';

type SignUpState = {
  form: UserToServer;
  check: UserToServer;
  error: string;
}

const styles: StyleRules = {
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

type SignUpProps = {
  classes: ClassNameMap;
  navigate: NavigateFunction;
  signUp: (obj: UserToServer) => Promise<Response>;
};

class SignUp extends Component<SignUpProps, SignUpState> {
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
    this.setState((prevState: SignUpState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [name]: value,
      }
    }));
  };

  checkInput = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    const checkValue: string = validateValue(name, value);
    if (checkValue) {
      this.setState((prevState: SignUpState) => ({
        ...prevState,
        check: {
          ...prevState.check,
          [name]: checkValue
        }
      }));
    }
  };

  submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { navigate, signUp } = this.props;
    const { form } = this.state;
    let isError = false;
    this.names.forEach(({ name }) => {
      // @ts-ignore
      const errorText: string = validateValue(name, form[name]);
      if (errorText !== '') {
        this.setState((prevState: SignUpState) => ({
          ...prevState,
          check: {
            ...prevState.check,
            [name]: errorText,
          },
        }));
        isError = true;
      }
    });
    if (!isError) {
      signUp(this.state.form).then(
        // @ts-ignore
        (response: { error: { data: string | Record<string, string> } }) => {
          if (response.error) {
            if (response.error.data === 'OK') {
              navigate(GAME_URL);
            } else {
              // @ts-ignore
              this.setState({ error: response.error.data.reason }); //Ну это жесть, как это можно переделать?
            }
          } else if(response.data){
            navigate(GAME_URL);
          }
        }
      );
    }
  };

  render(): ReactNode {
    const { classes } = this.props;
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
              // @ts-ignore
              value={form[name]}
              // @ts-ignore
              helperText={check[name]}
              // @ts-ignore
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

export default connect(
  undefined,
  mapDispatch
)(
  // @ts-ignore
  withStyles(styles)(withNavigation(SignUp))
);
