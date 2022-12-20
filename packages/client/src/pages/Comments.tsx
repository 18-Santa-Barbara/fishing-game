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
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
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
import { useGetLikesQuery, useSetLikesMutation } from '../services/likesApi';

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
  const { data: user } = useGetUserQuery();
  const { data: comments, isLoading } = useGetCommentsByIdQuery({ id });
  const { data: postName } = useGetFeaturedForumQuery(id);
  const { data: likes } = useGetLikesQuery();

  const [addLikes, responseLikes] = useSetLikesMutation();
  const [addCommentPost, responseComment] = useSetCommentsMutation();
  const [body, setBody] = useState('');

  const navigateBack = () => {
    navigate(FORUM_URL);
  };

  const handleClickLike = (id: number) => {
    const likeData = {
      commentId: id,
      author: user.login,
    };

    addLikes(likeData).catch(err => console.warn('error: ', err));
  };

  const handleClickNewComment = () => {
    const commentData: CommentPost = {
      postId: +id,
      author: user.author,
      body,
      date: new Date().toDateString(),
    };

    addCommentPost(commentData)
      .then(() => {
        setBody('');
      })
      .catch(err => console.warn('error: ', err));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!postName || !likes) {
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
        comments.map(
          (comment: {
            id: number;
            postId: string | number;
            author: string;
            date: string;
            body: string;
          }) => (
            <Card className={classes.root}>
              <CardHeader title={comment.author} subheader={comment.date} />
              <CardContent>
                <Typography variant="h5" component="p">
                  {comment.body}
                </Typography>
                <IconButton onClick={() => handleClickLike(comment.id)}>
                  <ThumbUpOffAltIcon />
                  {likes.map(
                    (like: { id: number; commentId: number; author: string }) =>
                      like.commentId === comment.id ? (
                        <Typography component="p">{comment.id}</Typography>
                      ) : (
                        <Typography component="p">{comment.id}</Typography>
                      )
                  )}
                </IconButton>
              </CardContent>
            </Card>
          )
        )}
    </Container>
  );
}

export default Comments;
