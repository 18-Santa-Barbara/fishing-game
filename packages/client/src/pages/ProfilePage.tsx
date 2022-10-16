import { TextField, Button, Avatar, Box } from '@mui/material';
import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import { AccountCircle } from '@mui/icons-material';
import { apiRequestPut } from '../utils/api';
import { API } from '../utils/constants';

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
    error: '',
  };

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

  submit = () => {
    apiRequestPut(`${API}/user/profile`, { ...this.state.user })
      .then(res => {
        if ('reason' in res) {
          this.setState({ error: res.reason });
        }
      })
      .catch(() => this.setState({ error: 'Ошибка!' }));
  };

  render(): ReactNode {
    const {
      user: { login, first_name, second_name, email, phone, display_name },
      error,
    } = this.state;
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
          <TextField
            name="first_name"
            variant="outlined"
            label="First name"
            margin="normal"
            value={first_name}
            autoFocus
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            name="second_name"
            onChange={this.handleChange}
            variant="outlined"
            value={second_name}
            label="Second name"
            margin="normal"
            fullWidth
          />
          <TextField
            name="login"
            variant="outlined"
            label="Enter login"
            margin="normal"
            value={login}
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            name="email"
            variant="outlined"
            label="E-mail"
            margin="normal"
            value={email}
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            name="phone"
            onChange={this.handleChange}
            variant="outlined"
            value={phone}
            label="Phone number"
            margin="normal"
            fullWidth
          />
          <TextField
            name="display_name"
            onChange={this.handleChange}
            variant="outlined"
            value={display_name}
            label="Display name"
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
            onClick={this.submit}
            variant="contained"
            color="primary"
            className={classes.btn}>
            Sign Up
          </Button>
        </div>
        <div>
          <Link to={'/pass'}>Change password</Link>
        </div>
        <Link to={'/game'}>Back</Link>
      </Box>
    );
  }
}

export default withStyles(styles)(SignUp);
