import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/apis/comments/entities/comments.entity';
import { Like } from 'src/apis/like/entities/like.entity';
import { Series } from 'src/apis/series/entities/series.entity';
import { Tag } from 'src/apis/tags/entities/tags.entity';
import { User } from 'src/apis/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  postId: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column({ type: 'text' })
  @Field(() => String)
  content: string;

  @Column()
  @Field(() => String)
  image: string;

  @Column()
  @Field(() => String)
  description: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User; //  포스트 작성자

  @ManyToOne(() => Series, { nullable: true })
  @Field(() => Series, { nullable: true })
  series?: Series;

  @JoinTable()
  @ManyToMany(() => Tag, (tags) => tags.posts)
  @Field(() => [Tag], { nullable: true })
  tags?: Tag[];

  @OneToMany(() => Like, (like) => like.post, { nullable: true })
  @Field(() => [Like], { nullable: true })
  likes?: Like[];

  @OneToMany(() => Comment, (comment) => comment.post, { nullable: true })
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];
}
