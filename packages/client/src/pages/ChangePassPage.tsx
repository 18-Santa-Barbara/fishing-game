import { TextField, Button, Box, Typography } from '@mui/material';
import { Component, ReactNode } from 'react';
import { Link, NavigateFunction } from 'react-router-dom';
import { ClassNameMap, StyleRules, withStyles } from '@mui/styles';
import { PROFILE_URL } from '../utils/constants';
import withNavigation from '../hocs/with-navigation/WithNavigation';
import { connect } from 'react-redux';
import { endpoints } from '../services/userApi';
import PersonAvatar from './components/profile/PersonAvatar';

interface ChangePassPageState {
  error: string;
  oldPassword: string;
  newPassword: string;
  confirm: string;
}

type ChangePassPageProps = {
  classes: ClassNameMap;
  navigate: NavigateFunction;
  changePass: ({ oldPassword, newPassword }: oldNewPass) => Promise<Response>;
};

type oldNewPass = {
  oldPassword: string;
  newPassword: string;
};

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

class ChangePassPage extends Component<ChangePassPageProps> {
  state: ChangePassPageState = {
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

  submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirm, error } = this.state;
    if (newPassword !== confirm) {
      this.setState({ error: 'Passwords are not the same!' });
      return;
    }
    if (error) {
      this.setState({ error: '' });
    }
    const { changePass, navigate } = this.props;
    
    changePass({ oldPassword, newPassword }).then(response => {
      //@ts-ignore
      if (response.error.data === 'OK') {
        navigate(PROFILE_URL);
      } else {
        //@ts-ignore
        this.setState({ error: response.error.data.reason }); //Ну это жесть, как это можно переделать?
      }
    });
  };

  render(): ReactNode {
    const { oldPassword, newPassword, confirm, error } = this.state;
    const { classes } = this.props;
    return (
      <Box className={classes.paper} maxWidth={'md'}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/*TODO: Плиз, кто-нибудь выведите всю форму с Аватаркой и Box в отдельный компонент, мне лень :)*/}
          <PersonAvatar />
        </div>
        <form onSubmit={this.submit}>
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
        </form>
        <Link to={'/profile'}>Back to profile</Link>
      </Box>
    );
  }
}

const mapDispatch = {
  changePass: endpoints.changePass.initiate,
};

export default connect(
  undefined,
  mapDispatch
)(
  // @ts-ignore
  withStyles(styles)(withNavigation(ChangePassPage))
);
