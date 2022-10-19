import { TextField, Button, Avatar, Box, Link as LinkM } from '@mui/material';
import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import { AccountCircle } from '@mui/icons-material';
import { apiRequestPost, apiRequestPut } from '../utils/api';
import { API, LOGIN_URL } from '../utils/constants';
import { validateValue } from '../utils/validator';
import withNavigation from '../hocs/with-navigation/WithNavigation';

interface SignUpState {
  error: string;
  user: {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
  };
  check: {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
  };
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
  linkBlock: {
    margin: '0 0 8px'
  },
  a: {
    color: 'red',
    cursor: 'pointer'
  }
};

class SignUp extends Component {
  state: SignUpState = {
    user: {
      login: '',
      first_name: '',
      second_name: '',
      display_name: '',
      email: '',
      phone: '',
    },
    check: {
      login: '',
      first_name: '',
      second_name: '',
      display_name: '',
      email: '',
      phone: '',
    },
    error: '',
  };

  fields: { name: string; label: string }[] = [
    { name: 'first_name', label: 'First name' },
    { name: 'second_name', label: 'Second name' },
    { name: 'login', label: 'Enter login' },
    { name: 'email', label: 'E-mail' },
    { name: 'phone', label: 'Phone number' },
    { name: 'display_name', label: 'Display name' },
  ];

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    this.setState((oldState: SignUpState) => {
      const newState = { ...oldState };
      newState.user[name] = value;
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

  submit = () => {
    const { user } = this.state;
    let isError = false;
    this.fields.forEach(({ name }) => {
      const errorText: string = validateValue(name, user[name]);
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
      apiRequestPut(`${API}/user/profile`, { ...this.state.user })
        .then(res => {
          if ('reason' in res) {
            this.setState({ error: res.reason });
          }
        })
        .catch(() => this.setState({ error: 'Ошибка!' }));
    }
  };

  logOut = () => {
    apiRequestPost(`${API}/auth/logout`, {})
    .then(res => {
      if ('reason' in res) {
        this.setState({ error: res.reason });
      } else {
        this.props.setLogged(false);
        this.props.navigate(LOGIN_URL);
      }
    })
    .catch(() => this.setState({ error: 'Ошибка!' }));
  }

  render(): ReactNode {
    const { user, check, error } = this.state;
    const { classes } = this.props;
    return (
      <Box className={classes.paper} maxWidth={'md'}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar
            sx={{ m: 1, bgcolor: 'primary', width: '60px', height: '60px' }}>
            <AccountCircle />
          </Avatar>
        </div>
        <div>
          {this.fields.map(({ name, label }, index: number) => (
            <TextField
              name={name}
              key={name}
              variant="outlined"
              label={label}
              margin="normal"
              onBlur={this.checkInput}
              error={!!check[name]}
              helperText={check[name]}
              value={user[name]}
              autoFocus={index === 0}
              onChange={this.handleChange}
              fullWidth
            />
          ))}
          {error && (
            <Typography className={classes.err} variant="h6">
              {error || 'Ошибка!'}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            onClick={this.submit}
            variant="contained"
            color="primary"
            className={classes.btn}>
            Change
          </Button>
        </div>
        <div className={classes.linkBlock}>
          <Link to={'/pass'}>Change password</Link>
        </div>
        <div className={classes.linkBlock}>
          <Link to={'/game'}>Back to the game</Link>
        </div>
        <div>
          <LinkM className={classes.a} onClick={this.logOut}>Log out</LinkM>
        </div>
      </Box>
    );
  }
}

export default withStyles(styles)(withNavigation(SignUp));
