import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class RegisterService {

  constructor(
    @Inject('REGISTER_SERVICE') private readonly registerClient: ClientProxy
  ) {}

  async create(registerDto: RegisterDTO) {
    try{
      const user = await firstValueFrom(
        this.registerClient.send('createUser', registerDto)
      )
      return user;
    }catch(e){
      throw new RpcException(e);
    }
  }
}
