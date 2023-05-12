import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
  IAuthServiceUserDelete,
} from './interfaces/auth-service.interface';
import { Cache } from 'cache-manager';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, //

    private readonly jwtService: JwtService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    const user = await this.usersService.findOneByEmail({ email });
    if (!user)
      throw new UnprocessableEntityException('존재하지 않는 이메일입니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('암호를 확인해 주세요.');

    this.setRefreshToken({ user, context });
    return this.getAccessToken({ user });
  }

  async logout({ context }) {
    const accessToken = context.req.headers.authorization.replace(
      'Bearer ',
      '',
    );
    const refreshToken = context.req.headers.cookie.replace(
      'refreshToken=',
      '',
    );

    try {
      const correctAccess: any = jwt.verify(
        accessToken, //
        process.env.JWT_ACCESS_KEY,
      );
      const correctRefresh: any = jwt.verify(
        refreshToken, //
        process.env.JWT_REFRESH_KEY,
      );

      const accessTtl = correctAccess.exp - correctAccess.iat;
      const refreshTtl = correctRefresh.exp - correctRefresh.iat;

      await this.cacheManager.set(
        `accessToken:${accessToken}`, //
        'accessToken',
        {
          ttl: accessTtl,
        },
      );
      await this.cacheManager.set(
        `refreshToken:${refreshToken}`, //
        'refreshToken',
        {
          ttl: refreshTtl,
        },
      );

      const redisAccess = await this.cacheManager.get(
        `accessToken:${accessToken}`,
      );
      const redisRefresh = await this.cacheManager.get(
        `refreshToken:${refreshToken}`,
      );

      if (!redisAccess || !redisRefresh) throw new UnauthorizedException();

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async resign({ context }: IAuthServiceUserDelete): Promise<boolean> {
    const resignResult = await this.usersService.resign({
      userId: context.req.user.userId,
    });
    if (resignResult) {
      const tokenExpired = await this.logout({ context });
      return tokenExpired;
    }
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.userId },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' },
    );

    context.res.setHeader(
      'set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.userId },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '1h' },
    );
  }
}
