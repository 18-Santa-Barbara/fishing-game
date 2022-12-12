import '../leaderboard/styles/board.css';
import {
  AppBar,
  Container,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ScoreBody from './ScoreBody';

const useStyles = makeStyles({
  header: {
    padding: '16px',
  },
});

function Board() {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.header} position="static" color="primary">
        LeaderBoard
      </AppBar>
      <Container sx={{ maxHeight: 'calc(100vh - 50px)' }}>
        <Paper sx={{
          mt: '12px'
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Login</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Score</TableCell>
              </TableRow>
            </TableHead>
            <ScoreBody />
          </Table>
        </Paper>
      </Container>
    </>
  );
}

export default Board;
