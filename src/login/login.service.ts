import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { JWT_KEY } from 'src/common/constants/token.constants';
import { Token } from './dto/token.type';

@Injectable()
export class LoginService {

  constructor(
    @Inject ('LOGIN_SERVICE') private readonly loginClient: ClientProxy,
    private jwtService: JwtService
  ) {}

  async login(loginDTO: LoginDto) {
    try {

      const loginUser = await firstValueFrom(
        this.loginClient.send('loginUser', loginDTO)
      )

      const loginUserToken = this.generateToken(loginUser);

      return loginUserToken;

    } catch (e) {
      throw new RpcException(e);
    }
  }

  private generateToken(user : any) : Token {
    const payload = { email: user.email, sub: user.id }

    const access_token = this.jwtService.sign(payload,{
      secret: JWT_KEY.secret,
      expiresIn: '1h'
    })

    return {
      access_token
    }
  }
}
