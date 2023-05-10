import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Memo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  memoId: string;

  @Column({ length: 100 })
  @Field(() => String)
  parse: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
