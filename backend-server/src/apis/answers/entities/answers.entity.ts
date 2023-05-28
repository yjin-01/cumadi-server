import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/apis/comments/entities/comments.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  answerId: string;

  @Column()
  @Field(() => String)
  content: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @JoinColumn()
  @OneToOne(() => Comment, { onDelete: 'CASCADE' })
  @Field(() => Comment)
  comment: Comment;
}
