import { CreatePostInput } from '../dto/create-post-input';
import { UpdatePostInput } from '../dto/update-post-input';

export interface IPostServiceCreate {
  userId: string;
  createPostInput: CreatePostInput;
}

export interface IPostServiceDelete {
  userId: string;
  postId: string;
}

export interface IPostServiceUpdate {
  userId: string;
  postId: string;
  updatePostInput: UpdatePostInput;
}
