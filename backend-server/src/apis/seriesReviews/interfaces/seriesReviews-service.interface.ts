import { IAuthUser } from 'src/commons/interfaces/context';
import { CreateSeriesReviewInput } from '../dto/create-seriesReviews.input';
import { UpdateSeriesReviewInput } from '../dto/update-seriesReviews.input';

export class ISeriesReviewsServiceFindOne {
  reviewId: string;
}

export class ISeriesReviewsServiceFindBySeries {
  seriesId: string;
}
export class ISeriesReviewsServiceFindBySeriesAndUser {
  seriesId: string;
  user: IAuthUser['user'];
}

export class ISeriesReviewsServiceFindSeriesRating {
  seriesId: string;
}

export interface ISeriesReviewsServiceCreate {
  createSeriesReviewInput: CreateSeriesReviewInput;
  user: IAuthUser['user'];
}

export interface ISeriesReviewsServiceUpdate {
  user: IAuthUser['user'];
  reviewId: string;
  updateSeriesReviewInput: UpdateSeriesReviewInput;
}

export class ISeriesReviewsServiceDelete {
  reviewId: string;
  user: IAuthUser['user'];
}
