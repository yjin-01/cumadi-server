export interface ICommentServiceCreate {
  userId: string;
  postId: string;
  content: string;
}

export interface ICommentServiceUpdate {
  userId: string;
  commentId: string;
  updateContent: string;
}

export interface ICommentServiceDelete {
  userId: string;
  commentId: string;
}
