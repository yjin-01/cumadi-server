import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/apis/posts/entities/posts.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  userId: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Column()
  @Field(() => String)
  nickname: string;

  @Column({ nullable: true })
  @Field(() => String)
  image: string;

  @Column({ nullable: true })
  @Field(() => String)
  introduction: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deleatedAt: Date;
}
