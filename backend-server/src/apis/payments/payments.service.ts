import { ConflictException, Injectable } from '@nestjs/common';
import { Payment } from './entities/payments.entity';
import { Repository } from 'typeorm';
import { PaymentDetailsService } from '../paymentDetails/paymentDetails.service';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaymentServiceCheckDuplication,
  IPaymentServiceFindOneByImpUid,
  IPaymentsServiceCreate,
  IPaymentsServiceCreateFreeSeries,
} from './interfaces/payments-service.interface';
import { IamportService } from '../iamport/iamport.service';
import { shoppingCartService } from '../shoppingCart/shoppingCart.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    private readonly paymentDetailsService: PaymentDetailsService,

    private readonly iamportService: IamportService,

    private readonly shoppingCartService: shoppingCartService,
  ) {}

  findOneByImpUid({
    impUid,
  }: IPaymentServiceFindOneByImpUid): Promise<Payment> {
    return this.paymentRepository.findOne({ where: { impUid } });
  }

  async checkDuplication({
    impUid,
  }: IPaymentServiceCheckDuplication): Promise<void> {
    const result = await this.findOneByImpUid({ impUid });
    if (result) throw new ConflictException('이미 등록된 결제 아이디입니다.');
  }

  async create({
    createPaymentInput,
    user,
  }: IPaymentsServiceCreate): Promise<Payment> {
    const { impUid, amount, seriesList } = createPaymentInput;

    await this.iamportService.checkPaid({ impUid, amount }); // 결제완료 상태인지 검증하기
    await this.checkDuplication({ impUid }); // 이미 결제됐던 id인지 검증하기

    // 결제 내역 저장
    const payment = await this.paymentRepository.save({
      impUid,
      amount,
      user,
    });

    // 결제 상세 내역 저장
    const paymentDetails = await this.paymentDetailsService.create({
      payment,
      user: user.userId,
      seriesList,
    });

    await this.shoppingCartService.deleteSeriesList({ seriesList, user });

    return payment;
  }

  async createFreeSeries({
    seriesList,
    user,
  }: IPaymentsServiceCreateFreeSeries): Promise<Payment> {
    // 결제 내역 저장
    const payment = await this.paymentRepository.save({
      impUid: '무료',
      amount: 0,
      user,
    });

    // 결제 상세 내역 저장
    const paymentDetails = await this.paymentDetailsService.create({
      payment,
      user: user.userId,
      seriesList,
    });

    await this.shoppingCartService.deleteSeriesList({ seriesList, user });

    return payment;
  }
}
