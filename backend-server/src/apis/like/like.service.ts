import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import {
  ILikeServiceDeleteLike,
  ILikeServiceFindAll,
  ILikeServiceFindOne,
  ILikeServiceLikeToggle,
} from './interfaces/like-service.interface';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async findAll({ postId }: ILikeServiceFindAll): Promise<number> {
    const post = await this.likeRepository.findAndCount({
      where: { post: { postId } },
    });

    return post[1];
  }

  findOne({ postId, user }: ILikeServiceFindOne): Promise<Like> {
    return this.likeRepository.findOne({
      where: { post: { postId }, user: { userId: user.userId } },
    });
  }

  async likeToggle({ postId, user }: ILikeServiceLikeToggle): Promise<boolean> {
    const like = await this.findOne({ postId, user });

    if (like) {
      if (await this.deleteLike({ like })) {
        return false;
      }
    }

    await this.likeRepository.save({
      user: { userId: user.userId },
      post: { postId },
    });

    return true;
  }

  async deleteLike({ like }: ILikeServiceDeleteLike): Promise<boolean> {
    const result = await this.likeRepository.delete(like.likeId);
    return result.affected ? true : false;
  }
}
