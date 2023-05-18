import { Field, ObjectType } from '@nestjs/graphql';
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

  @Column()
  @Field(() => String)
  image: string;

  @Column()
  @Field(() => String)
  description: string;

  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => String)
  uodatedAt: Date;

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
}
