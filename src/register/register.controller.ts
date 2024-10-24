import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDTO } from './dto/register.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  create(@Body() registerDto : RegisterDTO) {
    return this.registerService.create(registerDto);
  }

}
