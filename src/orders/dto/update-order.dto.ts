import { OrderStatus } from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateOrderDto {
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
