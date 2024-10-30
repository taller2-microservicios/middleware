import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  precio: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  stock: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id_categoria: number;
}
