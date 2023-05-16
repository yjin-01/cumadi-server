import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemoService } from './memos.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Memo } from './entities/memos.entity';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class MemoResolver {
  constructor(
    private readonly memoService: MemoService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Memo)
  async createPostMemo(
    @Args('postId') postId: string,
    @Args('parse') parse: string,
    @Context() context: IContext,
  ) {
    return this.memoService.createMemo({
      parse,
      postId,
      userId: context.req.user.userId,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Memo])
  async fetchPostMemos(
    @Context() context: IContext, //
  ): Promise<Memo[]> {
    return this.memoService.fetchMemos({ userId: context.req.user.userId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deletePostMemo(
    @Args('memoId') memoId: string,
    @Context() context: IContext,
  ): Promise<boolean> {
    return this.memoService.deleteMemo({
      memoId,
      userId: context.req.user.userId,
    });
  }
}
