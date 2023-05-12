import { Module } from '@nestjs/common';
import { SeriesReviewsResolver } from './seriesReviews.resolver';
import { SeriesReviewsService } from './seriesReviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesReview } from './entities/seriesReviews.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeriesReview]), //
  ],
  providers: [
    SeriesReviewsResolver, //
    SeriesReviewsService,
  ],
})
export class SeriesReviewModule {}
