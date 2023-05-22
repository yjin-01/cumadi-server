import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/apis/posts/entities/posts.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Statistics {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  statisticId: string;

  @Column()
  @Field(() => Date)
  date: Date;

  @Column()
  @Field(() => Int)
  view: number;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @Field(() => Post)
  post: Post;
}
