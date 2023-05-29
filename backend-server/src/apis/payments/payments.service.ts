import { ConflictException, Injectable } from '@nestjs/common';
import { Payment } from './entities/payments.entity';
import { EntityManager, Repository } from 'typeorm';
import { PaymentDetailsService } from '../paymentDetails/paymentDetails.service';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import {
  IPaymentServiceCheckDuplication,
  IPaymentServiceFindOneByImpUid,
  IPaymentsServiceCreate,
  IPaymentsServiceCreateFreeSeries,
  IPaymentsServiceCreateWithTransaction,
} from './interfaces/payments-service.interface';
import { IamportService } from '../iamport/iamport.service';
import { shoppingCartService } from '../shoppingCart/shoppingCart.service';
import { TransactionalService } from 'src/commons/transactions/transaction';

@Injectable()
export class PaymentsService extends TransactionalService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    private readonly paymentDetailsService: PaymentDetailsService,

    private readonly iamportService: IamportService,

    private readonly shoppingCartService: shoppingCartService,

    @InjectEntityManager()
    protected readonly entityManager: EntityManager,
  ) {
    super(entityManager);
  }

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
    const result = await this.transactional(async (entityManager) => {
      await this.iamportService.checkPaid({ impUid, amount }); // 결제완료 상태인지 검증
      await this.checkDuplication({ impUid }); // 이미 결제됐던 id인지 검증

      // 결제 내역 저장
      const payment = await this.createWithTransaction(entityManager, {
        impUid,
        amount,
        user,
      });

      await this.paymentDetailsService.createWithTransaction(entityManager, {
        payment,
        user: user.userId,
        seriesList,
      });

      // throw new Error('에러발생');

      await this.shoppingCartService.deleteSeriesList({ seriesList, user });

      return payment;
    });

    return result;
  }

  async createWithTransaction(
    entityManager: EntityManager,
    { impUid, amount, user }: IPaymentsServiceCreateWithTransaction,
  ): Promise<Payment> {
    // 결제 내역 저장
    const payment = this.paymentRepository.create({
      impUid,
      amount,
      user,
    });

    return entityManager.save(payment);
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
    await this.paymentDetailsService.create({
      payment,
      user: user.userId,
      seriesList,
    });

    await this.shoppingCartService.deleteSeriesList({ seriesList, user });

    return payment;
  }
}
