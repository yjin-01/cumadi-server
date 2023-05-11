import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req) => {
        const refreshToken = req.headers.cookie?.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: process.env.JWT_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    try {
      const refreshToken = req.headers.cookie.replace('refreshToken=', '');
      const redisRefresh = await this.cacheManager.get(
        `refreshToken:${refreshToken}`,
      );
      if (redisRefresh) throw new UnauthorizedException();

      return {
        userId: payload.sub,
      };
    } catch (e) {
      throw e;
    }
  }
}
