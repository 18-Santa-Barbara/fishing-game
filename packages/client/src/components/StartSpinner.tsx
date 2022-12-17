import { CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  center: {
    textAlign: 'center',
    boxShadow: '0px 0px 6px rgb(0 0 0 / 14%)',
    borderRadius: '12px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const StartSpinner = () => {
    const classes = useStyles();

    return <div className={classes.center}>
        <div><CircularProgress size={80}/></div>
        <Typography variant='h2'>Loading...</Typography>
        </div>;
}

export default StartSpinner;