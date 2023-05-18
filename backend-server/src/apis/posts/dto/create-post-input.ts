import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  image: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  seriesId?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
