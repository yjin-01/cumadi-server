import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Series } from './entities/series.entity';
import { CreateSeriesInput } from './dto/create-series.input';
import { SeriesService } from './series.service';

@Resolver()
export class SeriesResolver {
  constructor(
    private readonly seriesService: SeriesService, //
  ) {}

  @Query(() => String)
  qqq() {
    return 'aaa';
  }

  @Mutation(() => Series)
  createSeries(
    @Args('createSeriesInput') createSeriesInput: CreateSeriesInput,
  ): Promise<Series> {
    return this.seriesService.create({ createSeriesInput });
  }
}
