import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './entities/memos.entity';
import { MemoResolver } from './memos.resolver';
import { MemoService } from './memos.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Memo, //
      User,
    ]),
  ],

  providers: [
    MemoResolver, //
    MemoService,
    UsersService,
  ],
})
export class MemosModule {}
