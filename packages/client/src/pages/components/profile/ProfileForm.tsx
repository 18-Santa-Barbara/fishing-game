import { Button, TextField, Typography, Link as LinkM } from '@mui/material';
import { withStyles } from '@mui/styles';
import { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import withNavigation from '../../../hocs/with-navigation/WithNavigation';
import { endpoints } from '../../../services/userApi';
import { RootState } from '../../../store/Store';
import { validateValue } from '../../../utils/validator';
import { fields } from '../../ProfilePage';

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
  editMode: boolean;
}

const styles = {
  btn: {
    margin: '12px 0',
    width: '33%',
  },
  linkBlock: {
    margin: '0 0 8px',
  },
  a: {
    color: 'red',
    cursor: 'pointer',
  },
};

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        ...props.user,
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
  }

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

  submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { user } = this.state;
    const { cancel, changeProfile } = this.props;
    let isError = false;
    fields.forEach(({ name }) => {
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
      changeProfile(this.state.user).then(() => {
        cancel();
      });
    }
  };

  render(): ReactNode {
    const { check, error, user } = this.state;
    const { classes, cancel } = this.props;
    return (
      <>
        <form onSubmit={this.submit}>
          {fields.map(({ name, label }, index: number) => (
            <TextField
              name={name}
              key={name}
              variant="outlined"
              label={label}
              margin="normal"
              onBlur={this.checkInput}
              error={!!check[name]}
              helperText={check[name]}
              value={user[name] || ''}
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
        </form>
        <div>
          <LinkM className={classes.a} onClick={cancel}>
            Cancel
          </LinkM>
        </div>
      </>
    );
  }
}

const mapState = (state: RootState) => ({
  user: endpoints.getUser.select(undefined)(state).data,
});

const mapDispatch = {
  logout: endpoints.logout.initiate,
  changeProfile: endpoints.changeProfile.initiate,
};

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(withNavigation(ProfileForm)));
