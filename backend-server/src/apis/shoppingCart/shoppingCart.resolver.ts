import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { shoppingCartService } from './shoppingCart.service';
import { Series } from '../series/entities/series.entity';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class shoppingCartResolver {
  constructor(
    private readonly shoppingCartService: shoppingCartService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Series])
  fetchShoppingCart(
    @Context() context: IContext, //
  ): Promise<Series[]> {
    const user = context.req.user;
    return this.shoppingCartService.findAll({ user });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Series)
  insertSeriesInCart(
    @Args('seriesId') seriesId: string, //
    @Context() context: IContext,
  ): Promise<Series> {
    const user = context.req.user;
    return this.shoppingCartService.insert({ seriesId, user });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteSeriesInCart(
    @Args('seriesId') seriesId: string, //
    @Context() context: IContext,
  ): Promise<boolean> {
    const user = context.req.user;
    return this.shoppingCartService.deleteSeries({ seriesId, user });
  }
}
