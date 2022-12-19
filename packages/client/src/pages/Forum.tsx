import {
  Table,
  Box,
  TableContainer,
  Typography,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
  Button,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useGetForumQuery, useSetForumMutation } from '../services/forumApi';
import { useGetUserQuery } from '../services/userApi';
import { useNavigate } from 'react-router-dom';

export type PostType = {
  id?: number;
  title: string;
  author: string;
  updateTime: string;
  body: string;
};

const useStyles = makeStyles(() => ({
  root: { marginTop: '30px' },
  paper: {
    boxShadow: '0px 0px 6px rgb(0 0 0 / 14%)',
    borderRadius: '12px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    minWidth: '750px',
    transform: 'translate(-50%, -50%)',
    padding: '16px',
  },
  btn: {
    margin: '12px 0',
    width: '33%',
  },
  centerText: {
    textAlign: 'center',
  },
  table: {},
}));

function Forum() {
  const { data: user } = useGetUserQuery();
  const { data: forum, isLoading: isLoadingForum } = useGetForumQuery();
  const [addForumPost, response] = useSetForumMutation();
  const [openNewPost, setOpenNewPost] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClickOpenNewPost = () => {
    setOpenNewPost(true);
  };

  const handleClickCloseNewPost = () => {
    setOpenNewPost(false);
  };

  const getTime = (date: string | number) => {
    return `${date}`;
  };

  const navigateToComments = (id: any) => {
    navigate(`/comments/${id}`);
  };

  const handleClickNewPost = () => {
    const forumData: PostType = {
      title: title,
      author: user.login,
      updateTime: new Date().toDateString(),
      body: body
    };

    addForumPost(forumData)
      .then(() => {
        setOpenNewPost(false);
      })
      .catch(err => console.warn('error: ', err));
  };

  if (isLoadingForum) {
    return <div>Loading</div>;
  }

  return (
    <Box className={classes.paper}>
      <Typography variant="h3" className={classes.centerText}>
        Forum
      </Typography>
      <Dialog
        open={openNewPost}
        onClose={handleClickCloseNewPost}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="body"
            label="Body"
            type="text"
            multiline
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBody(e.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseNewPost} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickNewPost} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Update date</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  endIcon={<AddIcon />}
                  onClick={handleClickOpenNewPost}
                  fullWidth>
                  New
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forum &&
              !!forum.length &&
              forum.map(row => (
                <TableRow key={row.title}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell>{row.author}</TableCell>
                  <TableCell>{getTime(row.updateTime)}</TableCell>
                  <TableCell>
                    <Button
                      color="secondary"
                      onClick={() => {
                        navigateToComments(row.id);
                      }}>
                      read
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Forum;
