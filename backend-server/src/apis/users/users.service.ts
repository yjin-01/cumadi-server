import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    currentPassword,
    newPassword,
    userId,
  }: IUsersServiceUpdatePassword): Promise<boolean> {
    const user = await this.findOneById({ userId });
    const isCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isCorrect)
      throw new UnauthorizedException('기존 비밀번호가 틀립니다.');

    const isDuplicated = await bcrypt.compare(newPassword, user.password);

    if (isDuplicated)
      throw new ForbiddenException(
        '기존 비밀번호와 동일한 비밀번호로 수정할 수 없습니다.',
      );

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
