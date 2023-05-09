import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
