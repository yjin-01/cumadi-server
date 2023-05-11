import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSeriesInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  introduction: string;

  @Field(() => String)
  image: string;

  @Field(() => Int)
  price: number;

  @Field(() => Boolean)
  paid: boolean;

  @Field(() => String)
  categoryId: string;
}
