import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class AuthUser {

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @ApiProperty()
  password: string
}