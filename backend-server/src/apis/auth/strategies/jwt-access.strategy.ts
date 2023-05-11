import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    try {
      const accessToken = req.headers.authorization.replace('Bearer ', '');

      const redisAccess = await this.cacheManager.get(
        `accessToken:${accessToken}`,
      );
      if (redisAccess) throw new UnauthorizedException();

      return {
        userId: payload.sub,
      };
    } catch (e) {
      throw e;
    }
  }
}
