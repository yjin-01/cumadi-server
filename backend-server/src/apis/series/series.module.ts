import { Module } from '@nestjs/common';
import { SeriesResolver } from './series.resolver';
import { SeriesService } from './series.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Series } from './entities/series.entity';
import { SeriesCategoriesModule } from '../seriesCategories/seriesCategories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Series]), //
    SeriesCategoriesModule,
  ],
  providers: [
    SeriesResolver, //
    SeriesService,
  ],
})
export class SeriesModule {}
