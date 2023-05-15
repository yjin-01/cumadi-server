import { Injectable } from '@nestjs/common';
import { PaymentDetail } from './entities/paymentDetails.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaymentDetailServiceCreate,
  IPaymentDetailServiceFindAll,
  IPaymentDetailServiceFindOne,
} from './interfaces/paymentDetails-service.interface';

@Injectable()
export class PaymentDetailsService {
  constructor(
    @InjectRepository(PaymentDetail)
    private readonly paymentDetailRepository: Repository<PaymentDetail>,
  ) {}

  findAll({ user }: IPaymentDetailServiceFindAll): Promise<PaymentDetail[]> {
    return this.paymentDetailRepository.find({
      where: { user },
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
}
