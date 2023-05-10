import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/apis/posts/entities/posts.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToMany(() => Post, (posts) => posts.users)
  @Field(() => Post)
  posts: Post;
}
