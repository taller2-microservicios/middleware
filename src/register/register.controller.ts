import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('register')
  create(@Body() registerDTO : RegisterDTO) {
    return this.registerService.register(registerDTO);
  }

}
