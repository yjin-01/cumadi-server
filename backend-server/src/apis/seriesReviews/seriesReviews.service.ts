import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeriesReview } from './entities/seriesReviews.entity';
import { Repository } from 'typeorm';
import {
  ISeriesReviewsServiceCreate,
  ISeriesReviewsServiceDelete,
  ISeriesReviewsServiceUpdate,
  ISeriesReviewsServicefindBySeries,
  ISeriesReviewsServicefindOne,
} from './interfaces/seriesReviews-service.interface';

@Injectable()
export class SeriesReviewsService {
  constructor(
    @InjectRepository(SeriesReview)
    private readonly seriesReviewRepository: Repository<SeriesReview>,
  ) {}

  findAll(): Promise<SeriesReview[]> {
    return this.seriesReviewRepository.find({ relations: ['series', 'user'] });
  }

  findOne({ reviewId }: ISeriesReviewsServicefindOne): Promise<SeriesReview> {
    return this.seriesReviewRepository.findOne({ where: { reviewId } });
  }

  findBySeries({
    seriesId,
  }: ISeriesReviewsServicefindBySeries): Promise<SeriesReview[]> {
    return this.seriesReviewRepository.find({
      where: { series: { seriesId } },
      relations: ['series', 'user'],
    });
  }

  async findSeriesRating({ seriesId }: ISeriesReviewsServicefindBySeries) {
    const result = await this.seriesReviewRepository
      .createQueryBuilder('review')
      .select('Avg(review.rating)', 'rating')
      .leftJoinAndSelect('review.series', 'series')
      .where('review.series = :seriesId', { seriesId })
      .getRawOne();

    console.log(result.rating);

    return result.rating;
  }

  create({
    createSeriesReviewInput,
    user,
  }: ISeriesReviewsServiceCreate): Promise<SeriesReview> {
    const { seriesId, ...rest } = createSeriesReviewInput;
    return this.seriesReviewRepository.save({
      ...rest,
      series: { seriesId },
      user: { userId: user },
    });
  }

  async update({
    reviewId,
    updateSeriesReviewInput,
  }: ISeriesReviewsServiceUpdate): Promise<SeriesReview> {
    const review = await this.findOne({ reviewId });
    return this.seriesReviewRepository.save({
      ...review,
      ...updateSeriesReviewInput,
    });
  }

  async delete({ reviewId }: ISeriesReviewsServiceDelete): Promise<boolean> {
    const result = await this.seriesReviewRepository.delete({ reviewId });
    return result.affected ? true : false;
  }
}
