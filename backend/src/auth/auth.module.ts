import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

function parseExpire(expireStr: string | undefined): number {
  if (!expireStr) return 600;
  const match = expireStr.match(/^(\d+)(s|m|h)$/);
  if (!match) return 600; // fallback
  const value = parseInt(match[1]);
  const unit = match[2];
  switch (unit) {
    case 's': return value;
    case 'm': return value * 60;
    case 'h': return value * 3600;
    default: return value;
  }
}

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
        const expireStr = configService.get<string>('JWT_ACCESS_EXPIRE');
        const expiresIn = parseExpire(expireStr);

        if (!secret) throw new Error('JWT_ACCESS_TOKEN_SECRET not defined');

        return {
          secret,
          signOptions: {
            expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
