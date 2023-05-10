import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class SeriesResolver {
  @Query(() => String)
  qqq() {
    return 'aaa';
  }
}
