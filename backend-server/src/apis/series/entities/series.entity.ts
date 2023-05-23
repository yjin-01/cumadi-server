import { Field, Int, ObjectType } from '@nestjs/graphql';
import { title } from 'process';
import { PaymentDetail } from 'src/apis/paymentDetails/entities/paymentDetails.entity';
import { SeriesCategory } from 'src/apis/seriesCategories/entities/seriesCategories.entity';
import { User } from 'src/apis/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => SeriesCategory)
  @Field(() => SeriesCategory)
  category: SeriesCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @OneToMany(() => PaymentDetail, (paymentDetail) => paymentDetail.series, {
    nullable: true,
  })
  payments?: PaymentDetail[];
}
