import { IAuthUser } from 'src/commons/interfaces/context';
import { Like } from '../entities/like.entity';

export interface ILikeServiceFindAll {
  postId: string;
}

export interface ILikeServiceFindOne {
  postId: string;
  user: IAuthUser['user'];
}

export interface ILikeServiceLikeToggle {
  postId: string;
  user: IAuthUser['user'];
}

export interface ILikeServiceDeleteLike {
  like: Like;
}
