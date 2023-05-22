import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comments.entity';
import { Repository } from 'typeorm';
import {
  ICommentServiceCreate,
  ICommentServiceDelete,
  ICommentServiceUpdate,
} from './interfaces/comments-service.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  findOneForAnswer({
    commentId, //
  }) {
    return this.commentsRepository.findOne({
      where: { commentId },
      relations: ['post.user'],
    });
  }

  findAll({
    postId, //
  }): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { post: { postId } },
      order: { createdAt: 'ASC' },
      relations: ['user'],
    });
  }

  create({
    userId, //
    postId,
    content,
  }: ICommentServiceCreate): Promise<Comment> {
    const result = this.commentsRepository.save({
      content,
      post: { postId },
      user: { userId },
    });

    return result;
  }

  async update({
    userId, //
    commentId,
    updateContent,
  }: ICommentServiceUpdate): Promise<Comment> {
    const author = await this.commentsRepository.findOne({
      where: { user: { userId } },
      relations: ['user'],
    });

    if (userId !== author.user.userId)
      throw new UnauthorizedException(
        '본인이 작성한 질문만 수정할 수 있습니다.',
      );

    return this.commentsRepository.save({
      commentId,
      content: updateContent,
    });
  }

  async delete({
    userId, //
    commentId,
  }: ICommentServiceDelete): Promise<boolean> {
    const result = await this.commentsRepository.delete({
      commentId,
      user: { userId },
    });

    return result.affected ? true : false;
  }
}
