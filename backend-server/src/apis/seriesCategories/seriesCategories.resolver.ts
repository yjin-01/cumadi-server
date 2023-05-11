import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SeriesCategoriesService } from './seriesCategories.service';
import { SeriesCategory } from './entities/seriesCategories.entity';

@Resolver()
export class SeriesCategoriesResolver {
  constructor(
    private readonly seriesCategoriesService: SeriesCategoriesService, //
  ) {}

  @Query(() => [SeriesCategory])
  fetchSeriesCategories(): Promise<SeriesCategory[]> {
    return this.seriesCategoriesService.findAll();
  }

  @Query(() => SeriesCategory)
  fetchSeriesCategory(
    @Args('categoryId') categoryId: string, //
  ): Promise<SeriesCategory> {
    return this.seriesCategoriesService.findOne({ categoryId });
  }

  @Mutation(() => SeriesCategory)
  createSeriesCategory(
    @Args('name') name: string, //
  ): Promise<SeriesCategory> {
    return this.seriesCategoriesService.create({ name });
  }
}
