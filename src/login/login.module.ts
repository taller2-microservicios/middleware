import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_KEY } from '../common/constants/token.constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOGIN_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        }
      }
    ]),
    JwtModule.register({
      global: true,
      secret: JWT_KEY.secret,
    })],
  controllers: [LoginController],
  providers: [LoginService, JwtModule, JwtService],
})
export class LoginModule {}
