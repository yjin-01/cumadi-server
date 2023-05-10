import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/apis/posts/entities/posts.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  imageId: string;

  @Column()
  @Field(() => String)
  url: string;

  @Column()
  @Field(() => String)
  thumbnail: boolean;

  @ManyToOne(() => Post)
  @Field(() => Post)
  post: Post;
}
