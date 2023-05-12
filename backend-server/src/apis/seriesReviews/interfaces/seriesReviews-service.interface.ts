import { CreateSeriesReviewInput } from '../dto/create-seriesReviews.input';
import { UpdateSeriesReviewInput } from '../dto/update-seriesReviews.input';

export class ISeriesReviewsServicefindOne {
  reviewId: string;
}

export class ISeriesReviewsServicefindBySeries {
  seriesId: string;
}

export interface ISeriesReviewsServiceCreate {
  createSeriesReviewInput: CreateSeriesReviewInput;
  user: string;
}

export interface ISeriesReviewsServiceUpdate {
  reviewId: string;
  updateSeriesReviewInput: UpdateSeriesReviewInput;
}

export class ISeriesReviewsServiceDelete {
  reviewId: string;
}
