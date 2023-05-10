import { Field } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Memo {
  @PrimaryGeneratedColumn('uuid')
  memoId: string;

  @Column({ length: 100 })
  parse: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
