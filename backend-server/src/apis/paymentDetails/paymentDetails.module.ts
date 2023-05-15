import { Module } from '@nestjs/common';
import { PaymentDetail } from './entities/paymentDetails.entity';
import { PaymentDetailsService } from './paymentDetails.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentDetailsResolver } from './paymentDetails.resolvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentDetail]), //
  ],
  providers: [
    PaymentDetailsResolver, //
    PaymentDetailsService,
  ],
  exports: [PaymentDetailsService],
})
export class PaymentDetailsModule {}
