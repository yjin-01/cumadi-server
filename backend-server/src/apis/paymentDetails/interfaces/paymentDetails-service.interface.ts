import { Payment } from 'src/apis/payments/entities/payments.entity';
import { IAuthUser } from 'src/commons/interfaces/context';

export interface IPaymentDetailServiceFindAll {
  user: IAuthUser['user'];
}

export interface IPaymentDetailServiceFindOne {
  user: IAuthUser['user'];
  seriesId: string;
}

export interface IPaymentDetailServiceCreate {
  payment: Payment;
  user: string;
  seriesList: string[];
}
