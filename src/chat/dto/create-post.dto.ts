import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {

  @IsNotEmpty()
  userToId: number;

  @IsNotEmpty()
  message: string;
}
