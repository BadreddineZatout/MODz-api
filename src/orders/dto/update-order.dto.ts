import { PartialType } from '@nestjs/mapped-types';
import { OrderStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  hour: string;

  @IsOptional()
  @Transform(({ value }) => value == 'true')
  is_urgent: boolean;

  @IsOptional()
  @IsString()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @IsArray()
  items: ItemDto[];
}

class ItemDto {
  item_id: number;
  quantity: number;
}
