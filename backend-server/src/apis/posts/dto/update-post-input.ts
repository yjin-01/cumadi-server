import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  seriesId: string;

  @Field(() => [String], { nullable: true })
  tags: string[];
}
