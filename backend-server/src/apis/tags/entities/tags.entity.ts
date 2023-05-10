import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/apis/posts/entities/posts.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  tagId: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Post, (posts) => posts.tags)
  @Field(() => Post)
  posts: Post[];
}
