import { Button, TextField, Typography, Link as LinkM } from '@mui/material';
import { ClassNameMap, StyleRules, withStyles } from '@mui/styles';
import { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import withNavigation from '../../../hocs/with-navigation/WithNavigation';
import { endpoints } from '../../../services/userApi';
import { RootState } from '../../../store/Store';
import { UserToServer } from '../../../types/client';
import { validateValue } from '../../../utils/validator';
import { fields } from '../../ProfilePage';

type ProfilePageState = {
  error: string;
  user: UserToServer;
  check: UserToServer;
};

const styles: StyleRules = {
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

type ProfileFormProps = {
  classes: ClassNameMap;
  user: UserToServer;
  cancel: () => Record<string, never>;
  changeProfile: (user: UserToServer) => Promise<Response>;
};

class ProfileForm extends Component<ProfileFormProps, ProfilePageState> {
  constructor(props: ProfileFormProps) {
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
    this.setState((prevState: ProfilePageState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      }
    }));
  };

  checkInput = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    const checkValue: string = validateValue(name, value);
    if (checkValue) {
      this.setState((prevState: ProfilePageState) => ({
      ...prevState,
      user: {
        ...prevState.check,
        [name]: value,
      }
    }));
    }
  };
  submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { user } = this.state;
    const { cancel, changeProfile } = this.props;
    let isError = false;
    fields.forEach(({ name }) => {
      // @ts-ignore
      const errorText: string = validateValue(name, user[name]);
      if (errorText !== '') {
        this.setState((prevState: ProfilePageState) => ({
          ...prevState,
          user: {
            ...prevState.check,
            [name]: errorText,
          },
        }));
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
              size={'small'}
              margin="normal"
              onBlur={this.checkInput}
              // @ts-ignore
              error={!!check[name]}
              // @ts-ignore
              helperText={check[name]}
              // @ts-ignore
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
)(
  // @ts-ignore
  withStyles(styles)(withNavigation(ProfileForm))
);
