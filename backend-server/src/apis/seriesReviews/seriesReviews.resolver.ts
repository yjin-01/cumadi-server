import {
  Args,
  Context,
  Float,
  Int,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { SeriesReviewsService } from './seriesReviews.service';
import { SeriesReview } from './entities/seriesReviews.entity';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateSeriesReviewInput } from './dto/create-seriesReviews.input';
import { IContext } from 'src/commons/interfaces/context';
import { UpdateSeriesReviewInput } from './dto/update-seriesReviews.input';

@Resolver()
export class SeriesReviewsResolver {
  constructor(
    private readonly seriesReviewsServise: SeriesReviewsService, //
  ) {}
  @Query(() => [SeriesReview])
  fetchSeriesReviews(): Promise<SeriesReview[]> {
    return this.seriesReviewsServise.findAll();
  }

  @Query(() => [SeriesReview])
  fetchSeriesReviewsBySeries(
    @Args('seriesId') seriesId: string,
  ): Promise<SeriesReview[]> {
    return this.seriesReviewsServise.findBySeries({ seriesId });
  }

  // 시리즈별 별점 조회
  @Query(() => Float)
  fetchRatingBySeries(
    @Args('seriesId') seriesId: string, //
  ) {
    return this.seriesReviewsServise.findSeriesRating({ seriesId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => SeriesReview)
  createSeriesReview(
    @Args('createSeriesReviewInput')
    createSeriesReviewInput: CreateSeriesReviewInput,
    @Context() context: IContext,
  ): Promise<SeriesReview> {
    const user = context.req.user.userId;
    return this.seriesReviewsServise.create({ createSeriesReviewInput, user });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => SeriesReview)
  updateSeriesReview(
    @Args('reviewId') reviewId: string,
    @Args('updateSeriesReviewInput')
    updateSeriesReviewInput: UpdateSeriesReviewInput,
  ): Promise<SeriesReview> {
    return this.seriesReviewsServise.update({
      reviewId,
      updateSeriesReviewInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteSeriesReview(
    @Args('reviewId') reviewId: string, //
  ): Promise<boolean> {
    return this.seriesReviewsServise.delete({ reviewId });
  }
}
