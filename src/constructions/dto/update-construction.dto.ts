import { PartialType } from '@nestjs/mapped-types';
import { OrderStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateConstructionDto } from './create-construction.dto';

export class UpdateConstructionDto extends PartialType(CreateConstructionDto) {
  @IsOptional()
  @IsString()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @IsDateString()
  accepted_at: string;
}
