import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RegisterService {

  constructor(
    @Inject('REGISTER_SERVICE') private registerClient: ClientProxy
  ) {}

  async create(createRegisterDto) {
    try{
      const user = await firstValueFrom(
        this.registerClient.send('createUser', createRegisterDto)
      )
      return user;
    }catch(e){
      throw new RpcException(e);
    }
  }
}
