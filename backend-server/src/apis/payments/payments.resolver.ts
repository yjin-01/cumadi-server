import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';
import { PaymentsService } from './payments.service';
import { CreatePaymentInput } from './dto/create-payments-input';
import { Payment } from './entities/payments.entity';

@Resolver()
export class PaymentsResolver {
  constructor(
    private readonly paymentsService: PaymentsService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Payment)
  createPaymentSeries(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput, //
    @Context() context: IContext,
  ): Promise<Payment> {
    const user = context.req.user;
    return this.paymentsService.create({
      createPaymentInput,
      user,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Payment)
  createPaymentFreeSeries(
    @Args({ name: 'seriesList', type: () => [String] }) seriesList: string[], //
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    return this.paymentsService.createFreeSeries({ seriesList, user });
  }
}
