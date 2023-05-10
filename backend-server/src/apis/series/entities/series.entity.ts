import { Field, Int, ObjectType } from '@nestjs/graphql';
import { title } from 'process';
import { SeriesCategory } from 'src/apis/seriesCategories/entities/seriesCategories.entity';
import { User } from 'src/apis/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Series {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  seriesId: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  introduction: string;

  @Column()
  @Field(() => String)
  image: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  paid: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => SeriesCategory)
  @Field(() => SeriesCategory)
  category: SeriesCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
