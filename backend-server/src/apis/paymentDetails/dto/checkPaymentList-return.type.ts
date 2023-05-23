import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CheckPaymentListReturn {
  @Field(() => Boolean)
  status: boolean;

  @Field(() => [String], { nullable: true })
  seriesId?: string[];
}
