import { Field, Float, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSeriesReviewInput {
  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => Float, { nullable: true })
  rating: number;
}
