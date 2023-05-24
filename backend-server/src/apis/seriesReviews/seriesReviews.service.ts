import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeriesReview } from './entities/seriesReviews.entity';
import { Repository } from 'typeorm';
import {
  ISeriesReviewsServiceCreate,
  ISeriesReviewsServiceDelete,
  ISeriesReviewsServiceUpdate,
  ISeriesReviewsServiceFindBySeries,
  ISeriesReviewsServiceFindOne,
  ISeriesReviewsServiceFindSeriesRating,
  ISeriesReviewsServiceFindBySeriesAndUser,
} from './interfaces/seriesReviews-service.interface';
import { PaymentDetailsService } from '../paymentDetails/paymentDetails.service';

@Injectable()
export class SeriesReviewsService {
  constructor(
    @InjectRepository(SeriesReview)
    private readonly seriesReviewRepository: Repository<SeriesReview>,

    private readonly paymentDetailsService: PaymentDetailsService,
  ) {}

  findAll(): Promise<SeriesReview[]> {
    return this.seriesReviewRepository.find({ relations: ['series', 'user'] });
  }

  findOne({ reviewId }: ISeriesReviewsServiceFindOne): Promise<SeriesReview> {
    return this.seriesReviewRepository.findOne({
      where: { reviewId },
      relations: ['series', 'user'],
    });
  }

  findBySeries({
    seriesId,
  }: ISeriesReviewsServiceFindBySeries): Promise<SeriesReview[]> {
    return this.seriesReviewRepository.find({
      where: { series: { seriesId } },
      relations: ['series', 'user'],
    });
  }
  findBySeriesAndUser({
    seriesId,
    user,
  }: ISeriesReviewsServiceFindBySeriesAndUser): Promise<SeriesReview> {
    return this.seriesReviewRepository.findOne({
      where: { series: { seriesId }, user: { userId: user.userId } },
      relations: ['series', 'user'],
    });
  }

  async findSeriesRating({ seriesId }: ISeriesReviewsServiceFindSeriesRating) {
    const result = await this.seriesReviewRepository
      .createQueryBuilder('review')
      .select('Avg(review.rating)', 'rating')
      .leftJoinAndSelect('review.series', 'series')
      .where('review.series = :seriesId', { seriesId })
      .getRawOne();

    console.log(result.rating);

    return result.rating;
  }

  async create({
    createSeriesReviewInput,
    user,
  }: ISeriesReviewsServiceCreate): Promise<SeriesReview> {
    const { seriesId, ...rest } = createSeriesReviewInput;

    const payment = await this.paymentDetailsService.findOne({
      seriesId,
      user,
    });
    if (!payment) {
      throw new Error('No permissions');
    }

    const review = await this.findBySeriesAndUser({
      seriesId,
      user,
    });

    if (review) {
      throw new Error('Review already exists');
    }

    return this.seriesReviewRepository.save({
      ...rest,
      series: { seriesId },
      user: { userId: user.userId },
    });
  }

  async update({
    user,
    reviewId,
    updateSeriesReviewInput,
  }: ISeriesReviewsServiceUpdate): Promise<SeriesReview> {
    const review = await this.findOne({ reviewId });

    if (review && review.user.userId !== user.userId) {
      throw new UnauthorizedException();
    }

    return this.seriesReviewRepository.save({
      ...review,
      ...updateSeriesReviewInput,
    });
  }

  async delete({
    reviewId,
    user,
  }: ISeriesReviewsServiceDelete): Promise<boolean> {
    const review = await this.findOne({ reviewId });

    if (review && review.user.userId !== user.userId) {
      throw new UnauthorizedException();
    }
    const result = await this.seriesReviewRepository.delete({ reviewId });
    return result.affected ? true : false;
  }
}
