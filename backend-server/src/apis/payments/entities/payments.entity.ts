import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PAYMENT_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
}

registerEnumType(PAYMENT_STATUS_ENUM, {
  name: 'PAYMENT_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  paymentId: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column({ type: 'enum', enum: PAYMENT_STATUS_ENUM })
  @Field(() => PAYMENT_STATUS_ENUM)
  status: PAYMENT_STATUS_ENUM;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
