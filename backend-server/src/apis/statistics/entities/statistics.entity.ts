import { Field } from '@nestjs/graphql';
import { Post } from 'src/apis/posts/entities/posts.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Statistic {
  @PrimaryGeneratedColumn('uuid')
  statisticId: string;

  @Column()
  date: Date;

  @Column()
  view: number;

  @ManyToOne(() => Post)
  @Field(() => Post)
  post: Post;
}
