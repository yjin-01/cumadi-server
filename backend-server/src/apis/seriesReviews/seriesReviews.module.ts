import { Module } from '@nestjs/common';
import { SeriesReviewsResolver } from './seriesReviews.resolver';
import { SeriesReviewsService } from './seriesReviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesReview } from './entities/seriesReviews.entity';
import { PaymentDetailsModule } from '../paymentDetails/paymentDetails.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeriesReview]), //
    PaymentDetailsModule,
  ],
  providers: [
    SeriesReviewsResolver, //
    SeriesReviewsService,
  ],
})
export class SeriesReviewModule {}
