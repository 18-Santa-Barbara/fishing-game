import '../leaderboard/styles/board.css';
import {
  Container,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import ScoreBody from './ScoreBody';

function Board() {

  return (
    <>
      <Container sx={{ maxHeight: 'calc(100vh - 50px)' }}>
        <Paper>
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
