import { Field, ObjectType } from '@nestjs/graphql';
import { Payment } from 'src/apis/payments/entities/payments.entity';
import { Series } from 'src/apis/series/entities/series.entity';
import { User } from 'src/apis/users/entities/users.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class PaymentDetail {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  paymentDetailId: string;

  @ManyToOne(() => Payment)
  @Field(() => Payment)
  payment: Payment;

  @ManyToOne(() => Series)
  @Field(() => Series)
  series: Series;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
