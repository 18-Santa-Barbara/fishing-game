export type ForumPost = {
  title: string;
  author: string;
  updateTime: number;
  body: string;
};

export type CommentPost = {
  postId: number;
  author: string;
  body: string;
  date: string;
  comment?: {};
};

export type LikePost = {
  commentId: number;
  author: string;
};
