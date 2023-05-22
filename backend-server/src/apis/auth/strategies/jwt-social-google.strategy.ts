import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.OAUTH_CALLBACK_URL}/login/google`,
      scope: ['email', 'profile'],
    });
  }

  validate(_, __, profile: Profile) {
    return {
      email: profile.emails[0].value,
      password: 'social',
      nickname: profile.displayName,
    };
  }
}
