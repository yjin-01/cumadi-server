import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Memo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  memoId: string;

  @Column({ length: 100 })
  @Field(() => String)
  parse: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  author: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
