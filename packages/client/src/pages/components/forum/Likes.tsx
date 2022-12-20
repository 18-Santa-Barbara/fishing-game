import { Typography, IconButton } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useGetUserQuery } from '../../../services/userApi';
import {
  useDeleteLikesMutation,
  useGetLikesByIdQuery,
  useSetLikesMutation,
} from '../../../services/likesApi';

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

    addLikes(likeData).catch((err: any) => console.warn('error: ', err));

    likes.map((like: any) => {
      if (like.author === user.login) {
        deleteLikes(likeData).catch((err: any) => console.warn('error: ', err));
      }
    });

  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!likes) {
    <IconButton onClick={() => handleClickLike()}>
      <ThumbUpOffAltIcon />
      <Typography component="p">0</Typography>
    </IconButton>;
  }

  return (
    <IconButton onClick={() => handleClickLike()}>
      <ThumbUpOffAltIcon />
      <Typography component="p">{likes.length}</Typography>
    </IconButton>
  );
}

export default Likes;
