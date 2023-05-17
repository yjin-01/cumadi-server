import { Post } from 'src/apis/posts/entities/posts.entity';
import { Series } from '../entities/series.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IFetchSeriesReturn extends Series {
  @Field(() => [Post], { nullable: true })
  post?: Post[];
}
