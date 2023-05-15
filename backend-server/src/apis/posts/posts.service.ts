import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/posts.entity';
import {
  IPostServiceCreate,
  IPostServiceDelete,
  IPostServiceUpdate,
} from './interfaces/posts-service.interface';
import { UsersService } from '../users/users.service';
import { SeriesService } from '../series/series.service';
import { TagsService } from '../tags/tags.service';
import { StatisticsService } from '../statistics/statistics.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>, //

    private readonly usersService: UsersService,
    private readonly seriesService: SeriesService,
    private readonly tagsService: TagsService,
    private readonly statisticsService: StatisticsService,
  ) {}

  findOne({ postId }): Promise<Post> {
    return this.postsRepository.findOne({
      where: { postId },
      relations: ['series', 'tags', 'user'],
    });
  }

  async findOneWithUpdateView({
    postId, //
  }): Promise<Post> {
    const result = await this.postsRepository.findOne({
      where: { postId },
      relations: ['series', 'tags', 'user'],
    });
    if (!result) throw new Error("post dosen't exist");
    this.statisticsService.updateView({ postId: result.postId }); // 조회수 증가

    return result;
  }

  async findAll(): Promise<Post[]> {
    const result = await this.postsRepository.find({
      relations: ['series', 'tags', 'user'],
    });

    return result;
  }

  findAllOfMine({ userId }): Promise<Post[]> {
    return this.postsRepository.find({
      where: { user: { userId } },
      relations: ['series', 'tags', 'user'],
    });
  }

  async create({
    createPostInput, //
    userId,
  }: IPostServiceCreate): Promise<Post> {
    const { title, content, seriesId, tags } = createPostInput;

    const user = await this.usersService.findOneById({ userId });
    const series = await this.seriesService.findOne({
      seriesId: seriesId ?? '',
    });
    const completeTags = await this.tagsService.tagGenerator({ tags });

    const result = await this.postsRepository.save({
      title,
      content,
      user,
      series,
      tags: completeTags,
    });
    console.log(seriesId);
    return this.findOneWithUpdateView({
      postId: result.postId,
    });
  }

  async update({
    postId, //
    userId,
    updatePostInput,
  }: IPostServiceUpdate): Promise<Post> {
    const post = await this.findOne({
      postId,
    });
    const { tags, seriesId, ...restPostInput } = updatePostInput;
    if (post.user.userId !== userId) throw new UnauthorizedException();

    const newTags = await this.tagsService.tagGenerator({ tags });
    const series = await this.seriesService.findOne({
      seriesId: seriesId ?? '',
    });

    await this.postsRepository.save({
      ...post,
      ...restPostInput,
      series,
      tags: newTags,
    });

    return await this.findOne({
      postId,
    });
  }

  async delete({
    postId, //
    userId,
  }: IPostServiceDelete): Promise<boolean> {
    const post = await this.postsRepository.softDelete({
      postId,
      user: { userId },
    });

    return post.affected ? true : false;
  }
}
