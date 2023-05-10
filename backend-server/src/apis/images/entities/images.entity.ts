import { Field } from '@nestjs/graphql';
import { Post } from 'src/apis/posts/entities/posts.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  imageId: string;

  @Column()
  url: string;

  @Column()
  thumbnail: boolean;

  @ManyToOne(() => Post)
  @Field(() => Post)
  post: Post;
}
