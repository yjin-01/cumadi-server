import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './entities/memos.entity';
import { MemoResolver } from './memos.resolver';
import { MemoService } from './memos.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Memo, //
    ]),
    UsersModule,
  ],

  providers: [
    MemoResolver, //
    MemoService,
  ],
})
export class MemosModule {}
