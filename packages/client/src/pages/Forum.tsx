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
  Card,
  IconButton,
  CardHeader,
  CardContent,
  Container,
  CardActions,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from 'react';
import { useGetForumQuery, useSetForumMutation, useUpdateForumMutation } from '../services/forumApi';
import { useGetUserQuery } from '../services/userApi';

export type PostType = {
  id?: number;
  title: string;
  author: string;
  updateTime: string;
  body: string;
  comments: Record<string, string | number>[];
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

const rows: PostType[] = [];
let rowsPlaced = false;
let usernamePlaced = false;
let username = '';
let preUser: any;
let receivedPosts = [];

function Forum() {

  const getUser = useGetUserQuery()
  const getForumPosts = useGetForumQuery()
  const [addForumPost, response] = useSetForumMutation();
  const [addForumUpdate, responseUpdate] = useUpdateForumMutation();
  const [postList, setPostList] = useState<PostType[]>(rows);
  const [currectPost, setCurrectPost] = useState<PostType | null>(null);
  const [openNewPost, setOpenNewPost] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [comment, setComment] = useState('');
  const [placedRows, setPlacedRows] = useState(false)
  const classes = useStyles();
  
  preUser = getUser.currentData
  if (preUser && !usernamePlaced) {
    username = preUser.login
    usernamePlaced = true;
  }

  receivedPosts = getForumPosts.currentData;
  if (receivedPosts && !rowsPlaced) {
    receivedPosts.forEach((r: any) => {
      console.log(r)
      rows.push(r) 
    })
    rowsPlaced = true;
  }

  const handleClickOpenNewPost = () => {
    setOpenNewPost(true);
  };

  const handleClickCloseNewPost = () => {
    setOpenNewPost(false);
  };

  const getTime = (date: string | number) => {
    return `${date}`;
  };

  const handleClickGoBack = () => {
    setCurrectPost(null);
  };

  const handleClickNewComment = () => {
    const postId = rows.findIndex(post => post.id === currectPost?.id);

    let copyArr = [...rows[postId].comments]
    copyArr = rows[postId].comments.concat({author: username, body: comment, date: new Date().toDateString()});

    const forumData: PostType = {
      id: rows[postId].id,
      title: rows[postId].title, 
      author: rows[postId].author, 
      updateTime: rows[postId].updateTime, 
      body: rows[postId].body, 
      comments: copyArr
    };

    addForumUpdate(forumData)
      .then((response) => rows.push(response.data))
    rows[postId] = forumData;

    setPostList(rows);
    setCurrectPost(rows[postId]);
    setComment('');
    
  };

  const handleClickNewPost = () => {

    const forumData: PostType = {
      title: title, 
      author: username, 
      updateTime: new Date().toDateString(), 
      body: body, 
      comments: [
        { author: username, body: `${username} created the topic.`, date: new Date().toDateString() }
      ]
    };

    addForumPost(JSON.stringify({...forumData}))
      .then((response) => rows.push(response.data))

    rows[rows.length] = forumData;

    setPostList(rows);
    setOpenNewPost(false);

  };

  if (!currectPost) {
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
              {postList.map(row => (
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
                        setCurrectPost({
                          id: row.id,
                          title: row.title,
                          author: row.author,
                          updateTime: row.updateTime,
                          body: row.body,
                          comments: row.comments
                        });
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
  return (
    <Container>
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton onClick={handleClickGoBack}>
              <ArrowBackIosIcon />
            </IconButton>
          }
          title={currectPost.author}
          subheader={getTime(currectPost.updateTime)}
        />
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {currectPost.title}
          </Typography>
          <Typography variant="h5" component="p">
            {currectPost.body}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardHeader title="Comments" />
        <CardContent>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="New comment"
            type="text"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setComment(e.target.value)
            }
          />
          <CardActions>
            <Button onClick={handleClickNewComment}>add</Button>
          </CardActions>
        </CardContent>
      </Card>
      {currectPost.comments.map(comment => (
        <Card className={classes.root}>
          <CardHeader
            title={comment.author}
            subheader={getTime(comment.time)}
          />
          <CardContent>
            <Typography variant="h5" component="p">
              {comment.body}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Forum;
