import {
  Typography,
  Button,
  TextField,
  Card,
  IconButton,
  CardHeader,
  CardContent,
  Container,
  CardActions,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from 'react';
import { FORUM_URL } from '../utils/constants';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetCommentsByIdQuery,
  useSetCommentsMutation,
} from '../services/commentsApi';
import { useGetFeaturedForumQuery } from '../services/forumApi';
import { CommentPost } from '../types/forum';

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

function Comments() {
  const classes = useStyles();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: comments, isLoading } = useGetCommentsByIdQuery(id);
  const { data: postName } = useGetFeaturedForumQuery(id);

  const [addCommentPost, responseComment] = useSetCommentsMutation();
  const [correctComment, setCorrectComment] = useState<CommentPost>({
    postId: 0,
    author: '',
    body: '',
    date: '',
  });
  const [body, setBody] = useState('');

  const navigateBack = () => {
    navigate(FORUM_URL);
  };

  const handleClickNewComment = () => {

    const commentData: CommentPost = {
        postId: +id,
        author: postName.author,
        body,
        date: new Date().toDateString()
    }

    addCommentPost(commentData)
      .then(response => {
        console.log(response.data);
        setBody('');
      })
      .catch(err => console.warn('error: ', err));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (postName) {
    return (
      <Container>
        <Card className={classes.root}>
          <CardHeader
            action={
              <IconButton
                onClick={() => {
                  navigateBack();
                }}>
                <ArrowBackIosIcon />
              </IconButton>
            }
            title={postName.author}
            subheader={postName.date}
          />
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {postName.title}
            </Typography>
            <Typography variant="h5" component="p">
              {postName.body}
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardHeader title="Comments" />
          <CardContent>
            <TextField
              autoFocus
              margin="dense"
              label="New comment"
              type="text"
              multiline
              value={body}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBody(e.target.value)
              }
            />
            <CardActions>
              <Button onClick={handleClickNewComment}>add</Button>
            </CardActions>
          </CardContent>
        </Card>
        {comments &&
          comments.length &&
          comments.map(
            (comment: {
              postId: string | number;
              author: string;
              date: string;
              body: string;
            }) =>
              comment.postId == id ? (
                <Card className={classes.root}>
                  <CardHeader title={comment.author} subheader={comment.date} />
                  <CardContent>
                    <Typography variant="h5" component="p">
                      {comment.body}
                    </Typography>
                  </CardContent>
                </Card>
              ) : (
                console.log(2)
              )
          )}
      </Container>
    );
  }
}

export default Comments;
