import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  age: number

  @IsNotEmpty()
  sex: string

  @IsNotEmpty()
  interests: string

  @IsNotEmpty()
  city: string
}
