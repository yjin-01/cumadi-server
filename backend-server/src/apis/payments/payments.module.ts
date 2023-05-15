import { Module } from '@nestjs/common';
import { PaymentsResolver } from './payments.resolver';
import { PaymentsService } from './payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payments.entity';
import { PaymentDetailsModule } from '../paymentDetails/paymentDetails.module';
import { IamportService } from '../iamport/iamport.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]), //
    PaymentDetailsModule,
  ],

  providers: [
    PaymentsResolver,
    PaymentsService, //
    IamportService,
  ],
})
export class PaymentsModule {}
