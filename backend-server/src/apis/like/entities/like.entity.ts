import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/apis/posts/entities/posts.entity';
import { User } from 'src/apis/users/entities/users.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  likeId: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Post)
  @Field(() => Post)
  post: Post;
}
