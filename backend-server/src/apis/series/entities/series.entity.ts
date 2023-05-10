import { Field, Int, ObjectType } from '@nestjs/graphql';
import { title } from 'process';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Series {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  seriesId: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  introduction: string;

  @Column()
  @Field(() => String)
  image: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  paid: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
