import { Container, Typography, TextField, Button, withStyles } from '@material-ui/core';
import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SignUpState {
    login: string,
    password: string,
    first_name: string,
    second_name: string,
    email: string,
    phone: string,
}

const styles = {
    paper: {
        // display: 'flex',
        // justifyContent: 'center',
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
        width: '33%'
    }
};

class SignUp extends Component {

    state: SignUpState = {
        login: '',
        password: '',
        first_name: '',
        second_name: '',
        email: '',
        phone: '',
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        this.setState({[name]: value});
    }

    submit = () => {
        console.log(this.state);
    }

    render(): ReactNode {
        const { login, password, first_name, second_name, email, phone } = this.state;
        const {classes} = this.props;
        return <Container className={classes.paper} maxWidth={'xs'}>
            <Typography variant='h5' style={{ marginBottom: '12px' }}>Sign Up</Typography>
            <div>
                <TextField
                    name='first_name'
                    variant='outlined'
                    label='First name'
                    margin='normal'
                    value={first_name}
                    autoFocus
                    onChange={this.handleChange}
                    fullWidth />
                <TextField
                    name='second_name'
                    onChange={this.handleChange}
                    variant='outlined'
                    value={second_name}
                    label='Second name'
                    margin='normal'
                    fullWidth />
                <TextField
                    name='login'
                    variant='outlined'
                    label='Enter login'
                    margin='normal'
                    value={login}
                    onChange={this.handleChange}
                    fullWidth />
                <TextField
                    name='email'
                    variant='outlined'
                    label='E-mail'
                    margin='normal'
                    value={email}
                    onChange={this.handleChange}
                    fullWidth />
                <TextField
                    name='phone'
                    onChange={this.handleChange}
                    variant='outlined'
                    value={phone}
                    label='Phone number'
                    margin='normal'
                    fullWidth />
                <TextField
                    name='password'
                    onChange={this.handleChange}
                    variant='outlined'
                    value={password}
                    type='password'
                    label='Enter password'
                    margin='normal'
                    fullWidth />
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
            <Link to={'/'}>
                Log in
            </Link>
        </Container>
    }
}

export default withStyles(styles)(SignUp);