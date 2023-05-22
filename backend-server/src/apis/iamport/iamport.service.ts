import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';
import { IIamportServiceCheckPaid } from './interfaces/iamport-service.interface';

@Injectable()
export class IamportService {
  async getToken(): Promise<string> {
    const result = await axios.post(`https://api.iamport.kr/users/getToken`, {
      imp_key: process.env.PORTONE_KEY,
      imp_secret: process.env.PORTONE_SECRET,
    });
    return result.data.response.access_token;
  }

  async checkPaid({ impUid, amount }: IIamportServiceCheckPaid): Promise<void> {
    const token = await this.getToken();

    const result = await axios.get(
      `https://api.iamport.kr/payments/${impUid}`,
      { headers: { Authorization: token } },
    );
    if (amount !== result.data.response.amount)
      throw new UnprocessableEntityException('Invalid payment information.');
  }
}
