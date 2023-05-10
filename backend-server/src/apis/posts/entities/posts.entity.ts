import { Field } from '@nestjs/graphql';
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
export class Post {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  uodatedAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => Tag, (tags) => tags.posts)
  @Field(() => [Tag])
  tags: Tag[];

  @ManyToMany(() => User, (users) => users.posts)
  @Field(() => User)
  users: User;
}
