// global configs
import { ConfigModule, ConfigService } from '@nestjs/config'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from './auth.controller'
import { User } from '../user/user.entity'
import { AuthService } from './auth.service'

// JWT
import { JwtModule } from '@nestjs/jwt'
// import { JwtStrategy } from './jwt.strategy'
// import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' }, // token curto p teste
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
