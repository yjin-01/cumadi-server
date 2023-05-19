import { Module } from '@nestjs/common';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment, //
    ]),
  ],
  providers: [
    CommentsResolver, //
    CommentsService,
  ],
  exports: [
    CommentsService, //
  ],
})
export class CommentsModule {}
