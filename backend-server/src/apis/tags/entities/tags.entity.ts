import { Field } from '@nestjs/graphql';
import { Post } from 'src/apis/posts/entities/posts.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  tagId: string;

  @Column()
  name: string;

  @ManyToMany(() => Post, (posts) => posts.tags)
  @Field(() => Post)
  posts: Post[];
}
