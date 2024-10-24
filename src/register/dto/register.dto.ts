import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDTO {

  @IsString()
  @IsNotEmpty()
  readonly nombres: string;

  @IsString()
  @IsNotEmpty()
  readonly apellidos: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}