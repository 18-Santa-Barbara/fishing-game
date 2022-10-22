import { TextField, Button, Avatar, Box, Typography } from '@mui/material';
import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import { AccountCircle } from '@mui/icons-material';
import { apiRequestPut } from '../utils/api';
import { API } from '../utils/constants';
import withNavigation from '../hocs/with-navigation/WithNavigation';

interface SignUpState {
  error: string;
  oldPassword: string;
  newPassword: string;
  confirm: string;
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
    oldPassword: '',
    newPassword: '',
    confirm: '',
    error: '',
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    this.setState({ [name]: value });
  };

  submit = () => {
    const { oldPassword, newPassword } = this.state;
    apiRequestPut(`${API}/user/password`, { oldPassword, newPassword })
      .then(res => {
        if ('reason' in res) {
          this.setState({ error: res.reason });
        } else {
          this.props.navigate('/profile');
        }
      })
      .catch(() => this.setState({ error: 'Ошибка!' }));
  };

  render(): ReactNode {
    const { oldPassword, newPassword, confirm, error } = this.state;
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
            name="oldPassword"
            variant="outlined"
            label="Old password"
            margin="normal"
            value={oldPassword}
            autoFocus
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            name="newPassword"
            onChange={this.handleChange}
            variant="outlined"
            value={newPassword}
            label="New password"
            margin="normal"
            fullWidth
          />
          <TextField
            name="confirm"
            variant="outlined"
            label="Confirm password"
            margin="normal"
            value={confirm}
            onChange={this.handleChange}
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
        <Link to={'/profile'}>Back to profile</Link>
      </Box>
    );
  }
}

export default withStyles(styles)(withNavigation(SignUp));
