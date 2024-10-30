import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CategoriesService {

  constructor(
    @Inject ('CATEGORIES_SERVICE') private readonly categoriesClient: ClientProxy
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {

    try{
      const category = await firstValueFrom(
        this.categoriesClient.send('createCategory', createCategoryDto)
      )
      return category;
    }catch(e){
      throw new RpcException(e);
    }
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
