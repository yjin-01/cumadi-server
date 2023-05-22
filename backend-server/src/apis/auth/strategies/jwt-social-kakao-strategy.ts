import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';

export class JwtKaKaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: `${process.env.OAUTH_CALLBACK_URL}/login/kakao`,
      scope: ['account_email', 'profile_nickname'],
    });
  }

  validate(_, __, profile: Profile) {
    return {
      email: profile._json.kakao_account.email,
      password: 'social',
      nickname: profile.displayName,
    };
  }
}
