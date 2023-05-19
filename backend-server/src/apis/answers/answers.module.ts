import { Module } from '@nestjs/common';
import { AnswersResolver } from './answers.resolver';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answers.entity';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Answer, //
    ]),
    CommentsModule,
  ],
  providers: [
    AnswersResolver, //
    AnswersService,
  ],
})
export class AnswersModule {}
