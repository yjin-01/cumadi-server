import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSeriesReviewInput {
  @Field(() => String)
  content: string;

  @Field(() => Float)
  rating: number;

  @Field(() => String)
  seriesId: string;
}
