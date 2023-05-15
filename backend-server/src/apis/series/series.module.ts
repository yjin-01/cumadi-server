import { Module, forwardRef } from '@nestjs/common';
import { SeriesResolver } from './series.resolver';
import { SeriesService } from './series.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Series } from './entities/series.entity';
import { SeriesCategoriesModule } from '../seriesCategories/seriesCategories.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Series]), //
    SeriesCategoriesModule,
    forwardRef(() => PostsModule),
  ],
  providers: [
    SeriesResolver, //
    SeriesService,
  ],
  exports: [
    SeriesService, //
  ],
})
export class SeriesModule {}
