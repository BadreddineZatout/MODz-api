import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  message: string;
}
