import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaymentDetailsService } from './paymentDetails.service';
import { IContext } from 'src/commons/interfaces/context';
import { PaymentDetail } from './entities/paymentDetails.entity';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ICheckPaymentListReturn } from './dto/checkPaymentList-return.type';

@Resolver()
export class PaymentDetailsResolver {
  constructor(
    private readonly paymentDetailsService: PaymentDetailsService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [PaymentDetail])
  fetchPaymentDetailByUser(
    @Context() context: IContext,
  ): Promise<PaymentDetail[]> {
    const user = context.req.user;
    return this.paymentDetailsService.findAll({ user });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => ICheckPaymentListReturn)
  checkPaymentList(
    @Args({ name: 'seriesId', type: () => [String] }) seriesId: string[],
    @Context() context: IContext, //
  ): Promise<ICheckPaymentListReturn> {
    const user = context.req.user;
    return this.paymentDetailsService.checkPayment({ seriesId, user });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => Boolean)
  isVaildCreateReviewByUser(
    @Args('seriesId') seriesId: string,
    @Context() context: IContext,
  ): Promise<boolean> {
    const user = context.req.user;
    return this.paymentDetailsService.findOne({ user, seriesId });
  }
}
