import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo } from './entities/memos.entity';
import { Repository } from 'typeorm';
import { IMemoServiceCreate } from './interfaces/memos-service.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private readonly memosRepository: Repository<Memo>, //

    private readonly usersService: UsersService,
  ) {}

  async createMemo({
    userId, //
    parse,
  }: IMemoServiceCreate): Promise<Memo> {
    try {
      const user = await this.usersService.findOneById({ userId });
      const createdMemo = this.memosRepository.create({
        parse,
        user,
      });

      const result = await this.memosRepository.save(createdMemo);

      return result;
    } catch (e) {
      throw e;
    }
  }

  async fetchMemos({
    userId, //
  }): Promise<Memo[]> {
    const user = await this.usersService.findOneById({ userId });
    const result = await this.memosRepository.find({
      relations: ['user'],
    });

    return result.filter((el) => el.user.userId === user.userId);
  }

  async deleteMemo({
    memoId, //
    userId,
  }): Promise<boolean> {
    const memo = await this.memosRepository.softDelete({
      memoId,
      user: userId,
    });

    return memo.affected ? true : false;
  }
}
