import { Typography, IconButton } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useGetUserQuery } from '../../../services/userApi';
import {
  useDeleteLikesMutation,
  useGetLikesByIdQuery,
  useSetLikesMutation,
} from '../../../services/likesApi';

export type LikesProps = {
  id: number | string
}

function Likes({ id }) {
  const { data: user, isLoading: isLoadingUser } = useGetUserQuery();
  const { data: likes, isLoading } = useGetLikesByIdQuery(id);

  const [addLikes] = useSetLikesMutation();
  const [deleteLikes] = useDeleteLikesMutation();

  if (isLoading || isLoadingUser) {
    return <div>Loading...</div>;
  }

  if (!likes) {
    return null;
  }

  const handleClickLike = (setLike=true) => () => {
    const likeData = {
      commentId: id,
      author: user.login,
    };

    if (setLike) {
      deleteLikes(likeData)
        .catch((err: any) => console.warn('error: ', err));
    } else {
      addLikes(likeData).catch((err: any) => console.warn('error: ', err));
    }
  };

  const isLiked = likes.findIndex(({author}) => author === user.login) >= 0;

  return (
    <IconButton onClick={handleClickLike(isLiked)}>
      <ThumbUpOffAltIcon />
      <Typography component="p">{likes.length}</Typography>
    </IconButton>
  );
}

export default Likes;
