import { Box } from '@mui/material';
import { Component, ReactNode } from 'react';
import { ClassNameMap, StyleRules, withStyles } from '@mui/styles';
import withNavigation from '../hocs/with-navigation/WithNavigation';
import ProfileList from './components/profile/ProfileList';
import ProfileForm from './components/profile/ProfileForm';
import PersonAvatar from './components/profile/PersonAvatar';

export const fields: { name: string; label: string }[] = [
  { name: 'first_name', label: 'First name' },
  { name: 'second_name', label: 'Second name' },
  { name: 'login', label: 'Enter login' },
  { name: 'email', label: 'E-mail' },
  { name: 'phone', label: 'Phone number' },
  { name: 'display_name', label: 'Display name' },
];

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
  linkBlock: {
    margin: '0 0 8px',
  },
  a: {
    color: 'red',
    cursor: 'pointer',
  },
};

type ProfilePageProps = {
  classes: ClassNameMap
}

class ProfilePage extends Component<ProfilePageProps> {

  state = {
    editMode: false,
  };
  render(): ReactNode {
    const { editMode } = this.state;
    const { classes } = this.props;
    return (
      <Box className={classes.paper} maxWidth={'md'}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PersonAvatar />
        </div>
        {editMode ? (
          <ProfileForm cancel={() => this.setState({ editMode: false })} />
        ) : (
          <ProfileList editProfile={() => this.setState({ editMode: true })} />
        )}
      </Box>
    );
  }
}

export default withStyles(styles)(withNavigation(ProfilePage));
