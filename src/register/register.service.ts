import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class RegisterService {

  constructor(
    @Inject('REGISTER_SERVICE') private readonly registerClient: ClientProxy
  ) {}

  async register(registerDTO: RegisterDTO) {
    try{
      const user = await firstValueFrom(
        this.registerClient.send('registerUser', registerDTO)
      )
      return user;
    }catch(e){
      throw new RpcException(e);
    }
  }
}
