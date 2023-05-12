import { Module } from '@nestjs/common';
import { SeriesCategoriesResolver } from './seriesCategories.resolver';
import { SeriesCategoriesService } from './seriesCategories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesCategory } from './entities/seriesCategories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [SeriesCategory], //
    ),
  ],
  providers: [
    SeriesCategoriesResolver, //
    SeriesCategoriesService,
  ],
  exports: [
    SeriesCategoriesService, //
  ],
})
export class SeriesCategoriesModule {}
