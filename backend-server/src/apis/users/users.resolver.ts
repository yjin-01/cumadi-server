import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update-user-input';
import { CreateUserInput } from './dto/create-users.input';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => User)
  fetchUserLoggedIn(
    @Context() context: IContext, //
  ): Promise<User> {
    return this.usersService.findOneById({ userId: context.req.user.userId });
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create({ createUserInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => User)
  updateUser(
    @Context() context: IContext, //
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update({
      userId: context.req.user.userId,
      updateUserInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  async updateUserPassword(
    @Context() context: IContext, //
    @Args('newPassword') newPassword: string,
  ): Promise<boolean> {
    return this.usersService.updatePassword({
      userId: context.req.user.userId,
      newPassword,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  async resignUser(
    @Context() context: IContext, //
  ): Promise<boolean> {
    return this.usersService.resign({ userId: context.req.user.userId });
  }
}
