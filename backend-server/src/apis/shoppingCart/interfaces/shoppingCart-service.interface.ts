import { IAuthUser } from 'src/commons/interfaces/context';

export interface IShoppingCartServiceFindAll {
  user: IAuthUser['user'];
}

export interface IShoppingCartServiceInsert {
  seriesId: string;
  user: IAuthUser['user'];
}

export interface IShoppingCartServiceDelete {
  seriesId: string;
  user: IAuthUser['user'];
}
