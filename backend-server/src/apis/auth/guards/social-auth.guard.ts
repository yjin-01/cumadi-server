import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const SOCIAL_AUTH_GUARD = ['google', 'kakao', 'naver'].reduce((acc, cur) => {
  return { ...acc, [cur]: new (class extends AuthGuard(cur) {})() };
}, {});

export class SocialAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { social } = context.switchToHttp().getRequest().params;
    return SOCIAL_AUTH_GUARD[social].canActivate(context);
  }
}
