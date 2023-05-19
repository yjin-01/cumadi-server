import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class LikeResolver {
  constructor(
    private readonly likeService: LikeService, //
  ) {}

  // 보류 코드⭐️⭐️
  @Query(() => Int)
  fetchLikeCountByPost(
    @Args('postId', { nullable: true }) postId: string, //
  ): Promise<number> {
    return this.likeService.findLikeCount({ postId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  togglePostPick(
    @Args('postId') postId: string, //
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    return this.likeService.likeToggle({ postId, user });
  }
}
