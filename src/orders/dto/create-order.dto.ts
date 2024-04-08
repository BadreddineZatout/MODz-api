import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ClientExists } from '../decorators/client-exists.decorator';
import { CategoryExists } from '../decorators/category-exists.decorator';
import { JobTypeExists } from '../decorators/job-type-exists.decorator';
import { OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @ClientExists()
  client_id: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsDateString()
  date: string;

  @IsString()
  hour: string;

  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @CategoryExists()
  category_id: number;

  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @JobTypeExists()
  job_type_id: number;

  @IsOptional()
  @Transform(({ value }) => value == 'true')
  is_urgent: boolean;

  @IsOptional()
  @IsArray()
  items: ItemDto[];
}

class ItemDto {
  item_id: number;
  quantity: number;
}
