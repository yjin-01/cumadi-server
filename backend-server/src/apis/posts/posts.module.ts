import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/posts.entity';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { UsersModule } from '../users/users.module';
import { SeriesModule } from '../series/series.module';
import { TagsModule } from '../tags/tags.module';
import { StatisticModule } from '../statistics/statistics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post, //
    ]),
    UsersModule,
    forwardRef(() => SeriesModule),
    TagsModule,
    StatisticModule,
  ],
  providers: [
    PostsResolver, //
    PostsService,
  ],
  exports: [
    PostsService, //
  ],
})
export class PostsModule {}
