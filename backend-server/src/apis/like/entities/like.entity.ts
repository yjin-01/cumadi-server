import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/apis/posts/entities/posts.entity';
import { User } from 'src/apis/users/entities/users.entity';
import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  likeId: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @Index()
  @ManyToOne(() => Post, (post) => post.likes)
  @JoinColumn()
  @Field(() => Post)
  post: Post;
}
