import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
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
}))

function Login() {

    const classes = useStyles();

    return <Container className={classes.paper} maxWidth={'xs'}>
        <Typography variant='h5' style={{marginBottom: '12px'}}>Login</Typography>
        <div>
            <TextField
                name='login'
                variant='outlined'
                label='Enter login'
                margin='normal'
                autoFocus
                fullWidth />
            <TextField
                name='password'
                variant='outlined'
                label='Enter password'
                autoFocus
                margin='normal'
                fullWidth />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.btn}>
                Sign In
            </Button>
        </div>
        <Link to={'/signup'}>
            Don't have account? Sign up!
        </Link>
    </Container>
}

export default Login;