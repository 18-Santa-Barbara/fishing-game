import {
  CircularProgress,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useGetLeaderQuery } from '../../../services/leaderApi';

const useStyles = makeStyles({
  load: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ScoreBody = () => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const { data = [], isLoading } = useGetLeaderQuery({
    ratingFieldName: 'score',
    cursor: 0,
    limit: 100,
    //Можно реализовывать пагинацию через сервер, но времени нет.
    //Просто дизейблить кнопку пагинации, если пришло меньшее количество элементов, чем должно быть на странице
  });

  if (isLoading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={3}>
            <div className={classes.load}>
              <CircularProgress />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {data.length &&
        data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(({ data: { date, name, score } }) => (
            <TableRow key={date + name}>
              <TableCell align="center">{name}</TableCell>
              <TableCell align="center">{date}</TableCell>
              <TableCell align="center">{score}</TableCell>
            </TableRow>
          ))}
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRowsPerPage(parseInt(e.target.value))
          }
        />
      </TableRow>
    </TableBody>
  );
};

export default ScoreBody;
