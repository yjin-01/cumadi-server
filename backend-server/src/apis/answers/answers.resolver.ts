import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnswersService } from './answers.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';
import { IAnswerServiceReturn } from './interface/answer-return.interface';

@Resolver()
export class AnswersResolver {
  constructor(
    private readonly answersService: AnswersService, //
  ) {}

  @Query(() => IAnswerServiceReturn, { nullable: true })
  fetchPostCommentAnswer(
    @Args('commentId') commentId: string, //
  ): Promise<IAnswerServiceReturn | null> {
    return this.answersService.find({ commentId });
  }

  @Query(() => [IAnswerServiceReturn])
  fetchPostCommentAnswers(
    @Args('postId') postId: string, //
  ): Promise<IAnswerServiceReturn[]> {
    return this.answersService.findAll({ postId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => IAnswerServiceReturn)
  createPostCommentAnswer(
    @Args('commentId') commentId: string, //
    @Args('content') content: string,
    @Context() context: IContext,
  ): Promise<IAnswerServiceReturn> {
    return this.answersService.create({
      commentId,
      content,
      userId: context.req.user.userId,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => IAnswerServiceReturn)
  updatePostCommentAnswer(
    @Args('answerId') answerId: string, //
    @Args('newContent') newContent: string,
    @Context() context: IContext,
  ): Promise<IAnswerServiceReturn> {
    return this.answersService.update({
      answerId,
      newContent,
      userId: context.req.user.userId,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deletePostCommentAnswer(
    @Args('answerId') answerId: string, //
    @Context() context: IContext,
  ): Promise<boolean> {
    return this.answersService.delete({
      answerId,
      userId: context.req.user.userId,
    });
  }
}
