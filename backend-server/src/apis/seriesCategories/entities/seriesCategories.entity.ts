import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class SeriesCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  categoryId: string;

  @Column()
  @Field(() => String)
  name: string;
}
