import { OrderStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
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

  @IsOptional()
  @IsDateString()
  accepted_at: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  employee_id: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  latitude: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  longitude: number;
}

class ItemDto {
  item_id: number;
  quantity: number;
}
