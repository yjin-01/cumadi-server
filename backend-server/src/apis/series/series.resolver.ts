import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Series } from './entities/series.entity';
import { CreateSeriesInput } from './dto/create-series.input';
import { SeriesService } from './series.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';
import { UpdateSeriesInput } from './dto/update-series.input';

@Resolver()
export class SeriesResolver {
  constructor(
    private readonly seriesService: SeriesService, //
  ) {}

  @Query(() => [Series])
  fetchSeriesAll(): Promise<Series[]> {
    return this.seriesService.findAll();
  }

  @Query(() => Series)
  fetchSeries(
    @Args('seriesId') seriesId: string, //
  ): Promise<Series> {
    return this.seriesService.findOne({ seriesId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Series])
  fetchSeriesByUser(
    @Context() context: IContext, //
  ): Promise<Series[]> {
    console.log(context.req.user);
    const user = context.req.user.userId;

    return this.seriesService.findByUser({ user });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Series)
  createSeries(
    @Args('createSeriesInput') createSeriesInput: CreateSeriesInput,
    @Context() context: IContext,
  ): Promise<Series> {
    const user = context.req.user.userId;
    return this.seriesService.create({ createSeriesInput, user });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Series)
  updateSeries(
    @Args('seriesId') seriesId: string,
    @Args('updateSeriesInput') updateSeriesInput: UpdateSeriesInput,
  ): Promise<Series> {
    return this.seriesService.update({ updateSeriesInput, seriesId });
  }
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteSeries(
    @Args('seriesId') seriesId: string, //
  ): Promise<boolean> {
    return this.seriesService.delete({ seriesId });
  }
}
