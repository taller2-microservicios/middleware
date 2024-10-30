import { Body, Controller, HttpCode, HttpStatus, Post , Res} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { access } from 'fs';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDTO: LoginDto , @Res() res : Response ) {

    const loginUserToken = await this.loginService.login(loginDTO);

    res.cookie('access_token', loginUserToken.access_token, {
      httpOnly: true, 
      sameSite: 'strict',
    });

    const response = {
      message: 'Usuario Logueado',
      statusCode: HttpStatus.OK,
      data: loginUserToken
    }

    res.json(response);
  }
}
