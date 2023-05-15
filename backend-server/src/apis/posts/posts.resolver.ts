import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Post } from './entities/posts.entity';
import { IContext } from 'src/commons/interfaces/context';
import { CreatePostInput } from './dto/create-post-input';
import { UpdatePostInput } from './dto/update-post-input';

@Resolver()
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService, //
  ) {}

  @Query(() => Post)
  fetchPost(
    @Args('postId') postId: string, //
  ): Promise<Post> {
    return this.postsService.findOneWithUpdateView({ postId });
  }

  @Query(() => [Post])
  fetchPosts(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Post])
  fetchPostsOfMine(
    @Context() context: IContext, //
  ): Promise<Post[]> {
    const userId = context.req.user.userId;
    return this.postsService.findAllOfMine({ userId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Post)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context() context: IContext, //
  ): Promise<Post> {
    const userId = context.req.user.userId;
    return await this.postsService.create({ createPostInput, userId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Post)
  updatePost(
    @Args('postId') postId: string,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @Context() context: IContext,
  ): Promise<Post> {
    const userId = context.req.user.userId;
    return this.postsService.update({ userId, postId, updatePostInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deletePost(
    @Args('postId') postId: string, //
    @Context() context: IContext,
  ): Promise<boolean> {
    const userId = context.req.user.userId;
    return this.postsService.delete({ postId, userId });
  }
}
