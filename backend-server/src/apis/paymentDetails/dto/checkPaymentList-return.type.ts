import { Field, ObjectType } from '@nestjs/graphql';
import { bool } from 'aws-sdk/clients/signer';

@ObjectType()
export class ICheckPaymentListReturn {
  @Field(() => Boolean)
  status: boolean;

  @Field(() => [String], { nullable: true })
  seriesId?: string[];
}
