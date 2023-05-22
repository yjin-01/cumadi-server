import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AuthController } from './auth.controller';
import { JwtGoogleStrategy } from './strategies/jwt-social-google.strategy';
import { JwtKaKaoStrategy } from './strategies/jwt-social-kakao-strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    UsersModule, //
  ],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtKaKaoStrategy,
    AuthResolver, //
    AuthService,
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
