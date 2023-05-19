import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answers.entity';
import { Repository } from 'typeorm';
import { CommentsService } from '../comments/comments.service';
import { IAnswerServiceReturn } from './interface/answer-return.interface';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answersRepository: Repository<Answer>,

    private readonly commentsService: CommentsService,
  ) {}

  async find({
    commentId, //
  }): Promise<IAnswerServiceReturn | null> {
    const result = await this.answersRepository.findOne({
      where: { comment: { commentId } },
      relations: ['comment', 'comment.user', 'comment.post.user'],
    });

    return result
      ? {
          ...result,
          answerAuthor: result.comment.post.user,
        }
      : null;
  }

  async findAll({
    postId, //
  }): Promise<IAnswerServiceReturn[]> {
    const result = await this.answersRepository.find({
      where: { comment: { post: { postId } } },
      relations: ['comment', 'comment.user', 'comment.post.user'],
    });

    const finalResult = result.reduce((acc, cur) => {
      acc.push({
        ...cur,
        answerAuthor: cur.comment.post.user,
      });
      return acc;
    }, []);

    return finalResult;
  }

  async create({
    commentId, //
    content,
    userId,
  }): Promise<IAnswerServiceReturn> {
    const comment = await this.commentsService.findOneForAnswer({
      commentId,
    });

    if (userId !== comment.post.user.userId)
      throw new UnauthorizedException(
        '포스트 작성자만 답변 작성이 가능합니다.',
      );

    return this.answersRepository.save({
      content,
      comment,
      answerAuthor: comment.post.user,
    });
  }

  async update({
    answerId, //
    newContent,
    userId,
  }): Promise<IAnswerServiceReturn> {
    const answer = await this.answersRepository.findOne({
      where: { answerId },
      relations: ['comment.post.user'],
    });

    if (userId !== answer.comment.post.user.userId)
      throw new UnauthorizedException(
        '포스트 작성자만 답변 수정이 가능합니다.',
      );

    return this.answersRepository.save({
      answerId, //
      content: newContent,
      answerAuthor: answer.comment.post.user,
    });
  }

  async delete({
    answerId, //
    userId,
  }): Promise<boolean> {
    const answer = await this.answersRepository.findOne({
      where: { answerId },
      relations: ['comment.post.user'],
    });

    if (userId !== answer.comment.post.user.userId)
      throw new UnauthorizedException(
        '포스트 작성자만 답변 삭제가 가능합니다.',
      );

    const result = await this.answersRepository.delete({
      answerId,
    });

    return result.affected ? true : false;
  }
}
