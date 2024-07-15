import { Reporter } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CancelOrderDto {
  @IsString()
  reason: string;

  @IsString()
  @IsEnum(Reporter)
  cancel_by: Reporter;
}
