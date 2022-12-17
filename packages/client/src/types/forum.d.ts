export type ForumPost = {
    title: string,
    author: string,
    updateTime: number,
    body: string,
    comments: string,
}

export type CommentPost = {
    postId: number,
    author: string,
    body: string,
    date: string
}