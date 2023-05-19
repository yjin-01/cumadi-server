import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Comment } from './entities/comments.entity';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService, //
  ) {}

  @Query(() => [Comment])
  fetchPostComments(
    @Args('postId') postId: string, //
  ): Promise<Comment[]> {
    return this.commentsService.findAll({ postId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Comment)
  createPostComment(
    @Args('postId') postId: string, //
    @Args('content') content: string,
    @Context() context: IContext,
  ): Promise<Comment> {
    return this.commentsService.create({
      postId,
      content,
      userId: context.req.user.userId,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Comment)
  updatePostComment(
    @Args('commentId') commentId: string, //
    @Args('updateContent') updateContent: string,
    @Context() context: IContext,
  ): Promise<Comment> {
    return this.commentsService.update({
      commentId,
      updateContent,
      userId: context.req.user.userId,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deletePostComment(
    @Args('commentId') commentId: string, //
    @Context() context: IContext,
  ): Promise<boolean> {
    return this.commentsService.delete({
      commentId,
      userId: context.req.user.userId,
    });
  }
}
