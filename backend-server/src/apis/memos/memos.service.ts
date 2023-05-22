import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo } from './entities/memos.entity';
import { Repository } from 'typeorm';
import { IMemoServiceCreate } from './interfaces/memos-service.interface';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private readonly memosRepository: Repository<Memo>, //

    private readonly usersService: UsersService,

    private readonly postsService: PostsService, //
  ) {}

  async createMemo({
    userId, //
    postId,
    parse,
  }: IMemoServiceCreate): Promise<Memo> {
    const user = await this.usersService.findOneById({ userId });
    if (!user) throw new UnauthorizedException();

    const post = await this.postsService.findOne({ postId });
    if (!post) throw new Error("post dosen't exist");

    const createdMemo = this.memosRepository.create({
      parse,
      title: post.title,
      author: post.user.nickname,
      user,
    });

    const result = await this.memosRepository.save(createdMemo);

    return result;
  }

  async fetchMemos({
    userId, //
  }): Promise<Memo[]> {
    const user = await this.usersService.findOneById({ userId });
    if (!user) throw new UnauthorizedException();

    const result = await this.memosRepository.find({
      order: { createdAt: 'ASC' },
      relations: ['user'],
    });

    return result.filter((el) => el.user.userId === user.userId);
  }

  async deleteMemo({
    memoId, //
    userId,
  }): Promise<boolean> {
    const user = await this.usersService.findOneById({ userId });
    if (!user) throw new UnauthorizedException();

    const memo = await this.memosRepository.softDelete({
      memoId,
      user: userId,
    });

    return memo.affected ? true : false;
  }
}
