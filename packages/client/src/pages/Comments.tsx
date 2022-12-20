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
import { useGetUserQuery } from '../services/userApi';
import Likes from './components/forum/Likes';

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
    margin: '0px 10px',
    width: '13%',
  },
  centerText: {
    textAlign: 'center',
  },
  reply: {
    opacity: '70%',
  },
  table: {},
}));

function Comments() {
  const classes = useStyles();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: user } = useGetUserQuery();
  const { data: comments, isLoading } = useGetCommentsByIdQuery({ id });
  const { data: postName } = useGetFeaturedForumQuery(id);

  const [addCommentPost] = useSetCommentsMutation();

  const [body, setBody] = useState('');
  const [replyComment, setReplyComment] = useState({});

  const navigateBack = () => {
    navigate(FORUM_URL);
  };

  const handleClickNewComment = () => {
    const commentData: CommentPost = {
      postId: +id,
      author: user.login,
      body,
      date: new Date().toDateString(),
      comment: replyComment,
    };

    addCommentPost(commentData)
      .then(() => {
        setBody('');
        setReplyComment({});
      })
      .catch(err => console.warn('error: ', err));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!postName) {
    return null;
  }

  return (
    <Container>
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton onClick={navigateBack}>
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
        !!comments.length &&
        comments
          .slice(0)
          .reverse()
          .map(
            (post: {
              id: number;
              postId: string | number;
              author: string;
              date: string;
              body: string;
              comment: any;
            }) => (
              <Card className={classes.root}>
                <CardHeader title={post.author} subheader={post.date} />
                <Button
                  className={classes.btn}
                  variant="outlined"
                  onClick={() => setReplyComment(post)}>
                  Reply
                </Button>
                <CardContent>
                  <Typography
                    className={classes.reply}
                    variant="button"
                    component="p">
                    {post.comment.body}
                  </Typography>
                  <Typography variant="h5" component="p">
                    {post.body}
                  </Typography>
                  <Likes id={post.id} />
                </CardContent>
              </Card>
            )
          )}
    </Container>
  );
}

export default Comments;
