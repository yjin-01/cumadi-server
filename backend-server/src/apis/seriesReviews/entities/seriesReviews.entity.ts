import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Series } from 'src/apis/series/entities/series.entity';
import { User } from 'src/apis/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class SeriesReview {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  reviewId: string;

  @Column()
  @Field(() => String)
  content: string;

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  @Field(() => Float)
  rating: number;

  @ManyToOne(() => Series)
  @Field(() => Series)
  series: Series;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
