import { CreateUserInput } from '../dto/create-users.input';
import { UpdateUserInput } from '../dto/update-user-input';

export interface IUsersServiceCreate {
  createUserInput: CreateUserInput;
}

export interface IUsersServiceUpdate {
  userId: string;
  updateUserInput: UpdateUserInput;
}

export interface IUsersServiceFindOneByEmail {
  email: string;
}

export interface IUsersServiceFindOneById {
  userId: string;
}

export interface IUsersServiceUpdatePassword {
  userId: string;
  newPassword: string;
  currentPassword: string;
}

export interface IUsersServiceDelete {
  userId: string;
}
