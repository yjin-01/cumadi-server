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
  IAuthServiceLoginOAuth,
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

    const isSocial = await bcrypt.compare('social', user.password);
    if (isSocial)
      throw new UnauthorizedException('소셜 계정으로 가입된 이메일입니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('암호를 확인해 주세요.');

    this.setRefreshToken({ user, res: context.res });
    return this.getAccessToken({ user });
  }

  async loginOatuh({ req, res }: IAuthServiceLoginOAuth) {
    if (!req.user.email) {
      req.user.email = `${req.user.nickname}@md-unknown.com`;
    }
    let user = await this.usersService.findOneByEmail({
      email: req.user.email,
    });

    if (!user) {
      user = await this.usersService.create({
        createUserInput: { ...req.user },
      });
    }

    this.setRefreshToken({ user, res });
    // front-end 도메인 확인 후 수정
    res.redirect('http://localhost:5500/frontend/social-login.html');
  }

  async logout({ context }) {
    const accessToken = context.req.headers.authorization.replace(
      'Bearer ',
      '',
    );
    // const refreshToken = context.req.headers.cookie.replace(
    //   'refreshToken=',
    //   '',
    // );

    try {
      const correctAccess: any = jwt.verify(
        accessToken, //
        process.env.JWT_ACCESS_KEY,
      );
      // const correctRefresh: any = jwt.verify(
      //   refreshToken, //
      //   process.env.JWT_REFRESH_KEY,
      // );

      const accessTtl = correctAccess.exp - correctAccess.iat;
      // const refreshTtl = correctRefresh.exp - correctRefresh.iat;

      await this.cacheManager.set(
        `accessToken:${accessToken}`, //
        'accessToken',
        {
          ttl: accessTtl,
        },
      );
      // await this.cacheManager.set(
      //   `refreshToken:${refreshToken}`, //
      //   'refreshToken',
      //   {
      //     ttl: refreshTtl,
      //   },
      // );

      const redisAccess = await this.cacheManager.get(
        `accessToken:${accessToken}`,
      );
      // const redisRefresh = await this.cacheManager.get(
      //   `refreshToken:${refreshToken}`,
      // );

      if (!redisAccess) throw new UnauthorizedException();

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

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.userId },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' },
    );

    // front-end 도메인, back-end 도메인 확인 후 옵션 추가 및 수정
    res.setHeader(
      'set-Cookie',
      `refreshToken=${refreshToken}; path=/; SameSite=None; Secure; httpOnly;`,
    );
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    // cookie 동작 확인 후 만료 기한 수정
    return this.jwtService.sign(
      { sub: user.userId },
      // { secret: process.env.JWT_ACCESS_KEY, expiresIn: '1h' },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '1d' },
    );
  }
}
