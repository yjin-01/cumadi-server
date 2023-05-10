import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class PaymentDetail {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  paymentDetailId: string;
}
