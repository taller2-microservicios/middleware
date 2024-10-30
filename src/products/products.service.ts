import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy
  ) {}

  async create(createProductDto: CreateProductDto) {

    try{
      const product = await firstValueFrom(
        this.productsClient.send('createProduct', createProductDto)
      )
      return product;
    }catch(e){
      throw new RpcException(e);
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
