import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionCustomFilter implements ExceptionFilter {

  catch(exception: RpcException, host: ArgumentsHost) {
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rpcError = exception.getError();

    if(
      typeof rpcError === 'object' && 
      'statusCode' in rpcError && 
      'message' in rpcError
    ) {
      
      const status = rpcError.statusCode;
      return response.status(status).send(rpcError);

    }

  }
}