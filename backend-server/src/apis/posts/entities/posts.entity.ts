import { Field, ObjectType } from '@nestjs/graphql';
import { Series } from 'src/apis/series/entities/series.entity';
import { Tag } from 'src/apis/tags/entities/tags.entity';
import { User } from 'src/apis/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @Column()
  @Field(() => String)
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  uodatedAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User; //  포스트 작성자

  @ManyToOne(() => Series)
  @Field(() => Series)
  series: Series;

  @JoinTable()
  @ManyToMany(() => Tag, (tags) => tags.posts)
  @Field(() => [Tag])
  tags: Tag[];

  @JoinTable()
  @ManyToMany(() => User, (users) => users.posts)
  // @Field(() => User) // Playground X
  users: User; // 좋아요 누른 사람들
}
