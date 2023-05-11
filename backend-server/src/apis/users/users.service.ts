import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import {
  IUsersServiceCreate,
  IUsersServiceDelete,
  IUsersServiceFindOneByEmail,
  IUsersServiceFindOneById,
  IUsersServiceUpdate,
  IUsersServiceUpdatePassword,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, //
  ) {}

  findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneById({ userId }: IUsersServiceFindOneById): Promise<User> {
    const result = await this.usersRepository.findOne({ where: { userId } });
    return result;
  }

  async create({ createUserInput }: IUsersServiceCreate): Promise<User> {
    const { email, nickname, password } = createUserInput;

    const user = await this.findOneByEmail({ email });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersRepository.save({
      email,
      password: hashedPassword,
      nickname,
    });
  }

  async update({
    userId,
    updateUserInput,
  }: IUsersServiceUpdate): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { userId } });
    return this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });
  }

  async updatePassword({
    newPassword,
    userId,
  }: IUsersServiceUpdatePassword): Promise<boolean> {
    const password = await bcrypt.hash(newPassword, 10);
    const result = await this.usersRepository.update({ userId }, { password });
    return result.affected ? true : false;
  }

  async resign({ userId }: IUsersServiceDelete): Promise<boolean> {
    const result = await this.usersRepository.softDelete({
      userId,
    });
    return result.affected ? true : false;
  }
}
