import { CreatePaymentInput } from '../dto/create-payments-input';
import { IAuthUser } from 'src/commons/interfaces/context';

export interface IPaymentServiceFindOneByImpUid {
  impUid: string;
}

export interface IPaymentServiceCheckDuplication {
  impUid: string;
}

export interface IPaymentsServiceCreate {
  createPaymentInput: CreatePaymentInput;
  user: IAuthUser['user'];
}
