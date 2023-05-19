import { Field, ObjectType } from '@nestjs/graphql';
import { Answer } from '../entities/answers.entity';
import { User } from 'src/apis/users/entities/users.entity';

@ObjectType()
export class IAnswerServiceReturn extends Answer {
  @Field(() => User)
  answerAuthor: User;
}
