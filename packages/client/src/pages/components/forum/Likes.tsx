import { Typography, IconButton } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useGetUserQuery } from '../../../services/userApi';
import {
  useDeleteLikesMutation,
  useGetLikesByIdQuery,
  useSetLikesMutation,
} from '../../../services/likesApi';

let userLiked = false;

function Likes(id: any) {
  const { data: user } = useGetUserQuery();
  const { data: likes, isLoading } = useGetLikesByIdQuery(id);

  const [addLikes] = useSetLikesMutation();
  const [deleteLikes] = useDeleteLikesMutation();

  const handleClickLike = () => {
    const likeData = {
      commentId: id.id,
      author: user.login,
    };

    likes.map((like: any) => {
      if (like.author == user.login) {
        userLiked = true;
      }
    });

    if (userLiked) {
      deleteLikes(likeData)
        .then(() => (userLiked = false))
        .catch((err: any) => console.warn('error: ', err));
    } else {
      addLikes(likeData)
        .catch((err: any) => console.warn('error: ', err));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!likes) {
    return null;
  }

  return (
    <IconButton onClick={handleClickLike}>
      <ThumbUpOffAltIcon />
      <Typography component="p">{likes.length}</Typography>
    </IconButton>
  );
}

export default Likes;
