import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { StatisticsService } from './statistics.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Statistics } from './entities/statistics.entity';
import { IContext } from 'src/commons/interfaces/context';
import { FetchStatisticsInput } from './dto/fetch-statistics-input';

@Resolver()
export class StatisticsResolver {
  constructor(
    private readonly statisticsService: StatisticsService, //
  ) {}

  @Query(() => String)
  fetchPostsCount(): string {
    return '메서드 용도 확인 필요';
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => String)
  fetchPostsCountOfMine(): string {
    return '메서드 용도 확인 필요';
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Statistics])
  async fetchPostViewOfMine(
    @Args('fetchStatisticsInput') fetchStatisticsInput: FetchStatisticsInput,
    @Context() context: IContext,
  ): Promise<Statistics[]> {
    return this.statisticsService.postStatistics({
      fetchStatisticsInput,
      userId: context.req.user.userId,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Statistics])
  async fetchPostsViewOfMine(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
    @Context() context: IContext,
  ): Promise<Statistics[]> {
    return this.statisticsService.postsStatistics({
      startDate,
      endDate,
      userId: context.req.user.userId,
    });
  }
}
