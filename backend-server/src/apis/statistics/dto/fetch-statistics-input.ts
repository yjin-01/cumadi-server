import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FetchStatisticsInput {
  @Field(() => String)
  postId: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;
}
