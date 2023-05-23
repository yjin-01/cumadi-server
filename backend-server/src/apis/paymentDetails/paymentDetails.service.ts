import { Injectable } from '@nestjs/common';
import { PaymentDetail } from './entities/paymentDetails.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaymentDetailServiceCheckPayment,
  IPaymentDetailServiceCreate,
  IPaymentDetailServiceFindAll,
  IPaymentDetailServiceFindOne,
} from './interfaces/paymentDetails-service.interface';
import { CheckPaymentListReturn } from './dto/checkPaymentList-return.type';

@Injectable()
export class PaymentDetailsService {
  constructor(
    @InjectRepository(PaymentDetail)
    private readonly paymentDetailRepository: Repository<PaymentDetail>,
  ) {}

  findAll({ user }: IPaymentDetailServiceFindAll): Promise<PaymentDetail[]> {
    return this.paymentDetailRepository.find({
      where: { user },
      order: { createdAt: 'desc' },
      relations: ['series', 'user'],
    });
  }

  async findOne({
    user,
    seriesId,
  }: IPaymentDetailServiceFindOne): Promise<boolean> {
    const isVaild = await this.paymentDetailRepository.findOne({
      where: {
        series: { seriesId },
        user,
      },
    });
    return isVaild ? true : false;
  }

  async create({
    payment,
    user,
    seriesList,
  }: IPaymentDetailServiceCreate): Promise<PaymentDetail[]> {
    const series = [];

    seriesList.forEach((el) => {
      series.push({ series: el, payment, user });
    });

    const paymentDetails = await this.paymentDetailRepository.save(series);

    return paymentDetails;
  }

  async checkPayment({
    seriesId,
    user,
  }: IPaymentDetailServiceCheckPayment): Promise<CheckPaymentListReturn> {
    const result = { status: true, seriesId: [] };
    const paymentDetail = await this.paymentDetailRepository.find({
      where: { series: In(seriesId), user: user },
    });

    const payment = paymentDetail.map((el) => {
      return el.paymentDetailId;
    });
    console.log(payment);

    if (payment.length === 0) {
      return result;
    } else {
      result.status = false;
      result.seriesId = [...payment];
      return result;
    }
  }
}
